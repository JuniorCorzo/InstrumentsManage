use core::panic;
use std::time::Duration;

use confik::{Configuration, EnvSource};
use dotenvy::dotenv;
use log::info;
use migration::{Migrator, MigratorTrait};
use sea_orm::{ConnectOptions, Database, DatabaseConnection};
#[derive(Debug, Configuration)]
struct DbConfig {
    pub pg_host: String,
    pub pg_port: i32,
    pub pg_user: String,
    #[confik[secret]]
    pub pg_password: String,
    pub pg_dbname: String,
}

impl DbConfig {
    pub fn get_url_connection(&self) -> String {
        return format!(
            "postgres://{}:{}@{}:{}/{}",
            self.pg_user, self.pg_password, self.pg_host, self.pg_port, self.pg_dbname
        );
    }
}

pub async fn connect_db() -> DatabaseConnection {
    dotenv().ok();

    let db_config = DbConfig::builder()
        .override_with(EnvSource::new().allow_secrets())
        .try_build()
        .unwrap();

    let mut opt_connection = ConnectOptions::new(&db_config.get_url_connection());
    opt_connection
        .max_connections(20)
        .min_connections(1)
        .connect_timeout(Duration::from_secs(30))
        .acquire_timeout(Duration::from_secs(30))
        .idle_timeout(Duration::from_secs(30))
        .max_lifetime(Duration::from_secs(30))
        .sqlx_logging(true)
        .set_schema_search_path("user_service");

    let connection = Database::connect(opt_connection)
        .await
        .unwrap_or_else(|_| panic!("error in connect to database"));

    Migrator::up(&connection, None).await.unwrap();

    info!("Connected to database");
    connection
}
