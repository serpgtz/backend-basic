const { DataTypes } = require('sequelize');
const db = require("../db/config");



const Procedimiento = db.define('Procedimiento', {
    // Definición de las propiedades del modelo User
    id: {
        type: DataTypes.UUID(50),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
       
    },

    precio: {
        type: DataTypes.FLOAT

    },

    // cantidad: {
    //     type: DataTypes.INTEGER,
    //     defaultValue:1,

    // },
 
   
    activo: {
        type: DataTypes.BOOLEAN(3),
        defaultValue: true,
    },
    alta: {
        type:DataTypes.BOOLEAN,
        defaultValue:true

    },
   
    /* The `descripcion` property in the `Procedimiento` model is defining a field that stores a string
    value. This field is used to provide a description or additional information about the
    procedure. It allows for storing textual information related to the procedure that can be used
    for further details or clarification. */
    descripcion: {
        type: DataTypes.STRING,
    },
   
   

},
{

    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
        
        
    
    });

module.exports = Procedimiento;
