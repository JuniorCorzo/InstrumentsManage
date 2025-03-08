mod camps;
mod camps_users;
mod common;
mod roles;
mod users;

use crate::common::infrastructure::connect_db::connect_db;
use crate::users::adapters::routes::user_routes::init;
use actix_web::{App, HttpServer, middleware, web};
use roles::adapters::routes::role_routes::role_init;
use sea_orm::DatabaseConnection;

#[derive(Clone)]
pub struct AppState {
    conn: DatabaseConnection,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Server started in 127.0.0.1:8083");
    let conn = connect_db().await;
    let app_state = AppState { conn };

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(app_state.clone()))
            .wrap(middleware::Logger::default())
            .configure(init)
            .configure(role_init)
    })
    .bind(("127.0.0.1", 8083))?
    .run()
    .await
}
