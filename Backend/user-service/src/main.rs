mod camps;
mod camps_users;
mod common;
mod roles;
mod users;

use crate::common::infrastructure::connect_db::connect_db;
use crate::users::adapters::routes::user_routes::init;
use actix_web::{App, HttpServer, middleware::Logger, web};
use env_logger::Env;
use roles::adapters::routes::role_routes::role_init;
use sea_orm::DatabaseConnection;

#[derive(Clone)]
pub struct AppState {
    conn: DatabaseConnection,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(Env::default().default_filter_or("info"));
    let conn = connect_db().await;
    let app_state = AppState { conn };

    HttpServer::new(move || {
        App::new()
            .configure(init)
            .configure(role_init)
            .wrap(Logger::new("%a \"%r\" %s %b \"%{User-Agent}i\" %T"))
            .app_data(web::Data::new(app_state.clone()))
    })
    .bind(("127.0.0.1", 8083))?
    .run()
    .await
}
