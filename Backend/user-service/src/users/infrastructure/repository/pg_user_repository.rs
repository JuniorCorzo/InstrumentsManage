use migration::Expr;
use sea_orm::{ColumnTrait, DatabaseConnection, DbErr, EntityTrait, QueryFilter};
use uuid::Uuid;

use crate::users::adapters::dtos::request::user_request_dtos::ChangePassword;
use crate::users::ports::repository::user_repository::UserRepository;

use crate::roles::RolesEntity as Rol;
use crate::users::UserEntity as User;
pub struct PgUserRepository<'c> {
    conn: &'c DatabaseConnection,
}

impl<'c> PgUserRepository<'c> {
    pub fn new(conn: &'c DatabaseConnection) -> Self {
        Self { conn }
    }
}

impl<'c> UserRepository for PgUserRepository<'c> {
    async fn get_by_id(self, id_user: Uuid) -> Result<Vec<(User::Model, Vec<Rol::Model>)>, DbErr> {
        let user = User::Entity::find_by_id(id_user)
            .find_with_related(Rol::Entity)
            .all(self.conn)
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

    async fn insert_user(
        self,
        user: User::ActiveModel,
    ) -> Result<Vec<(User::Model, Vec<Rol::Model>)>, DbErr> {
        let user_inserted = User::Entity::insert(user).exec(self.conn).await.unwrap();
        self.get_by_id(user_inserted.last_insert_id).await
    }

    async fn update_user(
        self,
        user: User::ActiveModel,
    ) -> Result<Vec<(User::Model, Vec<Rol::Model>)>, DbErr> {
        let user_updated = User::Entity::update(user).exec(self.conn).await.unwrap();

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
}
