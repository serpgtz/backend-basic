

const Paciente = require("./paciente");
const Cita = require("./cita");
const Dentista = require("./dentista");



//-------------------------1-N------------------------------------


// Pais.hasMany(Estado)
// Estado.belongsTo(Pais)
Paciente.hasMany(Cita, { foreignKey: 'pacienteId' });
Cita.belongsTo(Paciente, { foreignKey: 'pacienteId' });

//----------------------------n a n ------------------------------------------
Dentista.belongsToMany(Cita, {through: "Dentista_Cita"});
Cita.belongsToMany(Dentista, {through: "Dentista_Cita"});

Dentista.belongsToMany(Paciente, {through: "Dentista_Paciente"});
Paciente.belongsToMany(Dentista, {through: "Dentista_Paciente"});



module.exports = {
    Paciente,
    Cita,
    Dentista
}

