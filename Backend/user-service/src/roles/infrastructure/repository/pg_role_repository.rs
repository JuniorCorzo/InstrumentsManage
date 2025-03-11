use sea_orm::{
    ConnectionTrait, DatabaseConnection, DbErr, EntityTrait, QueryFilter, QuerySelect, QueryTrait,
};
use sea_query::Expr;
use uuid::Uuid;

use crate::roles::{RolesEntity, ports::repository::role_repository::RoleRepository};

#[derive(Clone, Copy)]
pub struct PgRoleRepository<'c> {
    conn: &'c DatabaseConnection,
}

impl<'c> PgRoleRepository<'c> {
    pub fn new(conn: &'c DatabaseConnection) -> Self {
        Self { conn }
    }
}

impl<'c> RoleRepository for PgRoleRepository<'c> {
    async fn get_all_role(self) -> Vec<RolesEntity::Model> {
        RolesEntity::Entity::find().all(self.conn).await.unwrap()
    }

    async fn exist_by_id(self, id_role: &Uuid) -> Result<bool, DbErr> {
        let query = RolesEntity::Entity::find()
            .select_only()
            .expr_as(
                Expr::cust_with_expr(
                    "$1 = 1",
                    Expr::col((RolesEntity::Entity, RolesEntity::Column::Id)).count(),
                ),
                "is_exist",
            )
            .filter(Expr::col((RolesEntity::Entity, RolesEntity::Column::Id)).eq(id_role.clone()))
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
