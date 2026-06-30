import { productos } from "../data/productos.data.js";
import { ventas } from "../data/ventas.data.js";
import { usuarios } from "../data/usuarios.data.js";

const LIMITE_STOCK_BAJO = 5; // Aviso cuando queden 5 o menos unidades

export const crearVenta = (req, res) => {
    const { productos: productosBody } = req.body; // array de productos del body
    const usuarioToken = req.usuario; // usuario del token

    // Verificar que el usuario esté registrado
    const usuarioRegistrado = usuarios.find(u => u.id === usuarioToken.id);
    if (!usuarioRegistrado) {
        return res.status(401).json({ error: "El usuario no está registrado en el sistema" });
    }

    // Validar stock de todos los productos antes de registrar
    for (const item of productosBody) {
        const producto = productos.find(p => p.id === Number(item.idProducto));
        if (!producto) return res.status(400).json({ error: `No existe el producto con id ${item.idProducto}` });
        if (producto.cantidad === 0) return res.status(400).json({ error: `"${producto.nombre}" está agotado` });
        if (producto.cantidad < Number(item.cantidad)) return res.status(400).json({ error: `Stock insuficiente para "${producto.nombre}"` });
    }

    const detalles = []; // detalle de cada producto vendido
    let totalGeneral = 0; // total acumulado de la venta

    // Registrar cada producto y calcular subtotales
    for (const item of productosBody) {
        const producto = productos.find(p => p.id === Number(item.idProducto));
        const subtotal = producto.precio * Number(item.cantidad); // precio x cantidad
        producto.cantidad -= Number(item.cantidad); // descontar stock
        totalGeneral += subtotal; // sumar al total

        detalles.push({
            idProducto: producto.id,
            nombreProducto: producto.nombre,
            cantidad: Number(item.cantidad),
            precioUnitario: producto.precio,
            subtotal
        });
    }

    // Armar y guardar la venta
    const nuevaVenta = {
        id: ventas.length + 1,
        productos: detalles,
        totalGeneral,
        registradoPor: usuarioToken.usuario
    };
    ventas.push(nuevaVenta);

    // Advertencia si algún producto quedó con stock bajo
    const advertencias = [];
    for (const item of detalles) {
        const producto = productos.find(p => p.id === item.idProducto);
        if (producto.cantidad === 0) {
            advertencias.push(`⚠️ "${producto.nombre}" se ha agotado`);
        } else if (producto.cantidad <= 5) {
            advertencias.push(`⚠️ "${producto.nombre}" tiene solo ${producto.cantidad} unidades restantes`);
        }
    }

    res.status(201).json({ 
        mensaje: "Venta registrada exitosamente", 
        nuevaVenta,
        advertencias: advertencias.length > 0 ? advertencias : undefined
    });
};
export const mostrarVentas = (req, res) => {
    if (ventas.length === 0) {
        return res.status(200).json({
            mensaje: "No hay ventas registradas"
        });
    }
    res.status(200).json({
        ventas_registradas: ventas
    });
};

export const mostrarVentaId = (req, res) => {
    let id = req.params.id;
    const existe = ventas.find(p => p.id === Number(id));
    if (!existe) {
        return res.status(404).json({
            mensaje: "Venta no encontrada"
        });
    }
    res.status(200).json({
        "Venta encontrada": existe
    });
};

export const eliminarVenta = (req, res) => {
    let id = req.params.id;
    const index = ventas.findIndex(v => v.id === Number(id));
    if (index === -1) {
        return res.status(404).json({
            error: "No existe una venta registrada con ese id"
        });
    }
    const ventaEliminar = ventas[index];

    // Devolver el stock de cada producto que estaba en la venta
    for (const item of ventaEliminar.productos) {
        const producto = productos.find(p => p.id === item.idProducto);
        if (producto) {
            producto.cantidad += item.cantidad;
        }
    }

    ventas.splice(index, 1);
    res.status(200).json({
        exito: "Venta eliminada correctamente",
        ventaEliminar
    });
};