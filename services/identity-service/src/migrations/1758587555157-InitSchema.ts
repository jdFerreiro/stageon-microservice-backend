import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1758587555157 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Tabla roles
        await queryRunner.query(`
            CREATE TABLE roles (
                id varchar(36) NOT NULL PRIMARY KEY,
                name varchar(255) NOT NULL UNIQUE,
                isActive boolean NOT NULL DEFAULT true
            ) ENGINE=InnoDB;
        `);

        // Tabla user_types
        await queryRunner.query(`
            CREATE TABLE user_types (
                id varchar(36) NOT NULL PRIMARY KEY,
                name varchar(255) NOT NULL UNIQUE
            ) ENGINE=InnoDB;
        `);

        // Tabla clubs
        await queryRunner.query(`
            CREATE TABLE clubs (
                id varchar(36) NOT NULL PRIMARY KEY,
                name varchar(255) NOT NULL UNIQUE,
                description varchar(255),
                address varchar(255),
                phone varchar(255),
                logo longtext,
                email varchar(255)
            ) ENGINE=InnoDB;
        `);

        // Tabla users
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
                userTypeId varchar(36),
                CONSTRAINT FK_role FOREIGN KEY (roleId) REFERENCES roles(id),
                CONSTRAINT FK_userType FOREIGN KEY (userTypeId) REFERENCES user_types(id)
            ) ENGINE=InnoDB;
        `);

        // Tabla intermedia users_clubs
        await queryRunner.query(`
            CREATE TABLE users_clubs_clubs (
                usersId varchar(36) NOT NULL,
                clubsId varchar(36) NOT NULL,
                PRIMARY KEY (usersId, clubsId),
                CONSTRAINT FK_users_clubs_user FOREIGN KEY (usersId) REFERENCES users(id),
                CONSTRAINT FK_users_clubs_club FOREIGN KEY (clubsId) REFERENCES clubs(id)
            ) ENGINE=InnoDB;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS users_clubs_clubs;');
        await queryRunner.query('DROP TABLE IF EXISTS users;');
        await queryRunner.query('DROP TABLE IF EXISTS clubs;');
        await queryRunner.query('DROP TABLE IF EXISTS user_types;');
        await queryRunner.query('DROP TABLE IF EXISTS roles;');
    }

}
