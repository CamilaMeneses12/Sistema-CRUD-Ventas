export const validarVenta = (req,res,next)=>{
    const { idProducto,cantidad}=req.body;

    if(!idProducto|| !cantidad){
        return res.status(400).json({
            error : "Datos incompletos"
        });
    }
    let idprodnum = Number(idProducto);
    let cantidadnum = Number(cantidad);
    if(isNaN(idprodnum)||isNaN(cantidadnum)){
        return res.status(400).json({
            error : "idproducto y cantidad deben ser valores numericos"
        });
    }
    next();
}
export const validarIdVenta =(req,res,next)=>{
    let id= req.params.id;
    let idNum = Number(id);
    if(isNaN(idNum)){
        return res.status(400).json({
            error : "El id no es un valor numerico"
        });
    }
    next();
}