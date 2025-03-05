use sea_orm::DbErr;
use uuid::Uuid;

use crate::users::adapters::dtos::request::user_request_dtos::ChangePassword;

use crate::roles::RolesEntity;
use crate::users::UserEntity;

pub trait UserRepository {
    async fn get_by_id(
        self,
        id_user: Uuid,
    ) -> Result<Vec<(UserEntity::Model, Vec<RolesEntity::Model>)>, DbErr>;
    async fn change_password(self, change_password: ChangePassword) -> Result<(), DbErr>;
    async fn insert_user(
        self,
        user: UserEntity::ActiveModel,
    ) -> Result<Vec<(UserEntity::Model, Vec<RolesEntity::Model>)>, DbErr>;
    async fn update_user(
        self,
        user: UserEntity::ActiveModel,
    ) -> Result<Vec<(UserEntity::Model, Vec<RolesEntity::Model>)>, DbErr>;
    async fn delete_user(self, user_id: Uuid) -> bool;
}
