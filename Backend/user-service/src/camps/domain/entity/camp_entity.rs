use sea_orm::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize, DeriveEntityModel)]
#[sea_orm(table_name = "camps")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id_camp: String,
}

#[derive(Debug, PartialEq, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(has_many = "crate::camps_users::CampUserEntity::Entity")]
    CampsUsers,
}

impl Related<crate::users::UserEntity::Entity> for Entity {
    fn to() -> RelationDef {
        crate::camps_users::CampUserEntity::Relation::Camps.def()
    }

    fn via() -> Option<RelationDef> {
        Some(
            crate::camps_users::CampUserEntity::Relation::Camps
                .def()
                .rev(),
        )
    }
}

impl ActiveModelBehavior for ActiveModel {}
