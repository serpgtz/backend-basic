

const dayjs = require('dayjs')
const Boom = require("@hapi/boom");
const Orden = require("../model/orden")
const sequelize = require("../config/sequelizer");




const crearOrden = async (req, res = response, next) => {
    try {
        let usuario = req.usuario;
        const { DireccionEnvioId, productos } = req.body;

        let direccionEnvio = await Direccion_Envio.findByPk(DireccionEnvioId);
        console.log(direccionEnvio)
        if (!direccionEnvio) {
            throw Boom.notFound("Dirección no encontrada");
        }

        // Crear un array de promesas para obtener los productos
        let productos_promesas = productos.map(async (p) => {
            let producto = await Producto.findByPk(p.id);
            if (!producto) {
                throw Boom.notFound(`Producto con id ${p.id} no encontrado`);
            }
            let codigo = await Descuento.findAll({
                where:{codigo:p.codigo},
                include:[
                    {model:Producto,
                        where:{id:p.id}
                    }
                ]
            })

           

            console.log("purocodigo",codigo)
            return {
                producto,
                cantidad: p.cantidad ? p.cantidad : 0,
                cantidadDescuento: codigo.length ? codigo[0].cantidad : ""
            };
        });

        console.log(productos_promesas,"productos_promesas")

        // Esperar a que todas las promesas se resuelvan
        let total = 0;
        let subtotal = 0;
        let descuento = 0;

        let productos_resueltos = await Promise.all(productos_promesas);

        console.log(productos_resueltos);

        productos_resueltos.forEach(element => {
            const precioProducto = element.producto.precio
            subtotal += precioProducto * element.cantidad; 
            descuento += element.cantidadDescuento/100 * (precioProducto * element.cantidad);




        });
        

        total = subtotal - descuento;


        const nuevaOrden = {
            subtotal,
            descuento,
            total,
            usuarioId:usuario.id,
            usuarioNombre:usuario.nombre,
            usuarioCorreo:usuario.correo,
            direccionEnvio:`${direccionEnvio.calle} ${direccionEnvio.numero} ${direccionEnvio.colonia} ${direccionEnvio.pais}`,
            DireccionEnvioId
            



        }

       
        console.log("nuevaOrden", nuevaOrden)

        

        let ordenCreada = await Orden.create(nuevaOrden)

        
        let ahora = dayjs()
        let fechaHoy = ahora.format('YYYY-MM-DD HH:mm:ss'); 

        let evento = {
            estado:ordenCreada.estado,
            fecha:fechaHoy,
            descripcion:"Order created successfully",
            OrdenId:ordenCreada.id
        }

        await Evento_Orden.create(evento)



        

        return res.status(200).json({ msg: "Order created successfully!",  ordenCreada });
    } catch (error) {
        console.log(error);
        next(error);
    }
};