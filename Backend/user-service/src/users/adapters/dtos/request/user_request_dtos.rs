use serde::Deserialize;
use uuid::Uuid;

#[derive(Debug, Deserialize)]
pub struct CreateUser {
    pub username: String,
    pub email: String,
    pub password: String,
    pub phone: String,
    pub role: Uuid,
}

#[derive(Debug, Deserialize)]
pub struct UpdateUser {
    pub id: Uuid,
    pub username: String,
    pub email: String,
    pub password: String,
    pub phone: String,
    pub role: Uuid,
}

pub struct ChangePassword {
    pub id: Uuid,
    pub new_password: String,
}
