const express = require('express');
const cors = require("cors");

require("dotenv").config();


class Server {


    constructor(){
        
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.path = {
            paciente:"/api/pacientes",
            cita: "/api/cita",
            dentista:"/api/dentista",
            procedimiento:"/api/procedimiento",
            orden:"/api/orden",
            Metodo_pago:"/api/metodo-pago",
            contacto:"/api/contacto"
        }

        


        //Middlewares

        this.middlewares();
        //RUtas de mi aplicacion
        this.routes();


        
    }

    middlewares(){
      
        this.app.use(cors())
        this.app.use(express.static("public"))
        this.app.use(express.json())
       
    }

    routes(){
       this.app.use(this.path.paciente, require("../routes/paciente"));
       this.app.use(this.path.cita, require("../routes/cita"));
       this.app.use(this.path.dentista, require("../routes/dentista"));
       this.app.use(this.path.procedimiento, require("../routes/procedimiento"));
       this.app.use(this.path.orden, require("../routes/orden"));
       this.app.use(this.path.Metodo_pago, require("../routes/metodo-pago"));
       this.app.use(this.path.contacto, require("../routes/contacto"));
              
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto: ${this.port}`)
          })
    }




}


module.exports = Server;