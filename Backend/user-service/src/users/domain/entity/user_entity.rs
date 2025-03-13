use chrono::NaiveDateTime;
use sea_orm::{FromQueryResult, entity::prelude::*};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::roles::RolesEntity::RoleResponseQuery;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "users")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: Uuid,
    pub username: String,
    pub email: String,
    pub password: String,
    pub phone: String,
    pub role: Uuid,
    #[sea_orm(column_type = "Timestamp")]
    pub created_at: NaiveDateTime,
    #[sea_orm(column_type = "Timestamp")]
    pub updated_at: Option<NaiveDateTime>,
}

#[derive(Debug, Clone, FromQueryResult)]
pub struct UserResponseQuery {
    pub id: Uuid,
    pub username: String,
    pub email: String,
    pub password: String,
    pub phone: String,
    pub rol: RoleResponseQuery,
    pub camps: Vec<String>,
    pub created_at: NaiveDateTime,
    pub updated_at: Option<NaiveDateTime>,
}

#[derive(Debug, Clone, FromQueryResult)]
pub struct UserValid {
    pub id_user: Uuid,
    pub password: String,
}

#[derive(Clone, Copy, Debug, PartialEq, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "crate::roles::RolesEntity::Entity",
        from = "Column::Role",
        to = "crate::roles::RolesEntity::Column::Id"
    )]
    Role,
    #[sea_orm(has_many = "crate::camps_users::CampUserEntity::Entity")]
    CampsUsers,
}

impl Related<crate::camps::CampEntity::Entity> for Entity {
    fn to() -> RelationDef {
        crate::camps_users::CampUserEntity::Relation::Camps.def()
    }

    fn via() -> Option<RelationDef> {
        Some(
            crate::camps_users::CampUserEntity::Relation::Users
                .def()
                .rev(),
        )
    }
}

impl Related<crate::roles::RolesEntity::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Role.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
