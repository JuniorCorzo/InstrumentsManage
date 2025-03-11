use actix_web::{HttpResponse, ResponseError, http::StatusCode};
use derive_more::{Display, Error};

use crate::{
    common::adapter::response::response_error_struct::ResponseErrorStruct,
    users::domain::exceptions::user_exceptions::UserExceptions,
};

#[derive(Debug, Display, Error)]
pub enum CampsUsersExceptions {
    #[display("{user}")]
    UserException { user: String, status: StatusCode },
    #[display("Unexpected Error In Database")]
    Database,
}

impl ResponseError for CampsUsersExceptions {
    fn error_response(&self) -> HttpResponse {
        let status = self.status_code();

        HttpResponse::build(status).json(ResponseErrorStruct::new(
            status.to_string(),
            self.to_string(),
        ))
    }

    fn status_code(&self) -> StatusCode {
        match *self {
            CampsUsersExceptions::UserException { ref status, .. } => *status,
            CampsUsersExceptions::Database => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }
}

impl From<UserExceptions> for CampsUsersExceptions {
    fn from(value: UserExceptions) -> Self {
        CampsUsersExceptions::UserException {
            user: value.to_string(),
            status: value.status_code(),
        }
    }
}

impl From<sea_orm::DbErr> for CampsUsersExceptions {
    fn from(_: sea_orm::DbErr) -> Self {
        CampsUsersExceptions::Database
    }
}
