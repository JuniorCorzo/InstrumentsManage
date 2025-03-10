use serde::Deserialize;
use uuid::Uuid;

#[derive(Debug, Deserialize)]
pub struct CampsUserRequest {
    pub id_camps: Vec<String>,
    pub id_user: Uuid,
}
