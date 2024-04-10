require("dotenv").config()

const { Sequelize } = require("sequelize")


// DB_USER="root"
// DB_PASSWORD="Caucaso198$*"
// NAME_BD="DENTAL_SOFWARE"
// HOST_MYSQL="localhost"



  const {DB_USER,DB_PASSWORD,DATA_BASE,NAME_BD,PASS_SERV,PORTMYSQL_SERVER,NAME_SERVER,HOST_MYSQL} = process.env

console.log(NAME_BD)

  const db = new Sequelize( NAME_BD,DB_USER,DB_PASSWORD,  
    {
      
      host: HOST_MYSQL,
      dialect: "mysql",
      // timezone: '-07:00', // Ajusta la zona horaria a Los Ángeles (UTC-7:00)
      port:PORTMYSQL_SERVER,
      // timezone: 'America/Los_Angeles', // Configurar la zona horaria a Los Ángeles (Pacific Time)
      timezone: "America/Los_Angeles",
		  dialectOptions: {
			timezone: "local",
		}
      


      
      
    } );
  

 
  
















  



  module.exports = db;
    
  