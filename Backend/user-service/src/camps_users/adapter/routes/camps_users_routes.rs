use actix_web::{
    HttpResponse, delete,
    http::StatusCode,
    post,
    web::{self, ServiceConfig},
};

use crate::{
    AppState,
    camps_users::{
        adapter::request::camps_users_request::CampsUserRequest,
        application::handler::camps_user_handler::CampsUsersHandler,
    },
    common::adapter::{messages::message_response::MessageResponse, response::response::Response},
};

#[post("/assign-camps")]
pub async fn assign_camps_to_user(
    app_state: web::Data<AppState>,
    camps_users: web::Json<CampsUserRequest>,
) -> HttpResponse {
    CampsUsersHandler::new(app_state)
        .assign_camps_to_user(camps_users.into_inner())
        .await
        .unwrap();

    HttpResponse::Ok().json(Response::<()>::without_data(
        StatusCode::OK,
        MessageResponse::OK.value(),
    ))
}

#[delete("/remove-assign-camps")]
pub async fn remove_camps_to_user(
    app_state: web::Data<AppState>,
    camps_users: web::Json<CampsUserRequest>,
) -> HttpResponse {
    CampsUsersHandler::new(app_state)
        .remove_user_to_camp(camps_users.into_inner())
        .await
        .unwrap();

    HttpResponse::Ok().json(Response::<()>::without_data(
        StatusCode::OK,
        MessageResponse::OK.value(),
    ))
}
