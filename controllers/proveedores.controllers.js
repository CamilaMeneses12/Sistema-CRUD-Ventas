let proveedores =[];
export const crearproveedores=(req,res)=>{
    const {id,nombre,telefono,ubicacion,servicio}=req.body;
    const proveedor= proveedores.find(p=> p.id==id); //sirve para buscar un elemento dentro de un arreglo según una condición.
    if (proveedor){
        return res.status(400).json({
            mensaje : "Ya existe un proveedor registrado con este ID"
        });
    }
    let nuevoproveedor ={id,nombre,telefono,ubicacion,servicio};
    proveedores.push(nuevoproveedor);// El .push agrega un elemento al final del array.
    res.status(201).json({
        mensaje : "Proveedor registrado correctamente"
    });

}
export const mostrarproveedores=(req, res)=>{
    if(proveedores.length==0){ //Si el array esta vacio
        return res.status(200).json({
            mensaje : "No hay proveedores registrados actualmente"
        })
    }
    res.status(200).json({
        "proveedores_Registrados": proveedores
    });

}
export const mostrarproveedoresid = (req,res)=>{
    let id = req.params.id;
    const existe = proveedores.find(p=>p.id==id) //Recorre el array y retorna el primer elemento que cumpla la condición
    if(!existe){
        return res.status(404).json({
            mensaje : "Proveedor no encontrado"
        });
    }
    res.status(200).json({
        "Proveedor encontrado": existe
    });
}
export const editarproveedores=(req,res)=>{
    let id = req.params.id; //Para obtener el id que viene en la URL
    const proveedor = proveedores.find(p=> p.id==id);
    if(!proveedor){
        return res.status(404).json({
            mensaje : "No se encontró un proveedor con este ID"
        });
    }
    const{nombre,telefono,ubicacion,servicio}=req.body;
    proveedor.nombre = nombre; // Para sobreescribir el valor anterior del proveedor encontrado con el nuevo dato que llegó en `req.body`.
    proveedor.telefono = telefono;
    proveedor.ubicacion = ubicacion;
    proveedor.servicio = servicio;
    res.status(200).json({
        exito : "Proveedor actualizado correctamente"
    });
}
export const eliminarproveedores =(req,res)=>{
    let id= req.params.id;
    const proveedoreliminar = proveedores.find(p=>p.id==id);
    if(!proveedoreliminar){
        return res.status(404).json({
            error : "No existe ningún proveedor registrado con este ID"
        });
    }
    proveedores=proveedores.filter(p=> p.id !== Number(id));
    res.status(200).json({
        exito : "Proveedor eliminado correctamente", //devuelve un nuevo array sin el proveedor cuyo id coincida, logrando así eliminarlo.
        proveedoreliminar
    })
}