use actix_web::{Result, web};

use crate::{
    AppState,
    camps_users::{
        CampUserEntity, adapter::request::camps_users_request::CampsUserRequest,
        infrastructure::repository::pg_camps_users_repository::PgCampsUsersRepository,
        ports::repository::camps_users_repository::CampsUsersRepository,
    },
};

pub struct CampsUsersHandler {
    app_state: web::Data<AppState>,
}

impl CampsUsersHandler {
    pub fn new(app_state: web::Data<AppState>) -> Self {
        Self { app_state }
    }

    pub async fn assign_camps_to_user(self, camps_users: CampsUserRequest) -> Result<()> {
        let active_models: Vec<CampUserEntity::ActiveModel> = camps_users.into();

        for model in active_models.iter() {
            PgCampsUsersRepository::new(&self.app_state.conn)
                .assign_camps_to_user(model.clone())
                .await
                .unwrap();
        }

        Ok(())
    }

    pub async fn remove_user_to_camp(self, camps_users: CampsUserRequest) -> Result<()> {
        let active_models: Vec<CampUserEntity::ActiveModel> = camps_users.into();

        for model in active_models {
            PgCampsUsersRepository::new(&self.app_state.conn)
                .remove_user_to_camp(model)
                .await
                .unwrap();
        }

        Ok(())
    }
}
