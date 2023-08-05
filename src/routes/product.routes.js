import { Router } from "express";
import productsController from '../controllers/products.controller.js';
import ProductManager from '../dao/managers/products.manager.js';

const ProductRouter = Router();

// Obtener todos los productos
ProductRouter.get("/", (req, res) => {
  console.log("GET /products");
  const productManager = new ProductManager(req, res);
  productManager.getProducts();
});

// Agregar un nuevo producto
ProductRouter.post("/", (req, res) => {
  console.log("POST /products");
  const productManager = new ProductManager(req, res);
  productManager.addProduct();
});

export default ProductRouter;


