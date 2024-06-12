
const { response } = require("express")
const Paciente = require("../model/paciente")
const Boom = require('@hapi/boom');
const Cita = require("../model/cita");
const { Op } = require("sequelize")


const createCita = async (req, res = response, next) => {


    try {
        const {
            
            fecha,
            hora,
            
           } = req.body

           const {pacienteId} = req.params

           console.log(pacienteId)


        
 
     const cita_nueva = {
         fecha,
         hora, 
         pacienteId
         }
 
     const citaNueva = await Cita.create(cita_nueva)
 
   
 
     return res.status(200).json({
         status:0,
         msg:"cita creada con exito"})
  
    } catch (error) {
        console.log(error)
        next(error)
    }
  
   
}


const obtenerCitas = async (req, res = response, next) => {

try {

    let citas = await Cita.findAll()

   

    return res.status(200).json({
        status:0,
        data:citas}) 

} catch (error) {
    console.log(error)
    next(error)
 
}


   
}

const obtenerCitaPorId = async (req, res = response, next) => {

    try {
        const { citaId } = req.params

        console.log(citaId)
        let cita = await Cita.findByPk(citaId)


        if(!cita){
            throw Boom.notFound("Paciente no Encontrado")
        }
    
        return res.status(200).json({
            status:0,
            data:cita}) 
    
    } catch (error) {
        console.log(error)
        next(error)
     
    }
    
    }

    const eliminarPacientesPorId = async (req, res = response, next) => {

        try {
            const { idPaciente } = req.params
            let paciente = await Paciente.findByPk(idPaciente)
    
    
            if(!paciente){
                throw Boom.notFound("Paciente no Encontrado")
            }

            paciente.set({alta:false})
            await paciente.save()


            
        
            return res.status(200).json({
                status:0,
                data:paciente}) 
        
        } catch (error) {
            console.log(error)
            next(error)
         
        }
        
        }
    





module.exports = {
    createCita,
    obtenerCitas,
    obtenerCitaPorId
    
}