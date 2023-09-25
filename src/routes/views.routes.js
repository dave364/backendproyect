import { Router } from "express";
import { privacy, handlePolicies } from "../middlewares/auth.js";
import viewsController from "../controllers/views.controller.js";

const ViewsRouter = Router();


// Ruta para renderizar la vista products.handlebars
ViewsRouter.get("/",privacy('PRIVATED'),handlePolicies(['USER','PREMIUM']),viewsController.mostrarProductos)
//ViewsRouter.get("/one",privacy('NO_AUTHENTICATED'),viewsController.mostrarProductos)//
// Ruta para renderizar la vista cart.handlebars
ViewsRouter.get("/carts/:cid", privacy('PRIVATED'),handlePolicies(['USER',"PREMIUM"]),viewsController.getCarrito)

ViewsRouter.get('/register',privacy('NO_AUTHENTICATED'),viewsController.register)

ViewsRouter.get('/login',privacy('NO_AUTHENTICATED'),viewsController.login)

ViewsRouter.get('/profile',handlePolicies(['ADMIN','USER',"PREMIUM"]),viewsController.profile)

ViewsRouter.get('/paneladmin',privacy('PRIVATED'),handlePolicies(['ADMIN',"PREMIUM"]),viewsController.panelAdmin)

ViewsRouter.get('/restoreRequest',privacy('NO_AUTHENTICATED'),viewsController.restoreRequest)

ViewsRouter.get('/restorePassword',privacy('NO_AUTHENTICATED'),viewsController.restorePassword)

ViewsRouter.get('/paneladminuser',privacy('PRIVATED'),handlePolicies(['ADMIN']),viewsController.panelAdminUser)

ViewsRouter.get('/endpoint',(req,res)=>{       
    req.logger.debug('This is a debug log message.');
    req.logger.http('This is a debug log message.');
    req.logger.info('This is a debug log message.');
    req.logger.warning('This is a debug log message.');
    req.logger.error('This is a debug log message.');
    req.logger.fatal('This is a debug log message.');
})
export default ViewsRouter; 
