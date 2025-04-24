const { PASS_CORREO, USER_CORREO, PORT_CORREO, HOST_CORREO} = process.env


const nodemailer = require('nodemailer');

const emailTransporter = nodemailer.createTransport({
  host: HOST_CORREO,
  port: PORT_CORREO,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: USER_CORREO,
    pass: PASS_CORREO,
  },
});

const mandarEmail = async (email, subject, html,attachments) => {
  try {
    let info = await emailTransporter.sendMail({
      from: `"Dental Diaz Conacto" <${USER_CORREO}>`,

      to: "gct.sergio.partida@gmail.com",
      subject: subject,
      text: ' Store.Gc-track.com',
      dsn: {
        id: 'some random message specific id',
        return: 'headers',
        notify: 'success',
        recipient: `${USER_CORREO}`
      },
      html: html,
      attachments: attachments // Agrega el array de archivos adjuntos aquí
    });
    console.log("Message sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = {
  mandarEmail
}
