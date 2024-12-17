const { DataTypes } = require('sequelize');
const db = require("../db/config");

const Procedimiento_Orden = db.define('Procedimiento_Orden', {
    // Definición de las propiedades del modelo Metodo_pago
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    OrdenId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },

    ProcedimientoId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },

 
});

module.exports = Procedimiento_Orden;
