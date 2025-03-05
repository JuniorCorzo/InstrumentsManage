use chrono::Utc;
use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Users::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(Users::Id).uuid().not_null().primary_key())
                    .col(ColumnDef::new(Users::Username).string().not_null())
                    .col(ColumnDef::new(Users::Email).string().not_null())
                    .col(ColumnDef::new(Users::Password).string().not_null())
                    .col(ColumnDef::new(Users::Phone).string().not_null())
                    .col(ColumnDef::new(Users::Role).uuid().not_null())
                    .col(
                        ColumnDef::new(Users::CreatedAt)
                            .not_null()
                            .timestamp()
                            .default(Utc::now().timestamp()),
                    )
                    .col(ColumnDef::new(Users::UpdatedAt).timestamp())
                    .to_owned(),
            )
            .await?;

        manager
            .create_table(
                Table::create()
                    .table(Role::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(Role::Id).uuid().not_null().primary_key())
                    .col(ColumnDef::new(Role::Name).string().not_null())
                    .col(
                        ColumnDef::new(Role::Permissions)
                            .array(ColumnType::Text)
                            .not_null(),
                    )
                    .to_owned(),
            )
            .await?;

        manager
            .create_table(
                Table::create()
                    .table(Camps::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Camps::IdCamp)
                            .uuid()
                            .not_null()
                            .primary_key(),
                    )
                    .to_owned(),
            )
            .await?;

        manager
            .create_table(
                Table::create()
                    .table(CampsUsers::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(CampsUsers::IdCamp).string().not_null())
                    .col(ColumnDef::new(CampsUsers::IdUser).uuid().not_null())
                    .primary_key(
                        Index::create()
                            .col(CampsUsers::IdCamp)
                            .col(CampsUsers::IdUser),
                    )
                    .to_owned(),
            )
            .await?;

        manager
            .create_foreign_key(
                sea_query::ForeignKey::create()
                    .name("fk_users_role")
                    .from(Users::Table, Users::Role)
                    .to(Role::Table, Role::Id)
                    .on_update(ForeignKeyAction::Cascade)
                    .on_delete(ForeignKeyAction::Cascade)
                    .to_owned(),
            )
            .await?;

        manager
            .create_foreign_key(
                sea_query::ForeignKey::create()
                    .name("fk_user_id")
                    .from(CampsUsers::Table, CampsUsers::IdUser)
                    .to(Users::Table, Users::Id)
                    .to_owned(),
            )
            .await?;

        manager
            .create_foreign_key(
                sea_query::ForeignKey::create()
                    .name("fk_camps_id")
                    .from(CampsUsers::Table, CampsUsers::IdCamp)
                    .to(Camps::Table, Camps::IdCamp)
                    .to_owned(),
            )
            .await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_foreign_key(
                ForeignKey::drop()
                    .name("fk_users_role")
                    .table(Users::Table)
                    .name("fk_user_id")
                    .table(CampsUsers::Table)
                    .name("fk_camps_id")
                    .table(CampsUsers::Table)
                    .to_owned(),
            )
            .await?;

        manager
            .drop_table(
                Table::drop()
                    .table(Users::Table)
                    .if_exists()
                    .table(Role::Table)
                    .if_exists()
                    .table(Camps::Table)
                    .if_exists()
                    .table(CampsUsers::Table)
                    .if_exists()
                    .to_owned(),
            )
            .await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
enum Users {
    Table,
    Id,
    Username,
    Email,
    Password,
    Phone,
    Role,
    #[sea_orm(iden = "created_at")]
    CreatedAt,
    #[sea_orm(iden = "updated_at")]
    UpdatedAt,
}

#[derive(DeriveIden)]
enum Role {
    Table,
    Id,
    Name,
    Permissions,
}

#[derive(DeriveIden)]
enum Camps {
    Table,
    IdCamp,
}

#[derive(DeriveIden)]
enum CampsUsers {
    Table,
    #[sea_orm(iden = "id_camp")]
    IdCamp,
    #[sea_orm(iden = "id_user")]
    IdUser,
}
