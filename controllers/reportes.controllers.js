
import { ventas } from "../data/ventas.data.js";

export const reporteVentas = (req, res) => {
    if (ventas.length === 0) {
        return res.status(200).json({
            mensaje: "No hay ventas registradas",
            total_ventas: 0
        });
    }

    const total_ventas = ventas.length;

    const total_ingresos = ventas.reduce((acc, venta) => acc + venta.total, 0);

    const venta_mas_alta = ventas.reduce((max, venta) => venta.total > max.total ? venta : max, ventas[0]);

    const venta_mas_baja = ventas.reduce((min, venta) => venta.total < min.total ? venta : min, ventas[0]);

    const promedio_por_venta = total_ingresos / total_ventas;

    const total_unidades_vendidas = ventas.reduce((acc, venta) => acc + venta.cantidad, 0);

    const productos_vendidos = ventas.reduce((acc, venta) => {
        const key = venta.nombreProducto;
        if (!acc[key]) {
            acc[key] = { nombre: key, cantidad: 0, ingresos: 0 };
        }
        acc[key].cantidad += venta.cantidad;
        acc[key].ingresos += venta.total;
        return acc;
    }, {});

    res.status(200).json({
        total_ventas,
        total_ingresos,
        promedio_por_venta: parseFloat(promedio_por_venta.toFixed(2)),
        total_unidades_vendidas,
        venta_mas_alta: {
            id: venta_mas_alta.id,
            producto: venta_mas_alta.nombreProducto,
            cantidad: venta_mas_alta.cantidad,
            total: venta_mas_alta.total,
            registrado_por: venta_mas_alta.registradoPor
        },
        venta_mas_baja: {
            id: venta_mas_baja.id,
            producto: venta_mas_baja.nombreProducto,
            cantidad: venta_mas_baja.cantidad,
            total: venta_mas_baja.total,
            registrado_por: venta_mas_baja.registradoPor
        },
        productos_vendidos: Object.values(productos_vendidos)
    });
};