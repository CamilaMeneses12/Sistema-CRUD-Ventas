import jwt from "jsonwebtoken";

const SECRET = "clave_secreta_sena_2024"; // Clave secreta para firmar los tokens

export const validarToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({
            error: "Acceso denegado. No se proporcionó un token."
        });
    }

    try {
        // El token se envía como: Bearer <token>
        const tokenLimpio = token.startsWith("Bearer ") ? token.slice(7) : token;
        const decoded = jwt.verify(tokenLimpio, SECRET);
        req.usuario = decoded; // Guardamos los datos del usuario en la request
        next();
    } catch (err) {
        return res.status(401).json({
            error: "Token inválido o expirado."
        });
    }
};

export { SECRET };
