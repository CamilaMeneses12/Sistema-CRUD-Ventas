import { ventas } from "../data/ventas.data.js";

export const reporteVentas = (req, res) => {
    if (ventas.length === 0) {
        return res.status(200).json({
            mensaje: "No hay ventas registradas",
            total_ventas: 0
        });
    }

    const total_ventas = ventas.length;

    // Ahora cada venta tiene totalGeneral en vez de total
    const total_ingresos = ventas.reduce((acc, venta) => acc + venta.totalGeneral, 0);

    const venta_mas_alta = ventas.reduce((max, venta) => venta.totalGeneral > max.totalGeneral ? venta : max, ventas[0]);

    const venta_mas_baja = ventas.reduce((min, venta) => venta.totalGeneral < min.totalGeneral ? venta : min, ventas[0]);

    const promedio_por_venta = total_ingresos / total_ventas;

    // Sumar unidades de todos los productos de todas las ventas
    const total_unidades_vendidas = ventas.reduce((acc, venta) => {
        return acc + venta.productos.reduce((s, p) => s + p.cantidad, 0);
    }, 0);

    // Agrupar por producto recorriendo el array de productos de cada venta
    const productos_vendidos = ventas.reduce((acc, venta) => {
        for (const item of venta.productos) {
            const key = item.nombreProducto;
            if (!acc[key]) {
                acc[key] = { nombre: key, cantidad: 0, ingresos: 0 };
            }
            acc[key].cantidad += item.cantidad;
            acc[key].ingresos += item.subtotal;
        }
        return acc;
    }, {});

    res.status(200).json({
        total_ventas,
        total_ingresos,
        promedio_por_venta: parseFloat(promedio_por_venta.toFixed(2)),
        total_unidades_vendidas,
        venta_mas_alta: {
            id: venta_mas_alta.id,
            totalGeneral: venta_mas_alta.totalGeneral,
            registrado_por: venta_mas_alta.registradoPor
        },
        venta_mas_baja: {
            id: venta_mas_baja.id,
            totalGeneral: venta_mas_baja.totalGeneral,
            registrado_por: venta_mas_baja.registradoPor
        },
        productos_vendidos: Object.values(productos_vendidos)
    });
};