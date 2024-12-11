

import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePasswordLength1733761140983 implements MigrationInterface {
    name = 'UpdatePasswordLength1733761140983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Aumenta la longitud del campo 'password' a 255 caracteres
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" TYPE varchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Vuelve a cambiar la longitud del campo 'password' a su valor original (ej. 100 caracteres, cambia según lo que fuera antes)
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" TYPE varchar(100)`);
    }
}


/*npx ts-node --require tsconfig-paths/register node_modules/typeorm/cli.js migration:run -d dist/config/typeorm.js*/