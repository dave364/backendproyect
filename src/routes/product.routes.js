import { Router } from "express";
import productsController from '../controllers/products.controller.js';

const ProductRouter = Router();

ProductRouter.get("/", productsController.getProducts);

ProductRouter.post("/", productsController.addProduct);

ProductRouter.put('/:pid', productsController.updateProduct)

ProductRouter.delete('/:pid', productsController.deleteProduct)

ProductRouter.get('/:pid', productsController.getProductsByID)

export default ProductRouter;


