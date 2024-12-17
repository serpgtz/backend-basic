const { Router, response } = require("express")
const {validatorHendler} = require("../middleware/validator.handler")
const { schemaCreartipo } = require("../schema/schemaMetodoPago.js")
const { handleError } = require("../middleware/manejar.error.js")
// const { check } = require("express-validator");
// const { esRoleValido, existeEmail,existeUsuarioPorId,  } = require("../helper/db-validator.js")

const { crearMetodoPago } = require("../controllers/metodo-pago.js")


const router = Router();


router.post("/",[
  validatorHendler(schemaCreartipo,"body"),
  crearMetodoPago,
  handleError
])



    
  



  module.exports = router;