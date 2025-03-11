use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct ResponseErrorStruct {
    pub status: String,
    pub error: String,
}

impl ResponseErrorStruct {
    pub fn new(status: String, error: String) -> Self {
        Self { status, error }
    }
}
