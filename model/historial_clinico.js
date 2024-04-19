const { DataTypes } = require('sequelize');
const db = require("../db/config");

const Historial_clinico = db.define('Historial_clinico', {
    // Definición de las propiedades del modelo User
    id: {
        type: DataTypes.UUID(50),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    fecha: {
        type: DataTypes.DATE(6), // Establece la precisión máxima a 6
        allowNull: true,
    },
    
});

module.exports = Historial_clinico;
