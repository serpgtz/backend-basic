const { DataTypes } = require('sequelize');
const db = require("../db/config");

const Factura = db.define('Factura', {
    
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    monto: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, 
    },
});

module.exports = Factura;
