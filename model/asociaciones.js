

const Paciente = require("./paciente");
const Cita = require("./cita");
const Dentista = require("./dentista");
const Metodo_pago = require("./metodo_pago");
const Orden = require("./orden");






//-------------------1a1----------------------------------
// Usuario tiene un rol
// añadir una clave foranea rolID a la tabla user    paq     env
Metodo_pago.hasOne(Orden)
Orden.belongsTo(Metodo_pago)





//-------------------------1-N------------------------------------





// Pais.hasMany(Estado)
// Estado.belongsTo(Pais)
Paciente.hasMany(Cita, { foreignKey: 'pacienteId' });
Cita.belongsTo(Paciente, { foreignKey: 'pacienteId' });

// Modelo de Cita
Cita.belongsTo(Dentista, { foreignKey: 'dentistaId' });
Dentista.hasMany(Cita, { foreignKey: 'dentistaId' });



Cita.hasMany(Orden, { foreignKey: 'CitaId' });
Orden.belongsTo(Cita, { foreignKey: 'CitaId' });


//----------------------------n a n ------------------------------------------
// Dentista.belongsToMany(Cita, {through: "Dentista_Cita"});
// Cita.belongsToMany(Dentista, {through: "Dentista_Cita"});

// Dentista.belongsToMany(Paciente, {through: "Dentista_Paciente"});
// Paciente.belongsToMany(Dentista, {through: "Dentista_Paciente"});



// Orden.belongsToMany(Cita, { through: { model: Orden_Cita, unique: false, primaryKey: 'id' } });
// Cita.belongsToMany(Orden, { through: { model: Orden_Cita, unique: false, primaryKey: 'id' } });




module.exports = {
    Paciente,
    Cita,
    Dentista,
    Orden,
    Metodo_pago,
  
}

