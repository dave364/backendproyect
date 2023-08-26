import { Router } from "express";
import cartsController from "../controllers/carts.controller.js"


const CartRouter = Router();

CartRouter.post('/', cartsController.createCart)

CartRouter.get('/:cid', cartsController.getCartsByID)

// Ruta protegida por Passport: Obtener el carrito con todos los productos
CartRouter.get("/", cartsController.getProductsCartApi);

// Ruta protegida por Passport: Agregar un producto al carrito
CartRouter.post("/:cid/products-cart/:pid", cartsController.addProductCart);

// Ruta protegida por Passport: Actualizar el carrito con un arreglo de productos
CartRouter.put("/:cid", cartsController.updateCartProducts);

// Ruta protegida por Passport: Actualizar la cantidad de un producto en el carrito
CartRouter.put("/:cid/products/:pid", cartsController.updateProductQuantity);

// Ruta protegida por Passport: Eliminar un producto del carrito
CartRouter.delete("/:cid/products/:pid",  cartsController.deleteProductFromCart);

// Ruta protegida por Passport: Eliminar todos los productos del carrito
CartRouter.delete("/:cid/products", cartsController.deleteAllProductsFromCart);

CartRouter.post('/:cid/purchase',  cartsController.FinalizarCompra)

export default CartRouter;
