import jwt from "jsonwebtoken";
// Clave secreta para firmar y verificar tokens (usar .env en producción)
const SECRET = "clave_secreta_sena_2024";
export const validarToken = (req, res, next) => {
    // Leer el token del header Authorization
    const token = req.headers["authorization"];
    // Si no hay token, denegar acceso
    if (!token) {
        return res.status(401).json({
            error: "Acceso denegado. No se proporcionó un token."
        });
    }
    try {
        // Quitar el prefijo "Bearer " y quedarse solo con el token
        const tokenLimpio = token.startsWith("Bearer ") ? token.slice(7) : token;
        // Verificar firma y expiración del token
        const decoded = jwt.verify(tokenLimpio, SECRET);
        // Guardar los datos del usuario para usarlos en la siguiente ruta
        req.usuario = decoded;
        // Pasar al siguiente middleware o controlador
        next();
    } catch (err) {
        // Token inválido o expirado
        return res.status(401).json({
            error: "Token inválido o expirado."
        });
    }
};
export { SECRET };