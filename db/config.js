require('dotenv').config();

const { Sequelize } = require("sequelize");

const { DB_USER, DB_PASSWORD, NAME_BD, HOST_MYSQL } = process.env;

const db = new Sequelize(NAME_BD, DB_USER, DB_PASSWORD, {
  host: HOST_MYSQL,
  dialect: "mysql",
  timezone: "America/Los_Angeles",
  dialectOptions: {
    timezone: "local"
  }
});

module.exports = db;
