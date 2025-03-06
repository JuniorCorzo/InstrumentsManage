use std::str::FromStr;

use actix_web::{Error, HttpResponse, delete, get, http::StatusCode, post, put, web};
use uuid::Uuid;

use crate::{
    AppState,
    common::adapter::{messages::message_response::MessageResponse, response::response::Response},
    users::{
        UserEntity,
        adapters::dtos::{
            request::user_request_dtos::{CreateUser, UpdateUser},
            response::user_response_dtos::ResponseUser,
        },
        application::handler::user_handler::UserHandler,
    },
};

#[get("/{id_user}")]
pub async fn get_user(app_state: web::Data<AppState>, path: web::Path<String>) -> HttpResponse {
    let id_user: String = path.into_inner();
    let user: Result<ResponseUser, Error> = UserHandler::new(app_state)
        .get_user_by_id(Uuid::from_str(&id_user.as_str()).unwrap())
        .await;

    HttpResponse::Ok().json(Response::new(
        StatusCode::OK,
        Some(user.unwrap()),
        MessageResponse::OK.value(),
    ))
}

#[post("/create")]
pub async fn create_user(
    app_state: web::Data<AppState>,
    user_create: web::Json<CreateUser>,
) -> HttpResponse {
    let user: UserEntity::ActiveModel = UserEntity::ActiveModel::from(user_create.into_inner());
    let user: Result<ResponseUser, Error> = UserHandler::new(app_state).create_user(user).await;

    HttpResponse::Created().json(Response::new(
        StatusCode::CREATED,
        Some(user.unwrap()),
        MessageResponse::OK.value(),
    ))
}

#[put("/update")]
pub async fn update_user(
    app_state: web::Data<AppState>,
    user_update: web::Json<UpdateUser>,
) -> HttpResponse {
    let user: UserEntity::ActiveModel = UserEntity::ActiveModel::from(user_update.into_inner());
    let user: Result<ResponseUser, Error> = UserHandler::new(app_state).update_user(user).await;

    HttpResponse::Ok().json(Response::new(
        StatusCode::OK,
        Some(user.unwrap()),
        MessageResponse::OK.value(),
    ))
}

#[delete("/delete/{id_user}")]
pub async fn delete_user(app_state: web::Data<AppState>, path: web::Path<String>) -> HttpResponse {
    let id_user: String = path.into_inner();
    UserHandler::new(app_state)
        .delete_user(Uuid::from_str(&id_user.as_str()).unwrap())
        .await
        .unwrap_err();

    HttpResponse::Ok().json(Response::<()>::without_data(
        StatusCode::OK,
        MessageResponse::OK.value(),
    ))
}

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/users")
            .service(get_user)
            .service(create_user)
            .service(update_user)
            .service(delete_user),
    );
}
