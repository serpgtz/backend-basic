const { Router, response } = require("express")

const { getPacientes } = require("../controllers/paciente")


const router = Router();

router.get('/',getPacientes) 
    
  



  module.exports = router;