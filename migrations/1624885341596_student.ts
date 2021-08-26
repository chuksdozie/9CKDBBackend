/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('student', {
      student_id: {
        type: 'uuid',
        notNull: true,
        primaryKey: true,
        unique: true,
        default: pgm.func('uuid_generate_v4()'),
        comment: 'The unique id of a student',
      },
      first_name: {
        type: 'VARCHAR(250)',
        notNull: true,
        comment: "The student's first name",
      },
      last_name: {
        type: 'VARCHAR(250)',
        notNull: true,
        comment: "The student's last name",
      },
      family_id: {
        type: 'uuid',
        notNull: true,
        references: 'family("family_id")',
        comment: "The parent's id",
      },
      date_of_birth: {
        type: 'DATE',
        notNull: true,
        comment: "The date of birth of the student"
      },
      sex: {
        type: 'VARCHAR(250)',
        notNull: true,
        comment: "The student's gender",
      },
      created_at: {
        type: 'timestamptz',
        notNull: true,
        default: pgm.func('current_timestamp'),
        comment: 'When the student was signed up',
      },
      updated_at: {
        type: 'timestamptz',
        notNull: true,
        default: pgm.func('current_timestamp'),
        comment: "When the student's details were last updated",
      },
      deleted_at: {
        type: 'timestamptz',
        default: null,
        comment: 'When the student was deleted',
      },
    });
  }
  
  export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('student', {
      ifExists: true,
    });
  }