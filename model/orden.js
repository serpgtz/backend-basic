const { DataTypes } = require('sequelize');
const db = require("../db/config");

const Orden = db.define('Orden', {
    // Definición de las propiedades del modelo Metodo_pago
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    estado: {
        type: DataTypes.ENUM('abierta', 'pagada',"completada","cancelada"),
        allowNull: false,
    },
    subtotal:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    total:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    
    fecha: {
        type: DataTypes.DATE,
        defaultValue:null,
    },
    pacienteNombre: {
        type: DataTypes.STRING,
       
        
      },
    pacienteApellidoP: {
        type: DataTypes.STRING,
       
        
      },
    pacienteApellidoM: {
        type: DataTypes.STRING,
       
        
      },
    pacienteId:{
        type: DataTypes.STRING
      },
    

   nombreOrden:{
        type: DataTypes.STRING
   }

})
Orden.beforeCreate((instancia) => {
    const primerasCuatroLetras = instancia.usuarioNombre.substring(0, 4).toUpperCase();
    const fechaCreacion = new Date().toISOString().substring(2, 19).replace(/[-:]/g, "");
    instancia.nombreOrden = `${primerasCuatroLetras}${fechaCreacion}`;
  });

module.exports = Orden;
