import jwt from "jsonwebtoken";
import { SECRET } from "../middlewares/validarToken.js";
import { usuarios } from "../data/usuarios.data.js";
/**
 * Controlador de inicio de sesión.
 * Valida las credenciales del usuario y retorna un JWT si son correctas.
 */
export const login = (req, res) => {
    // Extraer usuario y contraseña del cuerpo de la solicitud
    const { usuario, contrasena } = req.body;
    // Validar que ambos campos hayan sido enviados
    if (!usuario || !contrasena) {
        return res.status(400).json({
            error: "Debe proporcionar usuario y contraseña"
        });
    }
    // Buscar en la lista de usuarios uno que coincida con las credenciales recibidas
    const encontrado = usuarios.find(
        u => u.usuario === usuario && u.contrasena === contrasena
    );
    // Si no se encontró ningún usuario, responder con error de autenticación
    if (!encontrado) {
        return res.status(401).json({
            error: "Credenciales incorrectas"
        });
    }
    // Generar un token JWT con el id y nombre de usuario como payload.
    // Se firma con la clave secreta y expira en 2 horas.
    const token = jwt.sign(
        { id: encontrado.id, usuario: encontrado.usuario },
        SECRET,
        { expiresIn: "2h" }
    );
    // Responder con éxito y enviar el token al cliente
    res.status(200).json({
        mensaje: "Login exitoso",
        token
    });
};