import { Router } from "express";
import {
  getProductsCartApi,
  addProductCart,
  updateCartProducts,
  updateProductQuantity,
  deleteProductFromCart,
  deleteAllProductsFromCart,
} from "../controllers/cartController.js";

const CartRouter = Router();

// Obtener el carrito con todos los productos
CartRouter.get("/", getProductsCartApi);

// Agregar un producto al carrito
CartRouter.post("/:cid/products-cart/:pid", addProductCart);

// Actualizar el carrito con un arreglo de productos
CartRouter.put("/:cid", updateCartProducts);

// Actualizar la cantidad de un producto en el carrito
CartRouter.put("/:cid/products/:pid", updateProductQuantity);

// Eliminar un producto del carrito
CartRouter.delete("/:cid/products/:pid", deleteProductFromCart);

// Eliminar todos los productos del carrito
CartRouter.delete("/:cid/products", deleteAllProductsFromCart);

export default CartRouter;
