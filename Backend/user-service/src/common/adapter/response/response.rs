use actix_web::http::StatusCode;
use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct Response<T> {
    status: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    data: Option<T>,
    message: String,
}

impl<T> Response<T> {
    pub fn new(status: StatusCode, data: Option<T>, message: String) -> Self {
        Self {
            status: status.to_string(),
            data,
            message,
        }
    }

    pub fn without_data(status: StatusCode, message: String) -> Self {
        Self {
            status: status.to_string(),
            data: None,
            message,
        }
    }
}
