use actix_web::{HttpResponse, ResponseError, http::StatusCode};
use derive_more::derive::{Display, Error};
use uuid::Uuid;

use crate::{
    common::adapter::response::response_error_struct::ResponseErrorStruct,
    roles::domain::exceptions::roles_exceptions::RolesExceptions,
};

#[derive(Debug, Display, Error)]
pub enum UserExceptions {
    #[display("Unexpected Error")]
    InternalError,
    #[display("User with id {id} not found")]
    NotFound { id: Uuid },
    #[display("Credentials Not Valid")]
    CredentialsNotValid,
    #[display("User Id not valid")]
    IdNotValid,
    #[display("Email exist")]
    EmailExist,
    #[display("Unexpected Error In Database")]
    Database,
    #[display("{role}")]
    RoleExceptions { role: String, status: StatusCode },
}

impl ResponseError for UserExceptions {
    fn error_response(&self) -> HttpResponse {
        let status_code: StatusCode = self.status_code();

        HttpResponse::build(status_code).json(ResponseErrorStruct::new(
            status_code.to_string(),
            self.to_string(),
        ))
    }
    fn status_code(&self) -> StatusCode {
        match *self {
            UserExceptions::InternalError => StatusCode::INTERNAL_SERVER_ERROR,
            UserExceptions::NotFound { .. } => StatusCode::NOT_FOUND,
            UserExceptions::CredentialsNotValid => StatusCode::BAD_REQUEST,
            UserExceptions::IdNotValid => StatusCode::BAD_REQUEST,
            UserExceptions::EmailExist => StatusCode::BAD_REQUEST,
            UserExceptions::Database => StatusCode::INTERNAL_SERVER_ERROR,
            UserExceptions::RoleExceptions { ref status, .. } => *status,
        }
    }
}

impl From<RolesExceptions> for UserExceptions {
    fn from(value: RolesExceptions) -> Self {
        UserExceptions::RoleExceptions {
            role: value.to_string(),
            status: value.status_code(),
        }
    }
}

impl From<uuid::Error> for UserExceptions {
    fn from(_: uuid::Error) -> Self {
        UserExceptions::IdNotValid
    }
}

impl From<sea_orm::DbErr> for UserExceptions {
    fn from(_: sea_orm::DbErr) -> Self {
        UserExceptions::Database
    }
}

impl From<argon2::password_hash::Error> for UserExceptions {
    fn from(value: argon2::password_hash::Error) -> Self {
        UserExceptions::InternalError
    }
}
