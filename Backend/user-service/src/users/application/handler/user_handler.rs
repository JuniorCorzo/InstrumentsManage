use actix_web::{Result, web};
use sea_orm::DatabaseConnection;
use uuid::Uuid;

use crate::{
    AppState,
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

        let user: Option<UserEntity::UserResponseQuery> =
            user_repository.get_by_id(id_user).await.unwrap();

        Ok(ResponseUser::from(user.unwrap().clone()))
    }

    pub async fn valid_credential(self, email: String, password: String) -> Result<bool> {
        Ok(PgUserRepository::new(&self.app_state.conn)
            .is_credential_valid(email, password)
            .await)
    }

    pub async fn create_user(
        self,
        user: UserEntity::ActiveModel,
    ) -> actix_web::Result<ResponseUser> {
        let conn: &DatabaseConnection = &self.app_state.conn;
        let user_repository: PgUserRepository<'_> = PgUserRepository::new(conn);

        let user_created: Option<UserEntity::UserResponseQuery> =
            user_repository.insert_user(user).await.unwrap();

        Ok(ResponseUser::from(user_created.unwrap().clone()))
    }

    pub async fn update_user(
        self,
        user: UserEntity::ActiveModel,
    ) -> actix_web::Result<ResponseUser> {
        let conn: &DatabaseConnection = &self.app_state.conn;
        let user_repository: PgUserRepository<'_> = PgUserRepository::new(conn);

        let user_updated: Option<UserEntity::UserResponseQuery> =
            user_repository.update_user(user).await.unwrap();

        Ok(ResponseUser::from(user_updated.unwrap().clone()))
    }

    pub async fn delete_user(self, id_user: Uuid) -> actix_web::Result<bool> {
        let conn: &DatabaseConnection = &self.app_state.conn;
        let user_repository: PgUserRepository<'_> = PgUserRepository::new(conn);

        user_repository.delete_user(id_user).await;

        Ok(true)
    }
}
