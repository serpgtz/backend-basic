


const { Sequelize } = require('sequelize');


const { DB_USER, DB_PASSWORD, NAME_BD, HOST_MYSQL} = process.env

// Configura la conexión a la base de datos
const sequelize = new Sequelize(NAME_BD,DB_USER,DB_PASSWORD, {
  host: HOST_MYSQL,
  dialect: 'mysql'
});

// Verifica la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente.');
  })
  .catch(err => {
    console.error('Error al conectarse a la base de datos:', err);
  });
