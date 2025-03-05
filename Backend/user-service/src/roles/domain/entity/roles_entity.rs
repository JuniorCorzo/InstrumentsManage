use sea_orm::prelude::*;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, DeriveEntityModel)]
#[sea_orm(table_name = "role")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: Uuid,
    pub name: String,
    pub permissions: Vec<String>,
}

#[derive(Debug, PartialEq, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(has_many = "crate::users::UserEntity::Entity")]
    Users,
}

impl Related<crate::users::UserEntity::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Users.def()
    }
}
impl ActiveModelBehavior for ActiveModel {}
