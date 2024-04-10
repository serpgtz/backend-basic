// const fs = require('fs');
// const path = require('path');
// // require('dotenv').config();
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });



// const configFile = path.resolve(__dirname, 'config.json');

// console.log('DB_USERs:', process.env.USER_SERVER);
// console.log('DB_PASSWORD:', process.env.PASS_SERV);
// console.log('DATA_BASE:', process.env.NAME_SERVER);
// console.log('HOST_MYSQL:', process.env.HOST_MYSQL);


// const config = {
//   development: {
//     username: process.env.USER_SERVER,
//     password: process.env.PASS_SERV,
//     database: process.env.NAME_SERVER,
//     host: process.env.HOST_MYSQL,
//     dialect: 'mysql',
//   },
//   test: {
//     username: process.env.USER_SERVER,
//     password: process.env.PASS_SERV,
//     database: process.env.NAME_SERVER,
//     host: process.env.HOST_MYSQL,
//     dialect: 'mysql',
//   },
//   production: {
//     username: process.env.USER_SERVER,
//     password: process.env.PASS_SERV,
//     database: process.env.NAME_SERVER,
//     host: process.env.HOST_MYSQL,
//     dialect: 'mysql',
//   },
// };

// // Guardar el archivo de configuración modificado
// fs.writeFileSync(configFile, JSON.stringify(config, null, 2));

// console.log('Configuración actualizada con variables de entorno.');
