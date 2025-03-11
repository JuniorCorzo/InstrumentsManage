use std::str::FromStr;

use chrono::Utc;
use sea_orm::Set;
use uuid::Uuid;

use crate::{
    roles::adapters::response::role_response::RoleResponse,
    users::{
        UserEntity,
        adapters::dtos::{
            request::user_request_dtos::{CreateUser, UpdateUser},
            response::user_response_dtos::ResponseUser,
        },
    },
};

impl From<UserEntity::UserResponseQuery> for ResponseUser {
    fn from(value: UserEntity::UserResponseQuery) -> Self {
        Self {
            id: value.id,
            username: value.username,
            password: value.password,
            email: value.email,
            phone: value.phone,
            role: RoleResponse::from(value.rol),
            camps: value.camps,
            created_at: value.created_at,
            updated_at: value.updated_at,
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
            role: Set(Uuid::parse_str(&value.role.as_str()).unwrap()),
            created_at: Set(Utc::now().naive_local()),
            ..Default::default()
        }
    }
}

impl From<UpdateUser> for UserEntity::ActiveModel {
    fn from(value: UpdateUser) -> Self {
        Self {
            id: Set(Uuid::from_str(value.id.as_str()).unwrap()),
            username: Set(value.username),
            email: Set(value.email),
            password: Set(value.password),
            phone: Set(value.phone),
            role: Set(Uuid::from_str(&value.role.as_str()).unwrap()),
            updated_at: Set(Some(Utc::now().naive_local())),
            ..Default::default()
        }
    }
}
