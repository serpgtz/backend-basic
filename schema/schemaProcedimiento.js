const Joi = require('joi');

const nombre = Joi.string().pattern(/^[a-zA-Z0-9 ]+$/).min(3).max(100);

const precio = Joi.number().precision(2); // Permite números flotantes con hasta 2 decimales
const descripcion = Joi.string().pattern(/^[a-zA-Z0-9 ]+$/).min(3).max(100);
const activo = Joi.boolean()



// const telefono = Joi.string().alphanum().min(6).max(30)
// const celular = Joi.string().alphanum().min(6).max(30)
// const password = Joi.string().min(8).max(12)
// const especialidad = Joi.string().alphanum().min(3).max(50)


const dentistaId = Joi.string().guid({ version: 'uuidv4' })


const schemaCrearProcedimiento = Joi.object({
   
    nombre:nombre.required(),
    descripcion:descripcion.required(),
    activo:activo.required(),
    precio:precio.required()
    
   
    
})

// const validarIdDentistaSchema = Joi.object({
//     dentistaId:dentistaId.required()
// })

// en este caso no es requerido por que es una actualizacion y puede o no venir el dato
// const schemaProductUpdate = Joi.object({
//     name:name,
//     price:price
// })

// const getProductSchema = Joi.object({
//     id:id.required()
// })

module.exports = {
    schemaCrearProcedimiento
    // getProductSchema
}
