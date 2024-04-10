const express = require('express');
const cors = require("cors");
require("dotenv").config();


class Server {


    constructor(){
        
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.usersPath = "/api/users"


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
       this.app.use(this.usersPath, require("../routes/user"));
              
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto: ${this.port}`)
          })
    }




}


module.exports = Server;