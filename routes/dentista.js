const { Router, response } = require("express")
const {validatorHendler} = require("../middleware/validator.handler")
const { schemaCrearDentista,  validarIdDentistaSchema} = require("../schema/schemaDentista.js")
const { handleError } = require("../middleware/manejar.error.js")
const { check } = require("express-validator");
const { esRoleValido, existeEmail,existeUsuarioPorId,  } = require("../helper/db-validator.js")

const { createDentista, obtenerDentista, obtenerDentistaPorId, eliminarDentistaPorId } = require("../controllers/dentista.js")


const router = Router();

router.get('/',
[ obtenerDentista,
  handleError
]) 

router.post("/",[
  validatorHendler(schemaCrearDentista,"body"),
  check("correo").custom(existeEmail),
  createDentista,
  handleError
])

router.get('/:dentistaId',[
  validatorHendler(validarIdDentistaSchema,"params"),
  obtenerDentistaPorId,
  handleError
]) 

// router.get("/descuentoProducto",[
//   descuentosPorCodigo,
//   handleError

 
 
// ])


// router.post("/",
// [ validarJWT,
// validatorHendler(creardescuentoSchema,"body"),
// crearDescuento,
// handleError
// ])


// router.put("/vincular",[
// validarJWT,
// validatorHendler(VincularDescuentoSchema,"body"),
// VincularDescuento,
// handleError
// ])
  


router.put('/eliminar/:dentistaId',[

validatorHendler(validarIdDentistaSchema,"params"),
eliminarDentistaPorId,
handleError

]) 

// router.put('/eliminar/:idDescuento',[
// validarJWT,
// validatorHendler(validarIdDescuentoSchema,"params"),
// eliminarDescuento,
// handleError
// ])

// router.delete("/:idDescuento",[
// validarJWT,
// validatorHendler(validarIdDescuentoSchema,"params"),
// validatorHendler(desvincularDescuentoSchema,"body"),
// desvincularDescuento,
// handleError


// ])

    
  



  module.exports = router;