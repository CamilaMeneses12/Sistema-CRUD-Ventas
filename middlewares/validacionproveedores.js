export const validarproveedores=(req,res,next)=>{
    const{id,nombre,telefono,ubicacion,servicio}=req.body;
    if(!id || !nombre || !telefono || !ubicacion || !servicio){
        return res.status(400).json({
            Error : "Datos incompletos"
        });
    }
    let idnum= Number(id);
    if(isNaN(idnum)){
        return res.status(400).json({
            Error : "El id debe ser numerico"
        });
    }//“Si NO es string y tampoco number → error”.
    if(typeof telefono !== "string" && typeof telefono !== "number"){
        return res.status(400).json({
            Error : "El telefono debe ser texto o numero"
        });
    }
    next();
}
export const validarid=(req,res,next)=>{
    //Guarda el id de la URL
    let id =req.params.id;
    let idNum = Number(id);
    if(isNaN(idNum)){
        return res.status(400).json({
            Error : "El id no es un valor numerico"
        });
    }
    next();
}