use std::str::FromStr;

use uuid::Uuid;

use crate::roles::{
    domain::exceptions::roles_exceptions::RolesExceptions,
    infrastructure::repository::pg_role_repository::PgRoleRepository,
    ports::repository::role_repository::RoleRepository,
};

pub struct RolValidations {}

impl RolValidations {
    pub fn valid_id_format(id: &str) -> Result<Uuid, RolesExceptions> {
        Ok(Uuid::from_str(id)?)
    }

    pub async fn exist_by_id<'a>(
        roles_repository: &'a PgRoleRepository<'a>,
        id: &Uuid,
    ) -> Result<(), RolesExceptions> {
        if !roles_repository.exist_by_id(id).await? {
            return Err(RolesExceptions::NotFound {
                id_role: id.clone(),
            });
        }

        Ok(())
    }
}
