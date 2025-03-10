use crate::camps_users::{
    CampUserEntity, ports::repository::camps_users_repository::CampsUsersRepository,
};
use sea_orm::{DatabaseConnection, DbErr, EntityTrait};

pub struct PgCampsUsersRepository<'c> {
    conn: &'c DatabaseConnection,
}

impl<'c> PgCampsUsersRepository<'c> {
    pub fn new(conn: &'c DatabaseConnection) -> Self {
        Self { conn }
    }
}

impl<'c> CampsUsersRepository for PgCampsUsersRepository<'c> {
    async fn assign_camps_to_user(
        self,
        camp_user: CampUserEntity::ActiveModel,
    ) -> Result<(), DbErr> {
        CampUserEntity::Entity::insert(camp_user)
            .exec(self.conn)
            .await
            .unwrap();

        Ok(())
    }

    async fn remove_user_to_camp(
        self,
        camp_user: CampUserEntity::ActiveModel,
    ) -> Result<(), DbErr> {
        CampUserEntity::Entity::delete(camp_user)
            .exec(self.conn)
            .await
            .unwrap();

        Ok(())
    }
}
