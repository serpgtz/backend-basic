require("dotenv").config()
db = require("./db/config")

const associations = require('./model/asociaciones');

const Server = require("./model/server")

const Paciente = require("./model/paciente")
const Dentista = require("./model/dentista")
const Cita = require("./model/cita")
const Historial_clinico = require("./model/historial_clinico")
const Metodo_pago = require("./model/metodo_pago")
const Receta = require("./model/receta")
const Transaccion = require("./model/transaccion")
const Factura = require("./model/factura")
const Orden = require("./model/orden")
const Procedimiento = require("./model/procedimientos")
const Procedimiento_Orden = require("./model/procedimiento_orden.js")






let date = new Date().toDateString()



const connectionDB = async() => {

    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
   
  
  }
  
  
    (async () => {
      try {
        await connectionDB();
        // await db.models.Procedimiento_Orden.sync({alter:true,logging: console.log})

        console.log(db,"db")
     
      } catch (error) {
        console.error('A ocurrido un Error Durante la Ejecucion', error);
      }
    })();


const server = new Server();


server.listen()

module.exports = db;












