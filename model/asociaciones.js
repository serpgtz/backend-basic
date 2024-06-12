

const Paciente = require("./paciente");
const Cita = require("./cita")



//-------------------------1-N------------------------------------


// Pais.hasMany(Estado)
// Estado.belongsTo(Pais)
Paciente.hasMany(Cita, { foreignKey: 'pacienteId' });
Cita.belongsTo(Paciente, { foreignKey: 'pacienteId' });


module.exports = {
    Paciente,
    Cita
}

