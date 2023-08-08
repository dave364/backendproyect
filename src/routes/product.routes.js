import { Router } from "express";
import productsController from '../controllers/products.controller.js';

const ProductRouter = Router();

ProductRouter.get("/", productsController.getProducts);

ProductRouter.post("/", productsController.addProduct);

export default ProductRouter;


