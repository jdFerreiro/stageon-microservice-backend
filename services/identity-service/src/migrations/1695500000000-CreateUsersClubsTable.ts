import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersClubsTable1695500000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS users_clubs_clubs (
                usersId varchar(36) NOT NULL,
                clubsId varchar(36) NOT NULL,
                PRIMARY KEY (usersId, clubsId),
                CONSTRAINT FK_users_clubs_user FOREIGN KEY (usersId) REFERENCES users(id) ON DELETE CASCADE,
                CONSTRAINT FK_users_clubs_club FOREIGN KEY (clubsId) REFERENCES clubs(id) ON DELETE CASCADE
            ) ENGINE=InnoDB;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS users_clubs_clubs;');
    }
}
