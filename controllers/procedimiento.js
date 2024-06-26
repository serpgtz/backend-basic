
const { response } = require("express")
const Procedimiento = require("../model/procedimientos")
// const dayjs = require('dayjs')
const Boom = require("@hapi/boom");
const { Op } = require('sequelize');


//ya quedo Bitacora todo el crud



const obtenerProductos = async (req, res = response,next) => {

    try {

    const { limite, desde ,activo,busqueda } = req.query

    let inicio = ((desde*limite)-(limite-1))-1
        let fin = limite

        let filtro= {}

        if(busqueda){
            filtro.nombre = `%${busqueda}%`
        }

        if (activo !== undefined) {
            filtro.activo = JSON.parse(activo); // Convertir a booleano
        }


    const activoFilter = filtro.activo !== undefined ? { activo: filtro.activo } : {};
    const nombreFilter = filtro.nombre ? { nombre: { [Op.like]: filtro.nombre } } : {};


    
        
    const {count,rows} = await Producto.findAndCountAll({

        // include:[
                        
        //     // {
        //     //     model:Categoria,
               
        //     // }
        //     // {
        //     //     model:Imagen,
              
            
        //     // }
            
          
        // ],
        where:{
            [Op.and]:[
                nombreFilter,
                activoFilter,
                {alta:true}
            ]
        },
        attributes: {
            exclude: ['alta', 'createdAt', 'updatedAt']
        }
            // distinct: true,
            // offset:Number(inicio),
            // limit: Number(fin), 
    })

    let page = Number(desde);
        let item_per_page =Number(limite);
        let from =(page*item_per_page)-(item_per_page-1)
        let last_page = Math.ceil(count/item_per_page)
        let to= page===last_page?count:page*(item_per_page)
        let first_page_url = "\/?page=1"
        let previous_page_url = page===1?null:"\/?page="+(page-1)
        let next_page_url = page===last_page?null:"\/?page="+(page+1)
        let links=[];


        function añadirEnlace (url,label,active,page){
            links.push({url,label,active,page})


        }

        añadirEnlace(previous_page_url,"&laquo; Anterior",false,Number(page)===1?null:Number(page)-1)
        for (let i = 1; i <= last_page; i++) {
            let url = "\/?page="+i
            let label = i.toString();
            let active = i===page?true:false;
            let pag = i
            añadirEnlace(url,label,active,pag)
            
        }

        añadirEnlace(next_page_url,"siguiente &raquo;",false,Number(page)===last_page?null:Number(page)+1)






        return res.status(200).json({ 
            data:rows,
            payload:{
                pagination:{
                    total:count,
                    page,
                    item_per_page,
                    from,
                    last_page,
                    to,
                    first_page_url,
                    previous_page_url,
                    next_page_url,
                    links,
                        }
            }
         });
        
    } catch (error) {
        console.log(error)
        next(error)
    }
    

}

const crearProcedimiento = async(req, res = response,next) => {

    try {
        const { nombre, precio, descripcion,activo } =req.body

        
        // let usuario = req.usuario


        const nuevoProcedimiento = {
            nombre,
            precio,
            descripcion: descripcion ? descripcion : null,
            activo
        }
        
        
        const crearProcedimiento = await Procedimiento.create(nuevoProcedimiento)

    

      

        // crearBitacora("crear", `${usuario.nombre} ${usuario.apellidoP} ha Creado el Producto ${producto_creado.nombre}  `, "Producto", usuario)
    
        return res.status(200).json({msg:"Procedimiento creado con Exito!!",crearProcedimiento})
        
    } catch (error) {
        console.log(error)
        next(error)
    }

   
}

const actualizarProducto = async(req, res = response,next) => {

    try {
        const { idProducto } =req.params

        let usuario = req.usuario

        const { nombre, precio, activo, existencia, descripcion, sku, hoja_de_datos  } = req.body


        const producto = await Producto.findByPk(idProducto)

        
        if(!producto){
            throw Boom.notFound("Producto no Encontrado")
        }
        

        const producto_actualizado = {
            nombre,
            precio,
            existencia,
            descripcion,
            sku,
            hoja_de_datos,
            activo
        }


        producto.set(producto_actualizado)
        await producto.save()

        await crearBitacora("actualizar", `${usuario.nombre} ${usuario.apellidoP} ha actualizado producto ${producto.nombre}`, "Producto", usuario)
    
    
        
    
        return res.status(202).json(producto) 
        } catch (error) {
            console.log(error)
            next(error)
        }
   
   
}


const obtenerProductosPorId = async (req, res = response,next) => {

    try {

    const { idProducto} = req.params
        
    const producto = await Producto.findByPk(idProducto,{
        // include:[
                        
        //     // {
        //     //     model:Categoria,
        //     //     // attributes:["nombre","id","tag"]
        //     // }
        //     // {
        //     //     model:Imagen,
        //     //     // attributes:["nombre","id","tag"]
            
        //     // }
            
          
        // ],
        attributes: {
            exclude: ['alta', 'createdAt', 'updatedAt']
        }
    })



    return res.status(200).json({data:producto})
        
    } catch (error) {
        console.log(error)
        next(error)
    }
    

}

const eliminarProductosPorId = async (req, res = response,next) => {

    try {

    let usuario = req.usuario

    const { idProducto } = req.params
        
    const producto = await Producto.findByPk(idProducto)

    if(!producto){
        throw Boom.notFound("Producto no Encontrado")
    }

    producto.update({activo:false})

    await crearBitacora("borrar", `${usuario.nombre} ${usuario.apellidoP} ha borrado producto con  Nombre ${producto.nombre}`, "Producto", usuario)

    return res.status(200).json({data:producto})
        
    } catch (error) {
        console.log(error)
        next(error)
    }
    

}

const desvincularProductoDeCategoria = async(req, res = response,next) => {

    try {
       


        let usuario = req.usuario
        const { idProducto } =req.params
        const { idCategoria } = req.body

        const producto = await Producto.findByPk(idProducto)

        if(!producto){
            throw Boom.notFound("Producto no Encontrado")
        }
        const categoria = await Categoria.findByPk(idCategoria)

        if(!categoria){
            throw Boom.notFound("Categoria no Encontrada")
        }



        const categoria_eliminar = await Categoria_Producto.destroy({
            where:{CategoriaId:idCategoria}
        })


    
        await crearBitacora("borrar", `${usuario.nombre} ${usuario.apellidoP} ha desviculado  la categoria ${categoria.nombre} de ${producto.nombre}`, "Producto", usuario)
    
    
     
        return res.status(202).json({msg:"categoria desvinculada exitosamente!!"}) 
        } catch (error) {
            console.log(error)
            next(error)
        }
   
   
}

const vincularProductoDeCategoria = async(req, res = response,next) => {

    try {
       


        let usuario = req.usuario

        const { idProducto } =req.params
        const { idCategoria } = req.body

        const producto = await Producto.findByPk(idProducto)

        if(!producto){
            throw Boom.notFound("Producto no Encontrado")
        }
        const categoria = await Categoria.findByPk(idCategoria)

        if(!categoria){
            throw Boom.notFound("Categoria no Encontrada")
        }

        categoria ? producto.addCategoria(categoria) : null



        

    
        await crearBitacora("crear", `${usuario.nombre} ${usuario.apellidoP}a vinculado ${categoria.nombre} a ${producto.nombre}`, "Producto", usuario)
    
    
     
        return res.status(202).json({msg:"categoria Vinculada exitosamente!!"})

        } catch (error) {
            console.log(error)
            next(error)
        }
   
   
}




module.exports = {
    crearProcedimiento
}