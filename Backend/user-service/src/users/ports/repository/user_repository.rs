use sea_orm::{ActiveValue, DbErr};
use uuid::Uuid;

use crate::users::adapters::dtos::request::user_request_dtos::ChangePassword;

use crate::users::UserEntity::{self, UserResponseQuery, UserValid};

pub trait UserRepository {
    async fn get_by_id(self, id_user: Uuid) -> Result<Option<UserResponseQuery>, DbErr>;
    async fn change_password(self, change_password: ChangePassword) -> Result<(), DbErr>;
    async fn exist_by_id(self, id_user: &Uuid) -> Result<bool, DbErr>;
    async fn exist_by_email(self, email: ActiveValue<String>) -> Result<bool, DbErr>;
    async fn is_credential_valid(self, email: String) -> Result<Option<UserValid>, DbErr>;
    async fn insert_user(
        self,
        user: UserEntity::ActiveModel,
    ) -> Result<Option<UserResponseQuery>, DbErr>;
    async fn update_user(
        self,
        user: UserEntity::ActiveModel,
    ) -> Result<Option<UserResponseQuery>, DbErr>;
    async fn delete_user(self, user_id: Uuid) -> bool;
}
