use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct CampsUserRequest {
    pub id_camps: Vec<String>,
    pub id_user: String,
}
