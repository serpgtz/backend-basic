const fs = require('fs');
const path = require('path');
const { config } = require('dotenv');

config({ path: path.resolve(__dirname, '../.env') });

const configFile = path.resolve(__dirname, 'config.json');

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.NAME_BD,
    host: process.env.HOST_MYSQL,
    dialect: 'mysql',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.NAME_BD,
    host: process.env.HOST_MYSQL,
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.NAME_BD,
    host: process.env.HOST_MYSQL,
    dialect: 'mysql',
  },
};

fs.writeFileSync(configFile, JSON.stringify(config, null, 2));

console.log('Configuración actualizada con variables de entorno.');
