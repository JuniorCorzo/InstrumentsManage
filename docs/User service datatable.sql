SET search_path TO 'user_service';

CREATE TABLE "users" (
  "id" uuid PRIMARY KEY,
  "username" varchar,
  "password" varchar,
  "email" varchar,
  "phone" varchar(15),
  "role" uuid,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "camps" (
  "id_camp" varchar(12) PRIMARY KEY
);

CREATE TABLE "role" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "permissions" varchar[]
);

ALTER TABLE "users" ADD FOREIGN KEY ("role") REFERENCES "role" ("id");

CREATE TABLE "camps_users" (
  "id_camp" varchar(12),
  "id_user" uuid,
  PRIMARY KEY ("id_camp", "id_user")
);

ALTER TABLE "camps_users" ADD FOREIGN KEY ("id_camp") REFERENCES "camps" ("id_camp");

ALTER TABLE "camps_users" ADD FOREIGN KEY ("id_user") REFERENCES "users" ("id");

