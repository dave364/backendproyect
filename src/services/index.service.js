import PersistenceFactory from "../dao/factory.js"
import usersRepository from "../repositories/users.repository.js"
import cartsRepository from "../repositories/carts.repository.js"
import productsRepository from "../repositories/products.repository.js";
import ticketsRepository from "../repositories/ticket.repository.js"



const { usersDAO, productDAO , cartDAO,ticketDAO } = await PersistenceFactory.getPersistence();


export const userService = new usersRepository (usersDAO);
export const cartsService = new cartsRepository(cartDAO);
export const productService = new productsRepository (productDAO);
export const ticketService = new ticketsRepository(ticketDAO);