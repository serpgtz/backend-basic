const { DataTypes } = require('sequelize');
const db = require("../db/config");

const Metodo_pago = db.define('Metodo_pago', {
    // Definición de las propiedades del modelo Metodo_pago
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    tipo: {
        type: DataTypes.ENUM('efectivo', 'bancario'),
        allowNull: false,
    },
});

module.exports = Metodo_pago;
