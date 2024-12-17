const Metodo_pago = require("../model/metodo_pago");





const crearMetodoPago = async (req, res = response, next) => {


    try {
        const { tipo } = req.body


        const metodo = await Metodo_pago.create({tipo});
      console.log(metodo)

        
 
     


 
     return res.status(200).json({msg:"Metodo creado con exito!!",metodo})
  
    } catch (error) {
        console.log(error)
        next(error)
    }
  
   
}


module.exports = {
    crearMetodoPago
}