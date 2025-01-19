

import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveRolesColumnFromUsers1737320315183 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Eliminar la columna "roles" de la tabla "users"
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Restaurar la columna "roles" si se revierte la migración
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "roles" character varying`);
  }
}
