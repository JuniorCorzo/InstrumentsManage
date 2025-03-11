use sea_orm::DbErr;

use crate::camps_users::CampUserEntity;

pub trait CampsUsersRepository {
    async fn assign_camps_to_user(
        self,
        camp_user: CampUserEntity::ActiveModel,
    ) -> Result<(), DbErr>;
    async fn remove_user_to_camp(self, camp_user: CampUserEntity::ActiveModel)
    -> Result<(), DbErr>;
}
