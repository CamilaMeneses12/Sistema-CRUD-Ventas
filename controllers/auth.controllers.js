import jwt from "jsonwebtoken";
import { SECRET } from "../middlewares/validarToken.js";
import { usuarios } from "../data/usuarios.data.js";

export const login = (req, res) => {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
        return res.status(400).json({
            error: "Debe proporcionar usuario y contraseña"
        });
    }

    const encontrado = usuarios.find(
        u => u.usuario === usuario && u.contrasena === contrasena
    );

    if (!encontrado) {
        return res.status(401).json({
            error: "Credenciales incorrectas"
        });
    }

    const token = jwt.sign(
        { id: encontrado.id, usuario: encontrado.usuario },
        SECRET,
        { expiresIn: "2h" }
    );

    res.status(200).json({
        mensaje: "Login exitoso",
        token
    });
};
