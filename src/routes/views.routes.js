import { Router } from "express";
import { privacy, handlePolicies } from "../middlewares/auth.js";
import viewsController from "../controllers/views.controller.js";

const ViewsRouter = Router();


// Ruta para renderizar la vista products.handlebars
ViewsRouter.get("/",viewsController.mostrarProductos)

// Ruta para renderizar la vista cart.handlebars
ViewsRouter.get("/cart", viewsController.getCarrito)

ViewsRouter.get('/register',privacy('NO_AUTHENTICATED'),viewsController.register)

ViewsRouter.get('/login',privacy('NO_AUTHENTICATED'),viewsController.login)

ViewsRouter.get('/profile',handlePolicies(['ADMIN','USER']),viewsController.profile)

export default ViewsRouter; 
