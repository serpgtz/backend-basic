
const { response } = require("express")
const Paciente = require("../model/paciente")
const Boom = require('@hapi/boom');
const Cita = require("../model/cita");


const createPaciente = async (req, res = response, next) => {


    try {
        const {nombre,
            segundoNombre,
            apellidoP,
            apellidoM,
            correo,  
            calle,
            numero_casa,
            colonia,
            telefono,
            celular} = req.body


        const paciente = await Paciente.findOne({ where: { correo } });
        console.log("existeEmail", paciente);

        if(paciente){
            throw Boom.notFound("ya existe registrado correo electronico")
        } 
 
     const nuevo_paciente = {
         nombre,
         segundoNombre, 
         apellidoP,
         apellidoM,
         correo,
         calle,
         numero_casa,
         colonia,
         telefono,
         celular
     }
 
     const pacienteCreado = await Paciente.create(nuevo_paciente)
 
     console.log(pacienteCreado)
 
     return res.status(200).json({
         status:0,
         msg:"Paciente creado con exito!!"})
  
    } catch (error) {
        console.log(error)
        next(error)
    }
  
   
}


const obtenerPacientes = async (req, res = response, next) => {

try {

    let pacientes = await Paciente.findAll({
        where:{
            
            alta:true
        },
        include:{
            model:Cita
        }
    })

    return res.status(200).json({
        status:0,
        data:pacientes}) 

} catch (error) {
    console.log(error)
    next(error)
 
}


   
}

const obtenerPacientesPorId = async (req, res = response, next) => {

    try {
        const { pacienteId } = req.params
        let paciente = await Paciente.findByPk(pacienteId)


        if(!paciente){
            throw Boom.notFound("Paciente no Encontrado")
        }
    
        return res.status(200).json({
            status:0,
            data:paciente}) 
    
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
    createPaciente,
    obtenerPacientes,
    obtenerPacientesPorId,
    eliminarPacientesPorId
}