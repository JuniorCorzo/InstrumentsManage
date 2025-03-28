use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct ValidUserCredentials {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Clone, Deserialize)]
pub struct CreateUser {
    pub username: String,
    pub email: String,
    pub password: String,
    pub phone: String,
    pub role: String,
}

#[derive(Debug, Clone, Deserialize)]
pub struct UpdateUser {
    pub id: String,
    pub username: String,
    pub email: String,
    pub password: String,
    pub phone: String,
    pub role: String,
}

#[derive(Debug, Clone, Deserialize)]
pub struct ChangePassword {
    pub id: String,
    pub new_password: String,
}
