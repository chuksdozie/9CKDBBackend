/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('locations', {
        location_id: {
            type: 'uuid',
            notNull: true,
            primaryKey: true,
            unique: true,
            default: pgm.func('uuid_generate_v4()'),
            comment: 'The unique id of a location',
          },
        location_name: {
            type: 'VARCHAR(250)',
            notNull: true,
            comment: "The name of the location",
            unique: true
          },
        location_address: {
            type: 'VARCHAR(250)',
            notNull: true,
            comment: "The name of the location",
            unique: true
          },
        location_city: {
            type: 'VARCHAR(250)',
            notNull: true,
            comment: "The city of the location",
          },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp'),
            comment: 'When the location was added',
          },
        updated_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('current_timestamp'),
            comment: "When the location details were updated",
          },
        deleted_at: {
            type: 'timestamptz',
            default: null,
            comment: 'When the location was deleted',
          },
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('locations', {
        ifExists: true,
      });
}
