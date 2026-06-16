import { productos } from "../data/productos.data.js";
import { ventas } from "../data/ventas.data.js";
import { usuarios } from "../data/usuarios.data.js";

export const crearVenta = (req, res) => {
    const { idProducto, cantidad } = req.body;

    // Validar que el usuario del token esté registrado
    const usuarioToken = req.usuario; // viene del middleware validarToken
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
    if (producto.cantidad < Number(cantidad)) {
        return res.status(400).json({
            error: "No hay suficiente cantidad del producto en inventario",
            cantidad_disponible: producto.cantidad
        });
    }

    const id = ventas.length + 1;
    const total = producto.precio * Number(cantidad);
    producto.cantidad -= Number(cantidad);

    const nuevaVenta = {
        id,
        idProducto: Number(idProducto),
        nombreProducto: producto.nombre,
        cantidad: Number(cantidad),
        total,
        registradoPor: usuarioToken.usuario // guardamos quién hizo la venta
    };
    ventas.push(nuevaVenta);
    res.status(201).json({
        mensaje: "Venta registrada exitosamente",
        nuevaVenta
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

    const producto = productos.find(p => p.id === ventaEliminar.idProducto);
    if (producto) {
        producto.cantidad += ventaEliminar.cantidad;
    }

    ventas.splice(index, 1);
    res.status(200).json({
        exito: "Venta eliminada correctamente",
        ventaEliminar
    });
};
