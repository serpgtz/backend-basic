const { Router, response } = require("express")
const {validatorHendler} = require("../middleware/validator.handler")
const { schemaPacienteCreate, validarIdPacienteSchema, schemaPacienteActualizacion } = require("../schema/schemaPaciente.js")
const { handleError } = require("../middleware/manejar.error.js")
const { check } = require("express-validator");
const { esRoleValido, existeEmail,existeUsuarioPorId,  } = require("../helper/db-validator.js")

const { obtenerPacientes, createPaciente, obtenerPacientesPorId, eliminarPacientesPorId, actualizarPaciente } = require("../controllers/paciente")


const router = Router();

router.get('/',
[ obtenerPacientes,
  handleError
]) 

router.post("/",[
  validatorHendler(schemaPacienteCreate,"body"),
  check("correo").custom(existeEmail),
  createPaciente,
  handleError
])

router.get('/:pacienteId',[
  validatorHendler(validarIdPacienteSchema,"params"),
  obtenerPacientesPorId,
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


router.put("/actualizar/:pacienteId",[
validatorHendler(validarIdPacienteSchema,"params"),
validatorHendler(schemaPacienteActualizacion,"body"),
actualizarPaciente,
handleError
])
  


router.put('/:pacienteId',[

validatorHendler(validarIdPacienteSchema,"params"),
eliminarPacientesPorId,
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