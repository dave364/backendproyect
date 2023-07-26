import { Router } from "express";
import {
  getProducts,
  addProduct,

} from "../controllers/productsController.js";

const ProductRouter = Router();

// Obtener todos los productos
ProductRouter.get("/", getProducts);

// Agregar un nuevo producto
ProductRouter.post("/", addProduct);


export default ProductRouter;


