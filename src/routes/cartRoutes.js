import { Router } from "express";
import path from "path";
import {
  getProductsCart,
  addProductCart,
  putProduct,
  deleteProductFromCart,
  deleteAllProductsFromCart,
} from "../controllers/cartController.js";

const CartRouter = Router();

// Obtener un producto por su ID
CartRouter.get("/", getProductsCart); 

// Agregar un producto al carrito
CartRouter.post("/:cid/products-cart/:pid", addProductCart);

// Actualizar un producto por su ID
CartRouter.put("/cart/:productId", putProduct);

// Eliminar un producto del carrito
CartRouter.delete("/carts/:cartId/products/:productId", deleteProductFromCart);

// Eliminar todos los productos del carrito
CartRouter.delete("/carts/:cartId/products", deleteAllProductsFromCart);

export default CartRouter;
