use std::str::FromStr;

use sea_orm::ActiveValue;
use uuid::Uuid;

use crate::users::{
    domain::exceptions::user_exceptions::UserExceptions,
    infrastructure::repository::pg_user_repository::PgUserRepository,
    ports::repository::user_repository::UserRepository,
};

pub struct UserValidations {}

impl UserValidations {
    pub fn valid_id_format(id: &str) -> Result<Uuid, UserExceptions> {
        Ok(Uuid::from_str(id)?)
    }

    pub async fn exist_email<'a>(
        user_repository: &'a PgUserRepository<'a>,
        email: &ActiveValue<String>,
    ) -> Result<(), UserExceptions> {
        if user_repository.exist_by_email(email.clone()).await? {
            return Err(UserExceptions::EmailExist);
        }

        Ok(())
    }

    pub async fn exist_by_id<'a>(
        user_repository: &'a PgUserRepository<'a>,
        id_user: &Uuid,
    ) -> Result<(), UserExceptions> {
        if !user_repository.exist_by_id(id_user).await? {
            return Err(UserExceptions::NotFound {
                id: id_user.clone(),
            });
        }

        Ok(())
    }
}
