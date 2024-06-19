
const { response } = require("express")
const Dentista = require("../model/dentista")
const Boom = require('@hapi/boom');
const Cita = require("../model/cita");
const bcryptjs = require("bcryptjs");


const createDentista = async (req, res = response, next) => {


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
            password,
            especialidad,
            celular} = req.body


        const dentista = await Dentista.findOne({ where: { correo } });
        console.log("existeEmail", dentista);

        if(dentista){
            throw Boom.notFound("ya existe registrado correo electronico")
        } 
 
     const nuevo_dentista = {
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
         especialidad,
         password,
         especialidad
     }

     // encriptar contraseña
     const salt = bcryptjs.genSaltSync();
     nuevo_dentista.password = bcryptjs.hashSync(password,salt); 

 
     const dentistaCreado = await Dentista.create(nuevo_dentista)
 

 
     return res.status(200).json({msg:"Dentista creado con exito!!",dentistaCreado})
  
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
    createDentista,
    
}