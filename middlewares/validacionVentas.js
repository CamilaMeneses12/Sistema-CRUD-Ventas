// Valida que el cuerpo de la solicitud tenga productos válidos antes de registrar una venta
export const validarVenta = (req, res, next) => {
    const { productos } = req.body;
    // Verificar que productos exista, sea un array y no esté vacío
    if (!productos || !Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ error: "Debes enviar un array de productos" });
    }
    // Recorrer cada producto del array
    for (const item of productos) {
        // Verificar que cada item tenga idProducto y cantidad
        if (!item.idProducto || !item.cantidad) {
            return res.status(400).json({ error: "Cada producto debe tener idProducto y cantidad" });
        }
        // Verificar que idProducto y cantidad sean valores numéricos
        if (isNaN(Number(item.idProducto)) || isNaN(Number(item.cantidad))) {
            return res.status(400).json({ error: "idProducto y cantidad deben ser valores numéricos" });
        }
    }
    // Todo válido, continuar al controlador
    next();
}
// Valida que el id de la venta recibido por parámetro sea numérico
export const validarIdVenta = (req, res, next) => {
    let id = req.params.id;
    // Convertir el id a número
    let idNum = Number(id);
    // Si no es un número válido, rechazar la solicitud
    if (isNaN(idNum)) {
        return res.status(400).json({
            error: "El id no es un valor numerico"
        });
    }
    // Id válido, continuar al controlador
    next();
}