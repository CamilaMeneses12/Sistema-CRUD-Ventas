export const validarProducto =(req,res,next)=>{
    const{id,nombre,precio,cantidad}=req.body;
    // ! => “si no existe”
    if( !id || !nombre || !precio || !cantidad){
        return res.status(400).json({
            error : "datos incompletos"
        });
    }
    let idnum =Number(id);
    let precionum =Number(precio);
    let cantidadnum = Number(cantidad);
    if (isNaN(idnum) || isNaN(precionum)|| isNaN(cantidadnum)){
        return res.status(400).json({
            error :"Id, precio y cantidad deben ser valores numericos"
        });
    }
    next();
}
export const validarId = (req,res,next) =>{
    let id = req.params.id;
    let idNum = Number(id);
    if(isNaN(idNum)){
        return res.status(400).json({
            error : "El id no es un valor numerico"
        });
    }
    next();
}