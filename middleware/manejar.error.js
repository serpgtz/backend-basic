

function errorLogs (err, req, res, next){
    console.log("errorlogs222")
    console.error(err)
    next(err)
}
function handleError(err, req, res, next) {
    console.error("error222", err);

    // Agregar registros de depuración para verificar si err es un objeto Boom
    console.log("Es un objeto Boom:", err.isBoom);
    console.log("Código de estado del error:", err.output ? err.output.statusCode : "No definido");

    // Si el error es de tipo Boom y tiene un código de estado definido
    if (err.isBoom && err.output && err.output.statusCode) {
        console.log("Entró en el bloque de manejo de Boom");
        return res.status(err.output.statusCode).json({ message: err.message });
    }

    // Si el error no es de tipo Boom, o no tiene un código de estado definido
    console.log("No entró en el bloque de manejo de Boom");
    return res.status(500).json({ message: 'Error interno del servidor' });
}




// function handleError(err, req, res, next) {
//     console.error("error",err);

//     // Si el error es de tipo Boom y tiene un código de estado definido
//     if (err.isBoom && err.output.statusCode) {
//         return res.status(err.output.statusCode).json({ message: err.message });
//     }

//     // Si el error no es de tipo Boom, o no tiene un código de estado definido
//     return res.status(500).json({ message: 'Error interno del servidor' });
// }



module.exports = {
    errorLogs,
    handleError
}