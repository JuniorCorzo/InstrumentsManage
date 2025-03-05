use serde::Serialize;
use uuid::Uuid;

use crate::roles::adapters::response::role_response::RoleResponse;

#[derive(Debug, Serialize)]
pub struct ResponseUser {
    pub id: Uuid,
    pub username: String,
    pub email: String,
    pub password: String,
    pub phone: String,
    pub role: RoleResponse,
}
