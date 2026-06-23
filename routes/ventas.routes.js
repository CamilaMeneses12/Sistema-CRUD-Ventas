import { Router } from "express";
import { validarProducto, validarId } from "../middlewares/validacionProductos.js";
import { validarproveedores, validarid } from "../middlewares/validacionproveedores.js";
import { validarVenta, validarIdVenta } from "../middlewares/validacionVentas.js";
import { validarToken } from "../middlewares/validarToken.js";
import { crearProducto, mostrarProductos, mostrarproductosId, editarproducto, eliminarProducto } from "../controllers/productos.controllers.js";
import { crearproveedores, mostrarproveedores, mostrarproveedoresid, editarproveedores, eliminarproveedores } from "../controllers/proveedores.controllers.js";
import { crearVenta, mostrarVentas, mostrarVentaId, eliminarVenta } from "../controllers/ventas.controllers.js";
import { reporteVentas } from "../controllers/reportes.controllers.js";
import { login } from "../controllers/auth.controllers.js";

const router = Router();

// --- Módulo 1: Login (pública, no requiere token) ---
router.post("/login", login);

// --- Módulo 2: CRUD Productos (protegido con token) ---
router.post("/productos", validarToken, validarProducto, crearProducto);
router.get("/productos", validarToken, mostrarProductos);
router.get("/productos/:id", validarToken, validarId, mostrarproductosId);
router.put("/productos/:id", validarToken, validarId, validarProducto, editarproducto);
router.delete("/productos/:id", validarToken, validarId, eliminarProducto);

// --- Módulo 3: CRUD Proveedores (protegido con token) ---
router.post("/proveedores", validarToken, validarproveedores, crearproveedores);
router.get("/proveedores", validarToken, mostrarproveedores);
router.get("/proveedores/:id", validarToken, validarid, mostrarproveedoresid);
router.put("/proveedores/:id", validarToken, validarid, validarproveedores, editarproveedores);
router.delete("/proveedores/:id", validarToken, validarid, eliminarproveedores);

// --- Módulo 4: CRUD Ventas (protegido con token) ---
router.post("/ventas", validarToken, validarVenta, crearVenta);
router.get("/ventas", validarToken, mostrarVentas);
router.get("/ventas/:id", validarToken, validarIdVenta, mostrarVentaId);
router.delete("/ventas/:id", validarToken, validarIdVenta, eliminarVenta);

// --- Módulo 5: Reportes (protegido con token) ---
router.get("/reportes/ventas", validarToken, reporteVentas);

export default router;