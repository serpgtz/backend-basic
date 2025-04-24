const { response } = require("express")
const { mandarEmail } = require("../helper/node-mailer")


const contacto = async (req, res = response, next) => {
    try {
      const {
        correo,
        asunto,
        mensaje,
        nombre,
        telefono
      } = req.body
  
      const contacto = {
        correo,
        asunto,
        mensaje,
        nombre,
        telefono
      }
  
      
      const htmlContent = `
        <h3>Nuevo mensaje de contacto</h3>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Correo:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${telefono}</p>
        <p><strong>Asunto:</strong> ${asunto}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `
  
      let envioCorreo = await mandarEmail(null, asunto, htmlContent)
  
      console.log(envioCorreo)
  
      return res.status(200).json({ msg: "mensaje enviado con exito", contacto, envioCorreo })
  
    } catch (error) {
      console.error(error)
      return res.status(500).json({ msg: "Hubo un error al enviar el mensaje" })
    }
  }


module.exports = {
    contacto
    
}
