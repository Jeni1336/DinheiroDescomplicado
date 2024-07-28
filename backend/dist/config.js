"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('finance_app', 'root', 'your_password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});
exports.default = sequelize;
