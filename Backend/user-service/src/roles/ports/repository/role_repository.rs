use crate::roles::RolesEntity;

pub trait RoleRepository {
    async fn get_all_role(self) -> Vec<RolesEntity::Model>;
}
