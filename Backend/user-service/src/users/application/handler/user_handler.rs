use actix_web::{Result, web};
use sea_orm::DatabaseConnection;
use uuid::Uuid;

use crate::{
    AppState,
    roles::{
        application::validations::rol_validations::RolValidations,
        infrastructure::repository::pg_role_repository::PgRoleRepository,
    },
    users::{
        UserEntity, adapters::dtos::response::user_response_dtos::ResponseUser,
        application::validations::user_validations::UserValidations,
        domain::exceptions::user_exceptions::UserExceptions,
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

    pub async fn get_user_by_id(self, id_user: Uuid) -> Result<ResponseUser, UserExceptions> {
        let conn: &DatabaseConnection = &self.app_state.conn;
        let user_repository: PgUserRepository<'_> = PgUserRepository::new(conn);

        let user: Option<UserEntity::UserResponseQuery> =
            user_repository.get_by_id(id_user).await.unwrap();

        match user {
            None => Err(UserExceptions::NotFound { id: id_user }),
            Some(user) => Ok(ResponseUser::from(user.clone())),
        }
    }

    pub async fn valid_credential(
        self,
        email: String,
        password: String,
    ) -> Result<Uuid, UserExceptions> {
        Ok(PgUserRepository::new(&self.app_state.conn)
            .is_credential_valid(email, password)
            .await?
            .id_user)
    }

    pub async fn create_user(
        self,
        user: UserEntity::ActiveModel,
    ) -> Result<ResponseUser, UserExceptions> {
        let conn: &DatabaseConnection = &self.app_state.conn;
        let user_repository: &PgUserRepository<'_> = &PgUserRepository::new(conn);

        UserValidations::exist_email(&user_repository, &user.email).await?;
        RolValidations::exist_by_id(
            &PgRoleRepository::new(&self.app_state.conn),
            user.role.as_ref(),
        )
        .await?;

        let user_created: Option<UserEntity::UserResponseQuery> =
            user_repository.insert_user(user).await.unwrap();

        Ok(ResponseUser::from(user_created.as_ref().cloned().unwrap()))
    }

    pub async fn update_user(
        self,
        user: UserEntity::ActiveModel,
    ) -> actix_web::Result<ResponseUser, UserExceptions> {
        let conn: &DatabaseConnection = &self.app_state.conn;
        let user_repository: &PgUserRepository<'_> = &PgUserRepository::new(conn);

        UserValidations::exist_by_id(user_repository, user.id.as_ref()).await?;
        RolValidations::exist_by_id(
            &PgRoleRepository::new(&self.app_state.conn),
            user.role.as_ref(),
        )
        .await?;

        let user_updated: Option<UserEntity::UserResponseQuery> =
            user_repository.update_user(user).await?;

        Ok(ResponseUser::from(user_updated.unwrap().clone()))
    }

    pub async fn delete_user(self, id_user: Uuid) -> actix_web::Result<bool, UserExceptions> {
        let conn: &DatabaseConnection = &self.app_state.conn;
        let user_repository: &PgUserRepository<'_> = &PgUserRepository::new(conn);

        UserValidations::exist_by_id(user_repository, &id_user).await?;

        user_repository.delete_user(id_user).await;

        Ok(true)
    }
}
