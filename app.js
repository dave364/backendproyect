import express from "express";
import cors from "cors";
import db from "./src/database/index.js";
import { engine } from "express-handlebars";
import __dirname from "./src/utils.js";
import * as path from "path";
import ProductRouter from "./src/routes/product.routes.js";
//import CartRouter from "./src/routes/cartRoutes.js";
import ViewsRouter from "./src/routes/views.routes.js";


const app = express();
app.use(express.static('src/public', { 
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

app.use(cors());
app.use(express.json());

app.use("/api/products", ProductRouter);
//app.use("/api/carts", CartRouter);



// Configura Handlebars como el motor de vistas
app.engine("handlebars", engine());
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname,  "views") )

app.use( "/products", ViewsRouter);



app.listen(4000, () => {
  console.log("Server funcionando en el puerto 4000");
  db();

}); 

export default app;
