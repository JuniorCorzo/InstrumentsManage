use sea_orm::DbErr;
use uuid::Uuid;

use crate::roles::RolesEntity;

pub trait RoleRepository {
    async fn get_all_role(self) -> Vec<RolesEntity::Model>;
    async fn exist_by_id(self, id_role: &Uuid) -> Result<bool, DbErr>;
}
