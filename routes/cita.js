const { Router, response } = require("express")
const {validatorHendler} = require("../middleware/validator.handler")
const {  schemaCitaCreate, validarIdCitaSchema, } = require("../schema/schemaCita.js")
const {  validarIdPacienteSchema } = require("../schema/schemaPaciente.js")
const { handleError } = require("../middleware/manejar.error.js")
const { check } = require("express-validator");
// const { esRoleValido, existeEmail,existeUsuarioPorId,  } = require("../helper/db-validator.js")

const { createCita, obtenerCitas, obtenerCitaPorId } = require("../controllers/cita.js")


const router = Router();

router.get('/',
[ 
  obtenerCitas,
  handleError
]) 

router.post("/:pacienteId",[
  validatorHendler(schemaCitaCreate,"body"),
  validatorHendler(validarIdPacienteSchema,"params"),
//   check("correo").custom(existeEmail),
  createCita,
  handleError
])

router.get('/:citaId',[
  validatorHendler(validarIdCitaSchema,"params"),
  obtenerCitaPorId,
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
  


// router.put('/:idPaciente',[

// validatorHendler(validarIdPacienteSchema,"params"),
// eliminarPacientesPorId,
// handleError

// ]) 

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