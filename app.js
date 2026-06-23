import express from "express"; 
import ventasRouter from "./routes/ventas.routes.js";//Importa el archivo donde están definidas todas las rutas de la API.

const app = express();
const port = 4000;

app.use(express.json()); // permite recibir datos en formato JSON en el body
app.use("/tienda", ventasRouter); //todas las rutas empiezan con /tienda

app.listen(port, () => {
    console.log(`Aplicacion corriendo en el puerto ${port}`);
});
