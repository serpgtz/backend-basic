const { DataTypes } = require('sequelize');
const db = require("../db/config");

const Receta = db.define('Receta', {
    
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    fecha: {
        type: DataTypes.DATE,
    },
    medicamentos: {
        type: DataTypes.STRING,
        
    },
    instrucciones: {
        type: DataTypes.STRING,
        
    },
});

module.exports = Receta;
