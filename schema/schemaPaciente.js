const Joi = require('joi');

const nombre = Joi.string().alphanum().min(3).max(30)
const segundoNombre = Joi.string().alphanum().min(3).max(30)
const apellidoP = Joi.string().alphanum().min(3).max(50)
const apellidoM = Joi.string().alphanum().min(3).max(50)
const correo = Joi.string().email()
const calle = Joi.string().alphanum().min(3).max(70)
const numero_casa = Joi.string().alphanum().min(3).max(70)
const colonia = Joi.string().alphanum().min(3).max(70)
const telefono = Joi.string().alphanum().min(6).max(30)
const celular = Joi.string().alphanum().min(6).max(30)


const pacienteId = Joi.string().guid({ version: 'uuidv4' })


const schemaPacienteCreate = Joi.object({
   
    nombre:nombre.required(),
    segundoNombre: segundoNombre,
    apellidoP :apellidoP.required(),
    apellidoM :apellidoM,
    correo: correo,
    calle  :calle.required(),
    numero_casa : numero_casa,
    colonia :colonia.required(),
    telefono: telefono,
    celular : celular.required()
})

const validarIdPacienteSchema = Joi.object({
    pacienteId:pacienteId.required()
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
    schemaPacienteCreate,
    validarIdPacienteSchema
    // getProductSchema
}
