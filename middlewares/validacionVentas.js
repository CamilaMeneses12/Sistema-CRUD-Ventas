export const validarVenta = (req, res, next) => {
    const { productos } = req.body;

    if (!productos || !Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ error: "Debes enviar un array de productos" });
    }

    for (const item of productos) {
        if (!item.idProducto || !item.cantidad) {
            return res.status(400).json({ error: "Cada producto debe tener idProducto y cantidad" });
        }
        if (isNaN(Number(item.idProducto)) || isNaN(Number(item.cantidad))) {
            return res.status(400).json({ error: "idProducto y cantidad deben ser valores numéricos" });
        }
    }

    next();
}

export const validarIdVenta = (req, res, next) => {
    let id = req.params.id;
    let idNum = Number(id);
    if (isNaN(idNum)) {
        return res.status(400).json({
            error: "El id no es un valor numerico"
        });
    }
    next();
}