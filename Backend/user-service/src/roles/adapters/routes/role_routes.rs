use actix_web::{HttpResponse, get, http::StatusCode, web};

use crate::{
    AppState,
    common::adapter::{messages::message_response::MessageResponse, response::response::Response},
    roles::application::handler::role_handler::RoleHandler,
};

#[get("/all")]
async fn get_all_role(app_state: web::Data<AppState>) -> HttpResponse {
    let roles = RoleHandler::new(app_state).get_all_role().await;
    HttpResponse::Ok().json(Response::new_with_vec(
        StatusCode::OK,
        roles.unwrap(),
        MessageResponse::OK.value(),
    ))
}

pub fn role_init(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/roles").service(get_all_role));
}
