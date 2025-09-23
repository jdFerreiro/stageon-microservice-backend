import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1758629170167 implements MigrationInterface {
    name = 'InitSchema1758629170167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`roles\` (
                \`id\` varchar(36) NOT NULL,
                \`name\` varchar(255) NOT NULL,
                \`isActive\` tinyint NOT NULL DEFAULT 1,
                UNIQUE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user_types\` (
                \`id\` varchar(36) NOT NULL,
                \`name\` varchar(255) NOT NULL,
                UNIQUE INDEX \`IDX_43a206b10365efbb4c3189a049\` (\`name\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`clubs\` (
                \`id\` varchar(36) NOT NULL,
                \`name\` varchar(255) NOT NULL,
                \`description\` varchar(255) NULL,
                \`address\` varchar(255) NULL,
                \`phone\` varchar(255) NULL,
                \`logo\` longtext NULL,
                \`email\` varchar(255) NULL,
                UNIQUE INDEX \`IDX_5faeec2f663968ba35f61fe46d\` (\`name\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`users_clubs_clubs\` (
                \`id\` varchar(36) NOT NULL,
                \`memberNumber\` varchar(50) NULL,
                \`userId\` varchar(36) NULL,
                \`clubId\` varchar(36) NULL,
                UNIQUE INDEX \`IDX_0fb65351b9a41eeaa6736bae90\` (\`userId\`, \`clubId\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`id\` varchar(36) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`firstName\` varchar(255) NOT NULL,
                \`lastName\` varchar(255) NOT NULL,
                \`passwordHash\` varchar(255) NOT NULL,
                \`isActive\` tinyint NOT NULL DEFAULT 1,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`roleId\` varchar(36) NULL,
                \`userTypeId\` varchar(36) NULL,
                UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_clubs_clubs\`
            ADD CONSTRAINT \`FK_af17d3fbf37a6b729ff902ecb41\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_clubs_clubs\`
            ADD CONSTRAINT \`FK_4debeddae39c47cd9fce4d38bc5\` FOREIGN KEY (\`clubId\`) REFERENCES \`clubs\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD CONSTRAINT \`FK_a8f61a419ce5313def9b0f4c21e\` FOREIGN KEY (\`userTypeId\`) REFERENCES \`user_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a8f61a419ce5313def9b0f4c21e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_clubs_clubs\` DROP FOREIGN KEY \`FK_4debeddae39c47cd9fce4d38bc5\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_clubs_clubs\` DROP FOREIGN KEY \`FK_af17d3fbf37a6b729ff902ecb41\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`users\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_0fb65351b9a41eeaa6736bae90\` ON \`users_clubs_clubs\`
        `);
        await queryRunner.query(`
            DROP TABLE \`users_clubs_clubs\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_5faeec2f663968ba35f61fe46d\` ON \`clubs\`
        `);
        await queryRunner.query(`
            DROP TABLE \`clubs\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_43a206b10365efbb4c3189a049\` ON \`user_types\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user_types\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\`
        `);
        await queryRunner.query(`
            DROP TABLE \`roles\`
        `);
    }

}
