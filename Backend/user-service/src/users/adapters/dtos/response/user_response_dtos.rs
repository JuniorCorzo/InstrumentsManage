use chrono::NaiveDateTime;
use serde::Serialize;
use uuid::Uuid;

use crate::roles::adapters::response::role_response::RoleResponse;

#[derive(Debug, Clone, Serialize)]
pub struct ResponseUser {
    pub id: Uuid,
    pub username: String,
    pub email: String,
    pub phone: String,
    pub role: RoleResponse,
    pub camps: Vec<String>,
    pub created_at: NaiveDateTime,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub updated_at: Option<NaiveDateTime>,
}
