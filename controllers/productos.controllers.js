import { productos } from "../data/productos.data.js";
import { usuarios } from "../data/usuarios.data.js";

export const crearProducto = (req, res) => {
    // Validar que el usuario del token esté registrado
    const usuarioToken = req.usuario;
    const usuarioRegistrado = usuarios.find(u => u.id === usuarioToken.id);
    if (!usuarioRegistrado) {
        return res.status(401).json({
            error: "El usuario no está registrado en el sistema"
        });
    }

    const { id, nombre, precio, cantidad } = req.body;
    const producto = productos.find(p => p.id == id);
    if (producto) {
        return res.status(400).json({
            mensaje: "Ya existe un producto registrado con ese id"
        });
    }
    let nuevoProducto = { id: Number(id), nombre, precio: Number(precio), cantidad: Number(cantidad) };
    productos.push(nuevoProducto);
    res.status(201).json({
        mensaje: "Producto creado exitosamente",
        nuevoProducto
    });
};

export const mostrarProductos = (req, res) => {
    if (productos.length == 0) {
        return res.status(200).json({
            mensaje: "No hay productos registrados"
        });
    }
    res.status(200).json({
        productos_Registrados: productos
    });
};

export const mostrarproductosId = (req, res) => {
    let id = req.params.id;
    const existe = productos.find(p => p.id == id);
    if (!existe) {
        return res.status(404).json({
            mensaje: "Producto no encontrado"
        });
    }
    res.status(200).json({
        "Producto encontrado": existe
    });
};

export const editarproducto = (req, res) => {
    let id = req.params.id;
    const producto = productos.find(p => p.id == id);
    if (!producto) {
        return res.status(404).json({
            mensaje: "No existe un producto registrado con ese id"
        });
    }
    const { nombre, precio, cantidad } = req.body;
    producto.nombre = nombre;
    producto.precio = Number(precio);
    producto.cantidad = Number(cantidad);
    res.status(200).json({
        exito: "Producto editado satisfactoriamente",
        producto
    });
};

export const eliminarProducto = (req, res) => {
    let id = req.params.id;
    const index = productos.findIndex(p => p.id == id);
    if (index === -1) {
        return res.status(404).json({
            error: "No hay un producto registrado con el id"
        });
    }
    const productoEliminar = productos[index];
    productos.splice(index, 1);
    res.status(200).json({
        exito: "Producto eliminado exitosamente",
        productoEliminar
    });
};
