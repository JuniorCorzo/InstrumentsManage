use crate::roles::{RolesEntity, adapters::response::role_response::RoleResponse};

impl From<RolesEntity::Model> for RoleResponse {
    fn from(value: RolesEntity::Model) -> Self {
        Self {
            id: value.id,
            name: value.name,
            permissions: value.permissions,
        }
    }
}
