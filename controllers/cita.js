
const { response } = require("express")
const Paciente = require("../model/paciente")
const Boom = require('@hapi/boom');
const Cita = require("../model/cita");
const { Op } = require("sequelize");
const Dentista = require("../model/dentista");


const createCita = async (req, res = response, next) => {
    try {
        const { fecha, hora, dentistaId } = req.body;
        const { pacienteId } = req.params;

        // Crear la nueva cita asociada al paciente y dentista
        const cita_nueva = {
            fecha,
            hora,
            pacienteId,
            dentistaId // Asignar directamente el dentistaId
        };

        // Crear la cita en la base de datos
        const citaNueva = await Cita.create(cita_nueva);

        return res.status(200).json({
            status: 0,
            msg: "Cita creada con éxito"
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};



const actualizarCita = async (req, res = response, next) => {


    try {
        const {fecha, hora } = req.body

        const {citaId} = req.params


        let cita = await Cita.findByPk(citaId)


        if(!cita) throw Boom.notFound("Cita no Encontrado")

            
        cita.fecha = fecha
        cita.hora = hora

        await cita.save()




   
 
     return res.status(200).json({msg:"cita Actualizada con exito",cita})
  
    } catch (error) {
        console.log(error)
        next(error)
    }
  
   
}


const obtenerCitas = async (req, res = response, next) => {

try {

    let citas = await Cita.findAll({
        include:[
            {
                model:Paciente
            },
            {
                model:Dentista
            }
        ]
    })

   

    return res.status(200).json({ data:citas}) 

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

    const cancelarCita = async (req, res = response, next) => {

        try {
            const { citaId } = req.params
            let cita = await Cita.findByPk(citaId)
    
    
            if(!cita){
                throw Boom.notFound("Cita no Encontrada")
            }
            if(cita.estado!=="abierta"){
                throw Boom.notFound("Solo se pueden cancelar citas que esten en estado de Abiertas")
            }

           

            cita.set({estado:"cancelada"})
            await cita.save()


            
        
            return res.status(200).json({
                data:cita}) 
        
        } catch (error) {
            console.log(error)
            next(error)
         
        }
        
        }
    





module.exports = {
    createCita,
    obtenerCitas,
    obtenerCitaPorId,
    cancelarCita,
    actualizarCita
    
}