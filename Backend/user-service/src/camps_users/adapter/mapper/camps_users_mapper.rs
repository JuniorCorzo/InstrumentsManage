use sea_orm::Set;
use uuid::Uuid;

use crate::camps_users::{CampUserEntity, adapter::request::camps_users_request::CampsUserRequest};

impl From<CampsUserRequest> for Vec<CampUserEntity::ActiveModel> {
    fn from(value: CampsUserRequest) -> Self {
        let result: Vec<CampUserEntity::ActiveModel> = value
            .id_camps
            .into_iter()
            .map(|id| CampUserEntity::ActiveModel {
                id_user: Set(Uuid::parse_str(value.id_user.as_str()).unwrap()),
                id_camp: Set(id),
            })
            .collect();

        result
    }
}
