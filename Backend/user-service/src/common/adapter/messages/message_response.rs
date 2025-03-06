pub enum MessageResponse {
    OK,
}

impl MessageResponse {
    pub fn value(&self) -> String {
        match self {
            MessageResponse::OK => String::from("Operación completada con éxito"),
        }
    }
}
