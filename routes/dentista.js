const { Router, response } = require("express")
const {validatorHendler} = require("../middleware/validator.handler")
const { schemaCrearDentista,  } = require("../schema/schemaDentista.js")
const { handleError } = require("../middleware/manejar.error.js")
const { check } = require("express-validator");
const { esRoleValido, existeEmail,existeUsuarioPorId,  } = require("../helper/db-validator.js")

const { createDentista } = require("../controllers/dentista.js")


const router = Router();

// router.get('/',
// [ obtenerPacientes,
//   handleError
// ]) 

router.post("/",[
  validatorHendler(schemaCrearDentista,"body"),
  check("correo").custom(existeEmail),
  createDentista,
  handleError
])

// router.get('/:pacienteId',[
//   validatorHendler(validarIdPacienteSchema,"params"),
//   obtenerPacientesPorId,
//   handleError
// ]) 

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