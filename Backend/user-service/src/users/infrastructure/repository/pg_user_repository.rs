use sea_orm::{
    ActiveValue, ColumnTrait, ConnectionTrait, DatabaseConnection, DbErr, EntityTrait,
    FromQueryResult, QueryFilter, QuerySelect, QueryTrait, Statement, Values,
};
use sea_query::{Alias, Expr, PostgresQueryBuilder, Query};
use uuid::Uuid;

use crate::users::adapters::dtos::request::user_request_dtos::ChangePassword;
use crate::users::ports::repository::user_repository::UserRepository;

use crate::camps_users::CampUserEntity as CampsUsers;
use crate::roles::RolesEntity as Rol;
use crate::users::UserEntity::{self as User, UserResponseQuery, UserValid};

#[derive(Clone, Copy)]
pub struct PgUserRepository<'c> {
    conn: &'c DatabaseConnection,
}

impl<'c> PgUserRepository<'c> {
    pub fn new(conn: &'c DatabaseConnection) -> Self {
        Self { conn }
    }
}

impl<'c> UserRepository for PgUserRepository<'c> {
    async fn get_by_id(self, id_user: Uuid) -> Result<Option<UserResponseQuery>, DbErr> {
        let user_query: (String, Values) = Query::select()
            .columns(vec![
                (User::Entity, User::Column::Id),
                (User::Entity, User::Column::Username),
                (User::Entity, User::Column::Email),
                (User::Entity, User::Column::Password),
                (User::Entity, User::Column::Phone),
                (User::Entity, User::Column::CreatedAt),
                (User::Entity, User::Column::UpdatedAt),
            ])
            .expr_as(
                Expr::cust_with_exprs(
                    "json_build_object('id', $1, 'name', $2, 'permissions', $3)",
                    [
                        Expr::column((Rol::Entity, Rol::Column::Id)),
                        Expr::column((Rol::Entity, Rol::Column::Name)),
                        Expr::column((Rol::Entity, Rol::Column::Permissions)),
                    ],
                ),
                Alias::new("rol"),
            )
            .expr_as(
                Expr::cust_with_expr(
                    "ARRAY_AGG(COALESCE($1, 'Not Found'))",
                    Expr::col((CampsUsers::Entity, CampsUsers::Column::IdCamp)),
                ),
                Alias::new("camps"),
            )
            .from(User::Entity)
            .left_join(
                Rol::Entity,
                Expr::col((User::Entity, User::Column::Role))
                    .equals((Rol::Entity, Rol::Column::Id)),
            )
            .left_join(
                CampsUsers::Entity,
                Expr::col((User::Entity, User::Column::Id))
                    .equals((CampsUsers::Entity, CampsUsers::Column::IdUser)),
            )
            .and_where(Expr::col((User::Entity, User::Column::Id)).eq(id_user))
            .group_by_col((User::Entity, User::Column::Id))
            .group_by_col((Rol::Entity, Rol::Column::Id))
            .to_owned()
            .build(PostgresQueryBuilder);

        let statement = Statement::from_sql_and_values(
            self.conn.get_database_backend(),
            user_query.0,
            user_query.1,
        );
        let user: Result<Option<UserResponseQuery>, DbErr> =
            UserResponseQuery::find_by_statement(statement)
                .one(self.conn)
                .await;

        user
    }

    async fn change_password(self, change_password: ChangePassword) -> Result<(), DbErr> {
        User::Entity::update_many()
            .col_expr(
                User::Column::Password,
                Expr::value(change_password.new_password),
            )
            .filter(User::Column::Id.eq(change_password.id))
            .exec_with_returning(self.conn)
            .await?;

        Ok(())
    }

    async fn is_credential_valid(self, email: String) -> Result<Option<UserValid>, DbErr> {
        let user_query = User::Entity::find()
            .select_only()
            .column_as(User::Column::Id, "id_user")
            .column(User::Column::Password)
            .filter(Expr::col((User::Entity, User::Column::Email)).eq(email))
            .build(self.conn.get_database_backend())
            .to_owned();

        Ok(UserValid::find_by_statement(user_query)
            .one(self.conn)
            .await?)
    }

    async fn insert_user(
        self,
        user: User::ActiveModel,
    ) -> Result<Option<UserResponseQuery>, DbErr> {
        let user_inserted = User::Entity::insert(user).exec(self.conn).await?;
        self.get_by_id(user_inserted.last_insert_id).await
    }

    async fn update_user(
        self,
        user: User::ActiveModel,
    ) -> Result<Option<UserResponseQuery>, DbErr> {
        let user_updated = User::Entity::update(user).exec(self.conn).await?;

        self.get_by_id(user_updated.id).await
    }

    async fn delete_user(self, user_id: Uuid) -> bool {
        User::Entity::delete_by_id(user_id)
            .exec(self.conn)
            .await
            .unwrap()
            .rows_affected
            >= 1
    }
    async fn exist_by_email(self, email: ActiveValue<String>) -> Result<bool, DbErr> {
        let query = User::Entity::find()
            .select_only()
            .expr_as(
                Expr::cust_with_expr(
                    "$1 = 1",
                    Expr::count(Expr::col((User::Entity, User::Column::Email))),
                ),
                "is_exist",
            )
            .filter(Expr::col((User::Entity, User::Column::Email)).eq(email.into_value().unwrap()))
            .build(self.conn.get_database_backend());

        let is_exist: Result<bool, DbErr> = self
            .conn
            .query_one(query)
            .await?
            .unwrap()
            .try_get("", "is_exist");

        Ok(is_exist?)
    }

    async fn exist_by_id(self, id_user: &Uuid) -> Result<bool, DbErr> {
        let query = User::Entity::find()
            .select_only()
            .expr_as(
                Expr::cust_with_expr(
                    "$1 = 1",
                    Expr::count(Expr::col((User::Entity, User::Column::Id))),
                ),
                "is_exist",
            )
            .filter(Expr::col((User::Entity, User::Column::Id)).eq(id_user.clone()))
            .build(self.conn.get_database_backend());

        let is_exist: Result<bool, DbErr> = self
            .conn
            .query_one(query)
            .await?
            .unwrap()
            .try_get("", "is_exist");

        Ok(is_exist?)
    }
}
