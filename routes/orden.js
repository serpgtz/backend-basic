const { Router, response } = require("express")
// const {validatorHendler} = require("../middleware/validator.handler")
// const {  schemaCitaCreate, validarIdCitaSchema, schemaCitaActualizacion } = require("../schema/schemaCita.js")
// const { validarIdPacienteSchema } = require("../schema/schemaPaciente.js")

const { handleError } = require("../middleware/manejar.error.js")
const { check } = require("express-validator");
// const { esRoleValido, existeEmail,existeUsuarioPorId,  } = require("../helper/db-validator.js")

const { crearOrden } = require("../controllers/orden.js")


const router = Router();

// router.get('/',
// [ 
//   obtenerCitas,
//   handleError
// ]) 

router.post("/",[
//   validatorHendler(schemaCitaCreate,"body"),
//   validatorHendler(validarIdPacienteSchema,"params"),
//   check("correo").custom(existeEmail),
  crearOrden,
//   handleError
])

// router.get('/:citaId',[
//   validatorHendler(validarIdCitaSchema,"params"),
//   obtenerCitaPorId,
//   handleError
// ]) 

// // router.get("/descuentoProducto",[
// //   descuentosPorCodigo,
// //   handleError

 
 
// // ])


// // router.post("/",
// // [ validarJWT,
// // validatorHendler(creardescuentoSchema,"body"),
// // crearDescuento,
// // handleError
// // ])


// router.put("/cancelar/:citaId",[
// // validarJWT,
// validatorHendler(validarIdCitaSchema,"params"),
// cancelarCita,
// handleError
// ])
  


// router.put('/:citaId',[
// validatorHendler(validarIdCitaSchema,"params"),
// validatorHendler(schemaCitaActualizacion,"body"),
// actualizarCita,
// handleError

// ]) 

// // router.put('/eliminar/:idDescuento',[
// // validarJWT,
// // validatorHendler(validarIdDescuentoSchema,"params"),
// // eliminarDescuento,
// // handleError
// // ])

// // router.delete("/:idDescuento",[
// // validarJWT,
// // validatorHendler(validarIdDescuentoSchema,"params"),
// // validatorHendler(desvincularDescuentoSchema,"body"),
// // desvincularDescuento,
// // handleError


// // ])

    
  



  module.exports = router;