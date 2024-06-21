const Joi = require('joi');
const fecha = Joi.date().iso()
const hora = Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)  // Valida que sea una hora en formato 24 horas (HH:MM)



const pacienteId = Joi.string().guid({ version: 'uuidv4' })
const citaId = Joi.string().guid({ version: 'uuidv4' })
const dentistaId = Joi.string().guid({ version: 'uuidv4' })


const schemaCitaCreate = Joi.object({
   
    fecha:fecha.required(),
    hora: hora.required(),
    dentistaId:dentistaId.required()
    
})

const schemaCitaActualizacion = Joi.object({
   
    fecha:fecha,
    hora: hora
    
})

// const validarIdCitaSchema = Joi.object({
//     pacienteId:pacienteId.required()
// })

const validarIdCitaSchema = Joi.object({
    citaId:citaId.required()
})

// en este caso no es requerido por que es una actualizacion y puede o no venir el dato
// const schemaProductUpdate = Joi.object({
//     name:name,
//     price:price
// })

// const getProductSchema = Joi.object({
//     id:id.required()
// })

module.exports = {
    schemaCitaCreate,
    validarIdCitaSchema,
    schemaCitaActualizacion
    // getProductSchema
}
