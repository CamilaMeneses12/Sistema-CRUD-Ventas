import { ventas } from "../data/ventas.data.js";

export const reporteVentasTotal = (req, res) => {
    if (ventas.length === 0) {
        return res.status(200).json({
            mensaje: "No hay ventas registradas",
            totalVentas: 0
        });
    }

    const totalVentas = ventas.reduce((acumulado, venta) => acumulado + venta.total, 0);

    res.status(200).json({
        totalVentas
    });
};
