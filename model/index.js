'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

// Crear instancia de Sequelize
let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}
console.log("Instancia de Sequelize creada");

// Array para almacenar los nombres de los modelos cargados
const loadedModels = [];

// Cargar los modelos
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const modelDefiner = require(path.join(__dirname, file));
    const model = modelDefiner(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // Asignar el modelo al objeto db
    loadedModels.push(model.name); // Agregar el nombre del modelo al array
  
  });

// Establecer asociaciones entre los modelos
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
        console.log(`Asociaciones establecidas para el modelo: ${modelName}`);
    }
});

// Asignar instancias de Sequelize a db
db.Sequelize = Sequelize;

// Comprobar los modelos cargados
console.log("Modelos en db:", loadedModels);

// Exportar el objeto db con los modelos
module.exports = db;
