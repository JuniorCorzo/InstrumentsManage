use actix_web::{Result, web};

use crate::{
    AppState,
    roles::{
        adapters::response::role_response::RoleResponse,
        infrastructure::repository::pg_role_repository::PgRoleRepository,
        ports::repository::role_repository::RoleRepository,
    },
};

pub struct RoleHandler {
    app_state: web::Data<AppState>,
}

impl RoleHandler {
    pub fn new(app_state: web::Data<AppState>) -> Self {
        Self { app_state }
    }

    pub async fn get_all_role(self) -> Result<Vec<RoleResponse>> {
        let role_repository: PgRoleRepository<'_> = PgRoleRepository::new(&self.app_state.conn);
        let roles: Vec<RoleResponse> = role_repository
            .get_all_role()
            .await
            .into_iter()
            .map(RoleResponse::from)
            .collect();

        Ok(roles)
    }
}
