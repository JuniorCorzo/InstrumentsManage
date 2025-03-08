use actix_web::http::StatusCode;
use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct Response<T> {
    status: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    data: Option<Vec<T>>,
    message: String,
}

impl<T> Response<T> {
    pub fn new(status: StatusCode, data: Option<T>, message: String) -> Self {
        let mut data_vec: Vec<T> = Vec::new();
        data_vec.push(data.unwrap());

        Self {
            status: status.to_string(),
            data: Some(data_vec),
            message,
        }
    }

    pub fn new_with_vec(status: StatusCode, data: Vec<T>, message: String) -> Self {
        Self {
            status: status.to_string(),
            data: Some(data),
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
