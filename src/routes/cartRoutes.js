import { Router } from "express";
import passport from "passport"; // Importa Passport

import {
  getProductsCartApi,
  addProductCart,
  updateCartProducts,
  updateProductQuantity,
  deleteProductFromCart,
  deleteAllProductsFromCart,
} from "../dao/controllers/cartController.js";

const CartRouter = Router();

// Ruta protegida por Passport: Obtener el carrito con todos los productos
CartRouter.get("/", passport.authenticate("local-strategy"), getProductsCartApi);

// Ruta protegida por Passport: Agregar un producto al carrito
CartRouter.post("/:cid/products-cart/:pid", passport.authenticate("local-strategy"), addProductCart);

// Ruta protegida por Passport: Actualizar el carrito con un arreglo de productos
CartRouter.put("/:cid", passport.authenticate("local-strategy"), updateCartProducts);

// Ruta protegida por Passport: Actualizar la cantidad de un producto en el carrito
CartRouter.put("/:cid/products/:pid", passport.authenticate("local-strategy"), updateProductQuantity);

// Ruta protegida por Passport: Eliminar un producto del carrito
CartRouter.delete("/:cid/products/:pid", passport.authenticate("local-strategy"), deleteProductFromCart);

// Ruta protegida por Passport: Eliminar todos los productos del carrito
CartRouter.delete("/:cid/products", passport.authenticate("local-strategy"), deleteAllProductsFromCart);

export default CartRouter;
