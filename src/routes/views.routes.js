import { Router } from "express";


const ViewsRouter = Router();

// Ruta para renderizar la vista products.handlebars
ViewsRouter.get("/", (req, res) => {
  res.render("products");
});

// Ruta para renderizar la vista cart.handlebars
ViewsRouter.get("/cart/:id", (req, res) => {
  const { id } = req.params;
  res.render("cart", { cartId: id });
});



export default ViewsRouter;
