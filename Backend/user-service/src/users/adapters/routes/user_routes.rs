use actix_web::{HttpResponse, delete, get, http::StatusCode, patch, post, put, web};
use uuid::Uuid;

use crate::{
    AppState,
    camps_users::adapter::routes::camps_users_routes::{
        assign_camps_to_user, remove_camps_to_user,
    },
    common::adapter::{messages::message_response::MessageResponse, response::response::Response},
    roles::application::validations::rol_validations::RolValidations,
    users::{
        UserEntity,
        adapters::dtos::{
            request::user_request_dtos::{
                ChangePassword, CreateUser, UpdateUser, ValidUserCredentials,
            },
            response::user_response_dtos::ResponseUser,
        },
        application::{
            handler::user_handler::UserHandler, validations::user_validations::UserValidations,
        },
        domain::exceptions::user_exceptions::UserExceptions,
    },
};

#[get("/{id_user}")]
pub async fn get_user(
    app_state: web::Data<AppState>,
    path: web::Path<String>,
) -> Result<HttpResponse, UserExceptions> {
    let id_user: Uuid = UserValidations::valid_id_format(&path.into_inner())?;
    let user = UserHandler::new(app_state).get_user_by_id(id_user).await?;

    Ok(HttpResponse::Ok().json(Response::new(
        StatusCode::OK,
        Some(user),
        MessageResponse::OK.value(),
    )))
}

#[get("/is-valid/")]
pub async fn valid_credentials(
    app_state: web::Data<AppState>,
    credentials: web::Json<ValidUserCredentials>,
) -> Result<HttpResponse, UserExceptions> {
    let is_valid = UserHandler::new(app_state)
        .valid_credentials(credentials.into_inner())
        .await?;

    Ok(HttpResponse::Ok().json(Response::new(
        StatusCode::OK,
        Some(is_valid),
        MessageResponse::OK.value(),
    )))
}

#[post("/create")]
pub async fn create_user(
    app_state: web::Data<AppState>,
    user_create: web::Json<CreateUser>,
) -> Result<HttpResponse, UserExceptions> {
    RolValidations::valid_id_format(&user_create.role)?;

    let user: ResponseUser = UserHandler::new(app_state)
        .create_user(&mut user_create.into_inner())
        .await?;

    Ok(HttpResponse::Created().json(Response::new(
        StatusCode::CREATED,
        Some(user),
        MessageResponse::OK.value(),
    )))
}

#[put("/update")]
pub async fn update_user(
    app_state: web::Data<AppState>,
    user_update: web::Json<UpdateUser>,
) -> Result<HttpResponse, UserExceptions> {
    UserValidations::valid_id_format(&user_update.id)?;
    RolValidations::valid_id_format(&user_update.role)?;

    let user: ResponseUser = UserHandler::new(app_state)
        .update_user(&mut user_update.into_inner())
        .await?;

    Ok(HttpResponse::Ok().json(Response::new(
        StatusCode::OK,
        Some(user),
        MessageResponse::OK.value(),
    )))
}

#[patch("/change-password")]
pub async fn change_password(
    app_state: web::Data<AppState>,
    change_password: web::Json<ChangePassword>,
) -> Result<HttpResponse, UserExceptions> {
    UserHandler::new(app_state)
        .change_password(&mut change_password.into_inner())
        .await?;

    Ok(HttpResponse::Ok().json(Response::<()>::without_data(
        StatusCode::OK,
        MessageResponse::OK.value(),
    )))
}

#[delete("/delete/{id_user}")]
pub async fn delete_user(
    app_state: web::Data<AppState>,
    path: web::Path<String>,
) -> Result<HttpResponse, UserExceptions> {
    let id_user: Uuid = UserValidations::valid_id_format(&path.into_inner().as_str())?;
    UserHandler::new(app_state).delete_user(id_user).await?;

    Ok(HttpResponse::Ok().json(Response::<()>::without_data(
        StatusCode::OK,
        MessageResponse::OK.value(),
    )))
}

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/users")
            .service(get_user)
            .service(valid_credentials)
            .service(create_user)
            .service(update_user)
            .service(delete_user)
            .service(assign_camps_to_user)
            .service(remove_camps_to_user),
    );
}
