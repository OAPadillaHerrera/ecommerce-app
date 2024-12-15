import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UsersRolesAdded1734104481399 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const columnExists = await queryRunner.hasColumn("users", "roles");
    if (!columnExists) {
      await queryRunner.query(`ALTER TABLE "users" ADD "roles" text`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
  }

    
}
