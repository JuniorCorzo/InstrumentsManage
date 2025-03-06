use actix_web::{HttpResponse, Result, web};
use sea_orm::DatabaseConnection;
use uuid::Uuid;

use crate::{
    AppState,
    roles::RolesEntity,
    users::{
        UserEntity, adapters::dtos::response::user_response_dtos::ResponseUser,
        infrastructure::repository::pg_user_repository::PgUserRepository,
        ports::repository::user_repository::UserRepository,
    },
};

pub struct UserHandler {
    app_state: web::Data<AppState>,
}

impl UserHandler {
    pub fn new(app_state: web::Data<AppState>) -> Self {
        Self { app_state }
    }

    pub async fn get_user_by_id(self, id_user: Uuid) -> Result<ResponseUser> {
        let conn: &DatabaseConnection = &self.app_state.conn;
        let user_repository: PgUserRepository<'_> = PgUserRepository::new(conn);

        let user: Vec<(UserEntity::Model, Vec<RolesEntity::Model>)> =
            user_repository.get_by_id(id_user).await.unwrap();

        Ok(ResponseUser::from(user[0].clone()))
    }

    pub async fn create_user(
        self,
        user: UserEntity::ActiveModel,
    ) -> actix_web::Result<ResponseUser> {
        let conn: &DatabaseConnection = &self.app_state.conn;
        let user_repository: PgUserRepository<'_> = PgUserRepository::new(conn);

        let user_created: Vec<(UserEntity::Model, Vec<RolesEntity::Model>)> =
            user_repository.insert_user(user).await.unwrap();

        Ok(ResponseUser::from(user_created[0].clone()))
    }

    pub async fn update_user(
        self,
        user: UserEntity::ActiveModel,
    ) -> actix_web::Result<ResponseUser> {
        let conn: &DatabaseConnection = &self.app_state.conn;
        let user_repository: PgUserRepository<'_> = PgUserRepository::new(conn);

        let user_updated: Vec<(UserEntity::Model, Vec<RolesEntity::Model>)> =
            user_repository.update_user(user).await.unwrap();

        Ok(ResponseUser::from(user_updated[0].clone()))
    }

    pub async fn delete_user(self, id_user: Uuid) -> actix_web::Result<bool> {
        let conn: &DatabaseConnection = &self.app_state.conn;
        let user_repository: PgUserRepository<'_> = PgUserRepository::new(conn);

        user_repository.delete_user(id_user).await;

        Ok(true)
    }
}
