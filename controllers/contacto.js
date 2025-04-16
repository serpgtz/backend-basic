const { response } = require("express")



const contacto = async (req, res = response, next) => {
    try {
        
        const {
            correo,
            asunto,
            mensaje
        } = req.body

        const contacto = {
            correo,
            asunto,
            mensaje
        }


        return res.status(200).json({msg:"mensaje enviado con exito",contacto})

    } catch (error) {
        
    }
}


module.exports = {
    contacto
    
}
