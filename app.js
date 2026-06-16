import express from "express";
import ventasRouter from "./routes/ventas.routes.js";

const app = express();
const port = 4000;

app.use(express.json()); // Indicando que vamos a trabajar con formato json
app.use("/tienda", ventasRouter);

app.listen(port, () => {
    console.log(`Aplicacion corriendo en el puerto ${port}`);
});
