const { DataTypes } = require('sequelize');
const db = require("../db/config");

const Paciente = db.define('Paciente', {
    // Definición de las propiedades del modelo User
    id: {
        type: DataTypes.UUID(50),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        set(value){
          // Capitalizamos la primera letra y convertimos el resto a minúsculas
          this.setDataValue('nombre', value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
        }
    },
    segundoNombre: {
        type: DataTypes.STRING(70),
        set(value){
            if (value) {
                // Capitalizamos la primera letra y convertimos el resto a minúsculas
                this.setDataValue('segundoNombre', value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
            }
        }
    },
    apellidoP: {
        type: DataTypes.STRING(100),
        allowNull: false,
        set(value){
            if (value) {
                // Capitalizamos la primera letra y convertimos el resto a minúsculas
                this.setDataValue('apellidoP', value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
            }
        }
        
    },
    apellidoM: {
        type: DataTypes.STRING(100),
        set(value){
            if (value) {
                // Capitalizamos la primera letra y convertimos el resto a minúsculas
                this.setDataValue('apellidoM', value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
            }
        }
    },
    fecha_recuperacion: {
        type:DataTypes.DATE
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
       
    },
    alta: {
        type:DataTypes.BOOLEAN,
        defaultValue:true

    },
   
    activo: {
        type: DataTypes.BOOLEAN(3),
        defaultValue: true,
    },
   
    nombreCompleto: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.getDataValue("nombre") || ''}  ${this.getDataValue("apellidoP") || ''} `;
        },
    },
    calle: {
        type: DataTypes.STRING(70),
        
    },
    numero_casa: {
        type: DataTypes.STRING(70),
        
    },
    colonia: {
        type: DataTypes.STRING(70),
        
    },
    telefono: {
        type: DataTypes.STRING(70),
        
    },
    celular: {
        type: DataTypes.STRING(70),
        
    },

});

module.exports = Paciente;
