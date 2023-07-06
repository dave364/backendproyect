import { Router } from "express";
import {
  getProducts,
  addProduct,
  getProductsCart,
  addProductCart,
  putProduct,
  deleteProductFromCart,
  deleteAllProductsFromCart,
} from "../controllers/index.js";

const ProductRouter = Router();

// Obtener todos los productos
ProductRouter.get("/", getProducts);

// Obtener un producto por su ID
ProductRouter.get("/carts", getProductsCart);

// Agregar un nuevo producto
ProductRouter.post("/", addProduct);

// Agregar un producto al carrito
ProductRouter.post("/:cid/products-cart/:pid", addProductCart);

// Actualizar un producto por su ID
ProductRouter.put("/cart/:productId", putProduct);

// Eliminar un producto del carrito
ProductRouter.delete("/carts/:cartId/products/:productId", deleteProductFromCart);

// Eliminar todos los productos del carrito
ProductRouter.delete("/carts/:cartId/products", deleteAllProductsFromCart);

export default ProductRouter;


