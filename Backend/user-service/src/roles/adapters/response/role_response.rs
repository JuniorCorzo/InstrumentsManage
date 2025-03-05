use serde::Serialize;
use uuid::Uuid;

#[derive(Debug, Clone, Serialize)]
pub struct RoleResponse {
    pub id: Uuid,
    pub name: String,
    pub permissions: Vec<String>,
}
