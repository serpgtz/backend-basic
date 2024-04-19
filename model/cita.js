const { DataTypes } = require('sequelize');
const db = require("../db/config");

const Cita = db.define('Cita', {
    // Definición de las propiedades del modelo Cita
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    fecha: {
        type: DataTypes.DATE,
    },
    hora: {
        type: DataTypes.TIME,
    },
    estado: {
        type: DataTypes.ENUM('abierta', 'atendida', 'cancelada'),
        allowNull: false,
    },
});

module.exports = Cita;
