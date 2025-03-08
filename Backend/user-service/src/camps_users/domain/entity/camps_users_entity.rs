use sea_orm::prelude::*;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Clone, Debug, PartialEq, Serialize, Deserialize, DeriveEntityModel)]
#[sea_orm(table_name = "camps_users")]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id_user: Uuid,
    #[sea_orm(primary_key, auto_increment = false)]
    pub id_camp: String,
}

#[derive(Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "crate::users::UserEntity::Entity",
        from = "Column::IdUser",
        to = "crate::users::UserEntity::Column::Id"
    )]
    Users,
    #[sea_orm(
        belongs_to = "crate::camps::CampEntity::Entity",
        from = "Column::IdCamp",
        to = "crate::camps::CampEntity::Column::IdCamp"
    )]
    Camps,
}

impl Related<crate::users::UserEntity::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Users.def()
    }
}

impl Related<crate::camps::CampEntity::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Camps.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
