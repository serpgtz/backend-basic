const { response } = require("express")
const { mandarEmail } = require("../helper/node-mailer")


const contacto = async (req, res = response, next) => {
    try {
      const {
        email,
        subject,
        message,
        name,
        phone
      } = req.body
  
      // const contacto = {
      //   correo,
      //   asunto,
      //   mensaje,
      //   nombre,
      //   telefono
      // }
  
      const currentDate = new Date().toLocaleString('es-MX', {
        dateStyle: 'long',
        timeStyle: 'short',
        timeZone: 'America/Mexico_City'
      });
      
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #007BFF; border-bottom: 1px solid #eee; padding-bottom: 10px;">📩 Nuevo mensaje de contacto</h2>
          
          <p><strong>📅 Fecha de envío:</strong> ${currentDate}</p>
          <p><strong>📧 Correo:</strong> ${email}</p>
          <p><strong>👤 Nombre:</strong> ${name}</p>
          <p><strong>📞 Teléfono:</strong> ${phone}</p>
          <p><strong>📝 Asunto:</strong> ${subject}</p>
          
          <div style="margin-top: 20px;">
            <p style="margin-bottom: 5px;"><strong>💬 Mensaje:</strong></p>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007BFF; border-radius: 4px;">
              <p style="margin: 0;">${message}</p>
            </div>
          </div>
        </div>
      `;
      
  
      let envioCorreo = await mandarEmail(null, subject, htmlContent)
  
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
