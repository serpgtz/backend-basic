require("dotenv").config()
db = require("./db/config")

const Server = require("./models/server")




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
        await db.sync({alter:false,logging: console.log})
      } catch (error) {
        console.error('A ocurrido un Error Durante la Ejecucion', error);
      }
    })();


const server = new Server();


server.listen()

module.exports = db;












