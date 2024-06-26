
const { response } = require("express")
const Paciente = require("../model/paciente")
const Boom = require('@hapi/boom');
const Cita = require("../model/cita");
const Dentista = require("../model/dentista");


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
            celular,
            dentistaId} = req.body


        const paciente = await Paciente.findOne({ where: { correo } });
        console.log("existeEmail", paciente);

        if(paciente){
            throw Boom.notFound("ya existe Paciente registrado")
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

   

     await pacienteCreado.addDentista(dentistaId);
 
     
 
     return res.status(200).json({msg:"Paciente creado con exito!!"})
  
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
        include:[
            {
                model:Cita
            },
            {
                model:Dentista
            },

        ]
           
        

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
            const { pacienteId } = req.params
            let paciente = await Paciente.findByPk(pacienteId)
    
    
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

        const actualizarPaciente = async (req, res = response, next) => {


            try {
                const {
                    nombre,
                    segundoNombre,
                    apellidoP,
                    apellidoM,
                    correo,  
                    calle,
                    numero_casa,
                    colonia,
                    telefono,
                    celular,
                    } = req.body
        
                const {pacienteId} = req.params
        
        
                let paciente = await Cita.findByPk(pacienteId)
        
        
                if(!paciente) throw Boom.notFound("Paciente no Encontrado")
        
                    
              let paciente_actualizacion = {
                nombre,
                segundoNombre,
                apellidoP,
                apellidoM,
                correo,
                calle,
                numero_casa,
                colonia,
                telefono,celular
              }

              await Paciente.update(paciente_actualizacion)
        
        
    
         
             return res.status(200).json({msg:"Paciente  Actualizada con exito"})
          
            } catch (error) {
                console.log(error)
                next(error)
            }
          
           
        }
        
    





module.exports = {
    createPaciente,
    obtenerPacientes,
    obtenerPacientesPorId,
    eliminarPacientesPorId,
    actualizarPaciente
}