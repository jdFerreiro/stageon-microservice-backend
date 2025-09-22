import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1758568448703 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE users (
                id varchar(36) NOT NULL PRIMARY KEY,
                email varchar(255) NOT NULL UNIQUE,
                firstName varchar(255) NOT NULL,
                lastName varchar(255) NOT NULL,
                passwordHash varchar(255) NOT NULL,
                isActive boolean NOT NULL DEFAULT true,
                createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                roleId varchar(36),
                userType ENUM('socio', 'externo') NOT NULL DEFAULT 'socio',
                CONSTRAINT FK_role FOREIGN KEY (roleId) REFERENCES roles(id)
            ) ENGINE=InnoDB;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS users;');
    }

}
