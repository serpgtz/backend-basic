const { DataTypes } = require('sequelize');
const db = require("../db/config");

const Transaccion = db.define('Transaccion', {
    
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    fecha: {
        type: DataTypes.DATE,
    },
    total: {
        type: DataTypes.STRING,
        
    },
    tipo_transaccion: {
        type: DataTypes.ENUM('efectivo', 'bancario'),
        allowNull: false,
        
    },
});

module.exports = Transaccion;
