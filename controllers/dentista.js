
const { response } = require("express")
const Dentista = require("../model/dentista")
const Boom = require('@hapi/boom');
const Cita = require("../model/cita");
const bcryptjs = require("bcryptjs");
const Paciente = require("../model/paciente");


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


const obtenerDentista = async (req, res = response, next) => {

try {

    let dentistas = await Dentista.findAll({
        where:{alta:true}
    })

    return res.status(200).json({data:dentistas}) 

} catch (error) {
    console.log(error)
    next(error)
 
}


   
}

const obtenerDentistaPorId = async (req, res = response, next) => {

    try {
        const { dentistaId } = req.params
        let dentista = await Dentista.findByPk(dentistaId,{
            
            include:[
                {
                    model:Paciente
                },
                {
                    model:Cita
                }
            ]
        })


        if(!dentista){
            throw Boom.notFound("Paciente no Encontrado")
        }
    
        return res.status(200).json({data:dentista}) 
    
    } catch (error) {
        console.log(error)
        next(error)
     
    }
    
    }

    const eliminarDentistaPorId = async (req, res = response, next) => {

        try {
            const { dentistaId } = req.params
            let dentista = await Dentista.findByPk(dentistaId)
    
    
            if(!dentista){
                throw Boom.notFound("Paciente no Encontrado")
            }

            dentista.set({alta:false})
            dentista.set({activo:false})
            await dentista.save()


            
        
            return res.status(200).json({data:dentista}) 
        
        } catch (error) {
            console.log(error)
            next(error)
         
        }
        
        }
    





module.exports = {
    createDentista,
    obtenerDentista,
    obtenerDentistaPorId,
    eliminarDentistaPorId
    
}