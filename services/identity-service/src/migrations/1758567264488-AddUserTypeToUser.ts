import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserTypeToUser1758567264488 implements MigrationInterface {


    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users
            ADD COLUMN userType ENUM('socio', 'externo') NOT NULL DEFAULT 'socio';
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users DROP COLUMN userType;
        `);
    }

}
