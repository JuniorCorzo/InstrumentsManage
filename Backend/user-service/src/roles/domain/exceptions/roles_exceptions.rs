use actix_web::{HttpResponse, ResponseError, http::StatusCode};
use derive_more::{Display, Error};
use uuid::Uuid;

use crate::common::adapter::response::response_error_struct::ResponseErrorStruct;

#[derive(Debug, Error, Display)]
pub enum RolesExceptions {
    #[display("Rol with id {id_role} not found")]
    NotFound { id_role: Uuid },
    #[display("Rol Id not valid")]
    IdNotValid,
    #[display("Unexpected Error In Database")]
    Database,
}

impl ResponseError for RolesExceptions {
    fn error_response(&self) -> HttpResponse {
        let status_code = self.status_code();

        HttpResponse::build(status_code).json(ResponseErrorStruct::new(
            status_code.to_string(),
            self.to_string(),
        ))
    }

    fn status_code(&self) -> StatusCode {
        match *self {
            RolesExceptions::NotFound { .. } => StatusCode::NOT_FOUND,
            RolesExceptions::IdNotValid => StatusCode::BAD_REQUEST,
            RolesExceptions::Database => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }
}

impl From<sea_orm::DbErr> for RolesExceptions {
    fn from(_: sea_orm::DbErr) -> Self {
        RolesExceptions::Database
    }
}

impl From<uuid::Error> for RolesExceptions {
    fn from(_: uuid::Error) -> Self {
        RolesExceptions::IdNotValid
    }
}
