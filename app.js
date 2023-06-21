import express from "express";
import cors from "cors";
import db from "./src/database/index.js";
import * as controllers from "./src/controllers/index.js";

const app = express();

app.use(cors());
app.use(express.json());

/* GET */
app.get("/products", controllers.getProducts);
app.get("/products-cart", controllers.getProductsCart);

/* POST */
app.post("/:cid/products-cart/:pid", controllers.addProductCart);
app.post("/products", controllers.addProduct);

/* PUT */
app.put("/products-cart/:productId", controllers.putProduct);

/* DELETE */
app.delete("/products-cart/:productId", controllers.deleteProduct);

app.listen(4000, () => {
  console.log("Server funcionando en el puerto 4000");
  db();
});

export default app;
