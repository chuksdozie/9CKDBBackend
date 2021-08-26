/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("family", {
    family_id: {
      type: "uuid",
      notNull: true,
      primaryKey: true,
      unique: true,
      default: pgm.func("uuid_generate_v4()"),
      comment: "The unique id of a family",
    },
    parent_firstname: {
      type: "VARCHAR(250)",
      notNull: true,
      comment: "The fullname of the parent",
    },
    parent_lastname: {
      type: "VARCHAR(250)",
      notNull: true,
      comment: "The fullname of the parent",
    },
    parent_phonenumber: {
      type: "VARCHAR(250)",
      notNull: true,
      unique: true,
      comment: "The parent's phone number",
    },
    emergency_firstname: {
      type: "VARCHAR(250)",
      comment: "The fullname of alternative contact (emergency)",
    },
    emergency_lastname: {
      type: "VARCHAR(250)",
      comment: "The fullname of alternative contact (emergency)",
    },
    emergency_phonenumber: {
      type: "VARCHAR(250)",
      comment: "The alternative contact's phone number",
    },
    parent_email: {
      type: "VARCHAR(250)",
      unique: true,
      comment: "The parent's email",
    },
    home_address: {
      type: "VARCHAR(250)",
      comment: "The parent's home address",
    },
    city: {
      type: "VARCHAR(250)",
      comment: "The parent's city",
      notNull: true,
    },
    how_parent_heard_about_us: {
      type: "VARCHAR(250)",
      comment: "How the parent heard of us",
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
      comment: "When the parent was signed up",
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
      comment: "When the parent's details were last updated",
    },
    deleted_at: {
      type: "timestamptz",
      default: null,
      comment: "When the parent was deleted",
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("family", {
    ifExists: true,
  });
}
