/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("courses_enrolled", {
    id: {
      type: "uuid",
      notNull: true,
      primaryKey: true,
      unique: true,
      default: pgm.func("uuid_generate_v4()"),
      comment: "The unique id of an enrolled course",
    },
    student_id: {
      type: "uuid",
      notNull: true,
      references: 'student("student_id")',
    },
    course_id: {
      type: "uuid",
      notNull: true,
      references: 'courses_available("course_id")',
    },
    camp_id: {
      type: "uuid",
      notNull: true,
      references: 'camps("id")',
    },
    mode: {
      type: "VARCHAR(250)",
      notNull: true,
      comment: "The mode the course was taken eg. online",
    },
    location_id: {
      type: "uuid",
      notNull: true,
      comment: "The course location",
      references: 'locations("location_id")',
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
      comment: "When the course was created",
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
      comment: "When the course details were last updated",
    },
    deleted_at: {
      type: "timestamptz",
      default: null,
      comment: "When the course was deleted",
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("courses_enrolled", {
    ifExists: true,
  });
}
