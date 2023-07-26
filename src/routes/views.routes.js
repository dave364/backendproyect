import { Router } from "express";


const ViewsRouter = Router();

// Ruta para renderizar la vista products.handlebars
ViewsRouter.get("/", (req, res) => {
  res.render("products");
});

// Ruta para renderizar la vista cart.handlebars
ViewsRouter.get("/lista", async (req,res)=>{       
  res.render('cart');
});



export default ViewsRouter;
