import { productos } from "../data/productos.data.js";
import { ventas } from "../data/ventas.data.js";
import { usuarios } from "../data/usuarios.data.js";

const LIMITE_STOCK_BAJO = 5; // Aviso cuando queden 5 o menos unidades

export const crearVenta = (req, res) => {
    const { idProducto, cantidad } = req.body;

    // Validar que el usuario del token esté registrado
    const usuarioToken = req.usuario;
    const usuarioRegistrado = usuarios.find(u => u.id === usuarioToken.id);
    if (!usuarioRegistrado) {
        return res.status(401).json({
            error: "El usuario no está registrado en el sistema"
        });
    }

    const producto = productos.find(p => p.id === Number(idProducto));
    if (!producto) {
        return res.status(400).json({
            error: "No existe un producto registrado con ese idproducto"
        });
    }

    // Sin stock disponible
    if (producto.cantidad === 0) {
        return res.status(400).json({
            error: `El producto "${producto.nombre}" está agotado. No hay unidades disponibles.`
        });
    }

    // Stock insuficiente para la cantidad pedida
    if (producto.cantidad < Number(cantidad)) {
        return res.status(400).json({
            error: `Stock insuficiente para "${producto.nombre}".`,
            cantidad_solicitada: Number(cantidad),
            cantidad_disponible: producto.cantidad
        });
    }

    // Registrar la venta
    const id = ventas.length + 1;
    const total = producto.precio * Number(cantidad);
    producto.cantidad -= Number(cantidad);

    const nuevaVenta = {
        id,
        idProducto: Number(idProducto),
        nombreProducto: producto.nombre,
        cantidad: Number(cantidad),
        total,
        registradoPor: usuarioToken.usuario
    };
    ventas.push(nuevaVenta);

    // Armar respuesta base
    const respuesta = {
        mensaje: "Venta registrada exitosamente",
        nuevaVenta,
        stock_restante: producto.cantidad
    };

    // Advertencia si el stock quedó en el límite o por debajo
    if (producto.cantidad === 0) {
        respuesta.advertencia = `⚠️ El producto "${producto.nombre}" se ha agotado. Ya no hay unidades disponibles.`;
    } else if (producto.cantidad <= LIMITE_STOCK_BAJO) {
        respuesta.advertencia = `⚠️ Stock bajo: solo quedan ${producto.cantidad} unidades de "${producto.nombre}". Se recomienda reabastecer.`;
    }

    res.status(201).json(respuesta);
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

    // Devolver el stock al eliminar una venta
    const producto = productos.find(p => p.id === ventaEliminar.idProducto);
    if (producto) {
        producto.cantidad += ventaEliminar.cantidad;
    }

    ventas.splice(index, 1);
    res.status(200).json({
        exito: "Venta eliminada correctamente",
        ventaEliminar,
        stock_restaurado: producto ? producto.cantidad : null
    });
};