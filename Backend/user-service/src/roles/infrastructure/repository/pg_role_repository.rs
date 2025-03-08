use sea_orm::{DatabaseConnection, EntityTrait};

use crate::roles::{RolesEntity, ports::repository::role_repository::RoleRepository};

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
}
