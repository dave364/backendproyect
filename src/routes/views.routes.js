import { Router } from "express";

import { getProductsCartView } from "../controllers/cartController.js";


const ViewsRouter = Router();


// Ruta para renderizar la vista products.handlebars
ViewsRouter.get("/", (req, res) => {
  res.render("products");
});

// Ruta para renderizar la vista cart.handlebars
ViewsRouter.get("/cart", async (req, res) => {
  try {
    const response = await getProductsCartView(req, res);
    const productsCart = response.productsCart;

    console.log("Productos obtenidos:", productsCart);

    res.render("cart", { productsCart,  });
  } catch (error) {
    console.error("Error al obtener los productos del carrito:", error);
    res.render("cart", { productsCart: [] });
  }
});







export default ViewsRouter;
