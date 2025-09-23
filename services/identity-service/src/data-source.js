"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
var typeorm_1 = require("typeorm");
var user_1 = require("./entities/user");
var role_1 = require("./entities/role");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'stageon',
    entities: [user_1.User, role_1.Role],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
});
