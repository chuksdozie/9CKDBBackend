/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("admins", {
    id: {
      type: "uuid",
      notNull: true,
      primaryKey: true,
      unique: true,
      default: pgm.func("uuid_generate_v4()"),
      comment: "The unique id of an admin",
    },
    admin_firstname: {
      type: "VARCHAR(250)",
      notNull: true,
      comment: "The first name of the admin",
    },
    admin_lastname: {
      type: "VARCHAR(250)",
      notNull: true,
      comment: "The last name of the parent",
    },
    admin_phonenumber: {
      type: "VARCHAR(250)",
      notNull: true,
      unique: true,
      comment: "The admin's phone number",
    },
    official_email: {
      type: "VARCHAR(250)",
      unique: true,
      comment: "The admin's  official email",
    },
    password: {
      type: "VARCHAR(250)",
      comment: "The admin's password",
    },
    role: {
      type: "VARCHAR(250)",
      default: "super admin",
      comment: "The role of the particular admin",
    },
    verified: {
      type: "BOOL",
      default: false,
      comment: "Whether the admin is verified",
    },
    owner: {
      type: "BOOL",
      default: false,
      comment: "Whether the super admin is the owner",
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
      comment: "When the admin was signed up",
    },
    logged_at: {
      type: "timestamptz",
      default: null,
      comment: "When the admin was looged in",
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
      comment: "When the admin's details were last updated",
    },
    deleted_at: {
      type: "timestamptz",
      default: null,
      comment: "When the admin was deleted",
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("admins", {
    ifExists: true,
  });
}
