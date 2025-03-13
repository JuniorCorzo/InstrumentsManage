use actix_web::{Result, web};
use argon2::{
    Argon2, PasswordHash, PasswordHasher,
    password_hash::{SaltString, rand_core::OsRng},
};
use sea_orm::{DatabaseConnection, Set};
use uuid::Uuid;

use crate::{
    AppState,
    roles::{
        application::validations::rol_validations::RolValidations,
        infrastructure::repository::pg_role_repository::PgRoleRepository,
    },
    users::{
        UserEntity::{self, UserValid},
        adapters::dtos::{
            request::user_request_dtos::{
                ChangePassword, CreateUser, UpdateUser, ValidUserCredentials,
            },
            response::user_response_dtos::ResponseUser,
        },
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

    pub async fn valid_credentials(
        self,
        credentials: ValidUserCredentials,
    ) -> Result<ResponseUser, UserExceptions> {
        let user_repository = &PgUserRepository::new(&self.app_state.conn);

        let user_is_valid: Option<UserValid> = user_repository
            .is_credential_valid(credentials.email)
            .await?;

        let user_credentials: UserValid = match user_is_valid {
            Some(user) => Ok(user),
            None => Err(UserExceptions::CredentialsNotValid),
        }?;

        let user = self.get_user_by_id(user_credentials.id_user).await?;

        let password_hash = PasswordHash::new(&user_credentials.password)
            .map_err(|_| UserExceptions::CredentialsNotValid)?;
        password_hash
            .verify_password(&[&Argon2::default()], credentials.password.as_bytes())
            .map_err(|_| UserExceptions::CredentialsNotValid)?;

        Ok(ResponseUser::from(user))
    }

    pub async fn create_user(self, user: &mut CreateUser) -> Result<ResponseUser, UserExceptions> {
        let conn: &DatabaseConnection = &self.app_state.conn;
        let user_repository: &PgUserRepository<'_> = &PgUserRepository::new(conn);

        UserValidations::exist_email(&user_repository, &Set(user.email.clone())).await?;
        RolValidations::exist_by_id(
            &PgRoleRepository::new(&self.app_state.conn),
            &RolValidations::valid_id_format(&user.role.as_str())?,
        )
        .await?;

        user.password = self.encrypt_password(&user.password)?;
        let user_created: UserEntity::UserResponseQuery = user_repository
            .insert_user(user.clone().into())
            .await?
            .unwrap();

        Ok(ResponseUser::from(user_created))
    }

    pub async fn update_user(
        self,
        user: &mut UpdateUser,
    ) -> actix_web::Result<ResponseUser, UserExceptions> {
        let conn: &DatabaseConnection = &self.app_state.conn;
        let user_repository: &PgUserRepository<'_> = &PgUserRepository::new(conn);

        UserValidations::exist_by_id(
            user_repository,
            &UserValidations::valid_id_format(&user.id)?,
        )
        .await?;

        RolValidations::exist_by_id(
            &PgRoleRepository::new(&self.app_state.conn),
            &RolValidations::valid_id_format(&user.role)?,
        )
        .await?;

        user.password = self.encrypt_password(&user.password)?;
        let user_updated: UserEntity::UserResponseQuery = user_repository
            .update_user(user.clone().into())
            .await?
            .unwrap();

        Ok(ResponseUser::from(user_updated))
    }

    pub async fn change_password(
        self,
        change_password: &mut ChangePassword,
    ) -> Result<(), UserExceptions> {
        let user_repository: &PgUserRepository<'_> = &PgUserRepository::new(&self.app_state.conn);

        UserValidations::exist_by_id(
            user_repository,
            &UserValidations::valid_id_format(change_password.id.as_str())?,
        )
        .await?;

        change_password.new_password = self.encrypt_password(&change_password.new_password)?;
        user_repository
            .change_password(change_password.clone())
            .await?;
        Ok(())
    }

    pub async fn delete_user(self, id_user: Uuid) -> actix_web::Result<bool, UserExceptions> {
        let conn: &DatabaseConnection = &self.app_state.conn;
        let user_repository: &PgUserRepository<'_> = &PgUserRepository::new(conn);

        UserValidations::exist_by_id(user_repository, &id_user).await?;
        user_repository.delete_user(id_user).await;

        Ok(true)
    }

    fn encrypt_password(&self, password: &String) -> Result<String, UserExceptions> {
        let password: &[u8] = password.as_bytes();
        let salt: SaltString = SaltString::generate(&mut OsRng);

        Ok(Argon2::default()
            .hash_password(password, &salt)?
            .to_string())
    }
}
