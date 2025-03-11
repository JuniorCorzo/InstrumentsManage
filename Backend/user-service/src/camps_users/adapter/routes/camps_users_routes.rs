use actix_web::{HttpResponse, delete, http::StatusCode, post, web};

use crate::{
    AppState,
    camps_users::{
        adapter::request::camps_users_request::CampsUserRequest,
        application::handler::camps_user_handler::CampsUsersHandler,
        domain::exceptions::camps_user_exceptions::CampsUsersExceptions,
    },
    common::adapter::{messages::message_response::MessageResponse, response::response::Response},
    users::application::validations::user_validations::UserValidations,
};

#[post("/assign-camps")]
pub async fn assign_camps_to_user(
    app_state: web::Data<AppState>,
    camps_users: web::Json<CampsUserRequest>,
) -> Result<HttpResponse, CampsUsersExceptions> {
    UserValidations::valid_id_format(&camps_users.id_user.as_str())?;

    CampsUsersHandler::new(app_state)
        .assign_camps_to_user(camps_users.into_inner())
        .await?;

    Ok(HttpResponse::Ok().json(Response::<()>::without_data(
        StatusCode::OK,
        MessageResponse::OK.value(),
    )))
}

#[delete("/remove-assign-camps")]
pub async fn remove_camps_to_user(
    app_state: web::Data<AppState>,
    camps_users: web::Json<CampsUserRequest>,
) -> Result<HttpResponse, CampsUsersExceptions> {
    UserValidations::valid_id_format(&camps_users.id_user.as_str())?;

    CampsUsersHandler::new(app_state)
        .remove_user_to_camp(camps_users.into_inner())
        .await?;

    Ok(HttpResponse::Ok().json(Response::<()>::without_data(
        StatusCode::OK,
        MessageResponse::OK.value(),
    )))
}
