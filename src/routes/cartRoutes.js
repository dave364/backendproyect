import express from 'express';
import * as viewsController from '../controllers/viewsController';

const CartRouter = express.Router();

// Ruta para visualizar un carrito específico
router.get('/carts/:cid', viewsController.getCart);

export default CartRouter;
