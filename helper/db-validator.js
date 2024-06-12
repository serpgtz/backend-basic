const Paciente = require("../model/paciente")
const Boom = require('@hapi/boom');
// const Rol = require("../model/rol");
// const Organizacion = require("../model/organizacion");


const esRoleValido = async(RolId) => {

 
        const existeRol = await Rol.findOne({where:{id:RolId}});
        console.log("existeRol",existeRol)
        console.log(RolId)
        if( !existeRol) {
            throw new Error(`El rol ${RolId} no existe`)
        }
   

    


}

const existeEmail = async (correo) => {
    try {
        const paciente = await Paciente.findOne({ where: { correo } });
        console.log("existeEmail", paciente);

        if(existeEmail){
            throw Boom.notFound("Paciente no Encontrado")
        } 
    } catch (error) {
        console.log(error);
        throw error;
    }
};


const existeUsuarioPorId = async(id)=> {

    try {
        const existeUsuario = await User.findByPk(id);

        //validar si ya esta regisrtado el usuario
        if(!existeUsuario){
            throw new Error(`El Usuario con Id: ${id} no Existe `)
        }
    } catch (error) {
        console.log(error)  
    }
   
}
  // valida si existe esa orgarnizacion por id

  const coleccionesPermitidas = (coleccion= "", colecciones = []) => {


    
    const incluida = colecciones.includes(coleccion);

    if(!incluida) {
        throw new Error(`La coleccion ${coleccion} no esta permitida las permitidas son ${colecciones}`)
    }
    return true
  }

 




module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId,
    coleccionesPermitidas
    
}