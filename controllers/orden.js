

// const dayjs = require('dayjs')
const Boom = require("@hapi/boom");
const Orden = require("../model/orden")
// const sequelize = require("../config/sequelizer");
const Cita = require('../model/cita');
const Paciente = require('../model/paciente');
const Procedimiento = require("../model/procedimientos");
const Procedimiento_Orden = require("../model/procedimiento_orden.js");
const Metodo_pago = require("../model/metodo_pago");




// const crearOrden = async (req, res = response, next) => {
//     try {
//         // let usuario = req.usuario;
//         const {citaId, MetodoPagoId, procedimientos } = req.body;

                  
        

//         const cita = await Cita.findAll({
//             where:{id:citaId},

//             include: [
//                 {
//                     model: Paciente,
//                     attributes: {
//                         exclude: [ 'createdAt', 'updatedAt']
//                     }
//                 }
//             ],

//             attributes: {
//                 exclude: [ 'createdAt', 'updatedAt']
//             }

//         })

//         if (!cita) {
//             throw Boom.notFound("Dirección no encontrada");
//         }
//         console.log(cita);


//         const promesasProcedimientos = await Promise.all(procedimientos.map(async (p)=> await Procedimiento.findByPk(p.idProcedimiento)))

//         const procedimientosOrden = promesasProcedimientos.forEach(p=>{
//             {
//                 p.nombre,
//                 p.precio,
//                 p.id
                
//             }
//         })


//         console.log("promesasProcediminetos", procedimientosOrden)

//         const fechaActual = new Date();

//         console.log("fechaactual", fechaActual)
        
//         // Convertir la fecha a formato 'YYYYMMDD' para usar substring
//         const fechaFormateada = fechaActual.toISOString().replace(/[-:T.]/g, "").slice(0, 14); // Elimina caracteres no deseados y toma 'YYYYMMDDHHmmss'
//         const ultimos8 = fechaFormateada.slice(-8); 
//         const apellido = cita[0].Paciente.apellidoP.substring(0, 4); // Primeros 4 caracteres del apellido
//         const nombre = cita[0].Paciente.nombre.substring(0, 3); // Primeros 3 caracteres del nombre
//         const fecha = ultimos8.substring(0, 12); // Primeros 8 caracteres de la fecha formateada
        
//         // const nombre_orden = apellido + nombre + fecha;
        
//         // console.log("nombreOrden", nombre_orden);


//         const orden = {
//             pacienteNombre:cita[0].Paciente.nombre,
//             pacienteApellidoP:cita[0].Paciente.apellidoP,
//             pacienteApellidoM:cita[0].Paciente.apellidoM,
//             pacienteId:cita[0].pacienteId,
//             fecha:fechaActual,
//             // nombreOrden:nombre_orden,
//             MetodoPagoId,
//             CitaId:cita[0].id,
//             // subtotal

            
//         }

//         return res.status(200).json({
//             data:cita,
//             orden}) 
    


//         // Crear un array de promesas para obtener los productos
       

         

        


//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// };

const crearOrden = async (req, res = response, next) => {
    try {
        const { citaId, MetodoPagoId, procedimientos } = req.body;

        // Validar que los datos requeridos estén presentes
        // if (!citaId || !MetodoPagoId || !procedimientos || !Array.isArray(procedimientos)) {
        //     throw Boom.badRequest("Datos incompletos para crear la orden.");
        // }

        // Buscar la cita con información del paciente
        const cita = await Cita.findOne({
            where: { id: citaId },
            include: [
                {
                    model: Paciente,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (!cita) {
            throw Boom.notFound("Cita no encontrada.");
        }

        const metodoPago = await Metodo_pago.findByPk(MetodoPagoId)

        if (!metodoPago) {
            throw Boom.notFound("Falta metodo de pago");
        }

        console.log(metodoPago)

        console.log("Cita encontrada:", cita);

        // Validar que el paciente tenga datos para construir el nombre de la orden
        // const { Paciente } = cita;

        // if (!Paciente || !Paciente.apellidoP || !Paciente.nombre) {
        //     throw Boom.badData("Datos del paciente incompletos para generar el nombre de la orden.");
        // }

        // Obtener los procedimientos en paralelo
        const procedimientosEncontrados = await Promise.all(
            procedimientos.map(async (p) => {
                const procedimiento = await Procedimiento.findByPk(p.idProcedimiento);
                if (!procedimiento) {
                    throw Boom.notFound(`Procedimiento con id ${p.idProcedimiento} no encontrado.`);
                }
                return procedimiento;
            })
        );

        console.log("Procedimientos encontrados:", procedimientosEncontrados);

        // Calcular subtotal y preparar datos de procedimientos para la orden
        const procedimientosOrden = procedimientosEncontrados.map((p) => ({
            nombre: p.nombre,
            precio: p.precio,
            id: p.id
        }));
        const subtotal = procedimientosOrden.reduce((sum, p) => sum + p.precio, 0);
        const total = subtotal; // Puedes agregar impuestos o descuentos aquí si es necesario

        console.log("Subtotal calculado:", subtotal);

        // Formatear la fecha actual para el nombre de la orden
        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toISOString().replace(/[-:T.]/g, "").slice(0, 14); // YYYYMMDDHHmmss
        const ultimos8 = fechaFormateada.slice(-8);

        const apellido = cita.Paciente.apellidoP ? cita.Paciente.apellidoP.substring(0, 4).toUpperCase() : "XXXX"; // Primeros 4 caracteres del apellido o "XXXX" si no existe
        const nombre = cita.Paciente.nombre ? cita.Paciente.nombre.substring(0, 3).toUpperCase() : "XXX"; // Primeros 3 caracteres del nombre o "XXX" si no existe
        const nombreOrden = `${apellido}${nombre}${ultimos8}`;

        console.log("Nombre de la orden:", nombreOrden);

        // Crear el objeto de la orden
        const orden = {
            pacienteNombre: cita.Paciente.nombre,
            pacienteApellidoP: cita.Paciente.apellidoP,
            pacienteApellidoM: cita.Paciente.apellidoM,
            pacienteId: cita.Paciente.id,
            fecha: fechaActual,
            subtotal,
            total,
            nombreOrden,
            MetodoPagoId:metodoPago.id,
            CitaId: cita.id
        };

        const ordenGrabada = await Orden.create(orden);

        // Asociar procedimientos a la orden
        for (const p of procedimientosOrden) {
            await Procedimiento_Orden.create({
                OrdenId: ordenGrabada.id,
                ProcedimientoId: p.id
            });
        }

        return res.status(200).json({
            message: "Orden creada exitosamente",
            data: ordenGrabada
        });
    } catch (error) {
        console.error("Error en crearOrden:", error);
        next(error);
    }
};





module.exports = {
    crearOrden
    
}