

// const dayjs = require('dayjs')
// const Boom = require("@hapi/boom");
const Orden = require("../model/orden")
// const sequelize = require("../config/sequelizer");
const Cita = require('../model/cita');
const Paciente = require('../model/paciente');




const crearOrden = async (req, res = response, next) => {
    try {
        // let usuario = req.usuario;
        const {citaId } = req.body;


       


        const cita = await Cita.findAll({
            where:{id:citaId},

            include: [
                {
                    model: Paciente,
                    attributes: {
                        exclude: [ 'createdAt', 'updatedAt']
                    }
                }
            ],

            attributes: {
                exclude: [ 'createdAt', 'updatedAt']
            }

        })

        if (!cita) {
            throw Boom.notFound("Dirección no encontrada");
        }

        console.log(cita)

    


        const orden = {
            pacienteNombre:cita[0].Paciente.nombre,
            pacienteApellidoP:cita[0].Paciente.apellidoP,
            pacienteApellidoM:cita[0].Paciente.apellidoM,
            pacienteId:cita[0].pacienteId
        }

        return res.status(200).json({
            data:cita,
            orden}) 
    





        // Crear un array de promesas para obtener los productos
       

         

        


    } catch (error) {
        console.log(error);
        next(error);
    }
};


module.exports = {
    crearOrden
    
}