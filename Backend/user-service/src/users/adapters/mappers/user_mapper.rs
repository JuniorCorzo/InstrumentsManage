use chrono::Utc;
use sea_orm::Set;
use uuid::Uuid;

use crate::{
    roles::{RolesEntity, adapters::response::role_response::RoleResponse},
    users::{
        UserEntity,
        adapters::dtos::{
            request::user_request_dtos::{CreateUser, UpdateUser},
            response::user_response_dtos::ResponseUser,
        },
    },
};

impl From<(UserEntity::Model, Vec<RolesEntity::Model>)> for ResponseUser {
    fn from(value: (UserEntity::Model, Vec<RolesEntity::Model>)) -> Self {
        let role = value.1.get(0).unwrap().clone();
        Self {
            id: value.0.id,
            username: value.0.username,
            password: value.0.password,
            email: value.0.email,
            phone: value.0.phone,
            role: RoleResponse::from(role),
        }
    }
}

impl From<CreateUser> for UserEntity::ActiveModel {
    fn from(value: CreateUser) -> Self {
        Self {
            id: Set(Uuid::new_v4()),
            username: Set(value.username),
            email: Set(value.email),
            password: Set(value.password),
            phone: Set(value.phone),
            role: Set(value.role),
            created_at: Set(Utc::now().naive_local()),
            ..Default::default()
        }
    }
}

impl From<UpdateUser> for UserEntity::ActiveModel {
    fn from(value: UpdateUser) -> Self {
        Self {
            id: Set(value.id),
            username: Set(value.username),
            email: Set(value.email),
            password: Set(value.password),
            phone: Set(value.phone),
            role: Set(value.role),
            //created_at: Set(Utc::now().naive_local()),
            ..Default::default()
        }
    }
}
