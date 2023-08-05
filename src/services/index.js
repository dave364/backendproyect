import UserManager from "../dao/managers/user.manager.js";
import CartsManager from "../dao/managers/cart.manager.js"
import ProductManager from "../dao/managers/products.manager.js";
import usersService from "./users.service.js"
import cartsService from "./carts.service.js"
import productsService from "./products.service.js";

export const userService = new usersService (new UserManager());
export const cartService = new cartsService(new CartsManager());
export const productService = new productsService (new ProductManager());