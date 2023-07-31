import { Router } from "express";
import { getProductsCartView } from "../dao/controllers/cartController.js";
import { privacy, handlePolicies } from "../middlewares/auth.js";

const ViewsRouter = Router();


// Ruta para renderizar la vista products.handlebars
ViewsRouter.get("/", (req, res) => {
  res.render("products", {user:req.session.user });
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

ViewsRouter.get('/register',privacy('NO_AUTHENTICATED'),(req,res)=>{
  res.render('register',{css:'home'});
})

ViewsRouter.get('/login',privacy('NO_AUTHENTICATED'),(req,res)=>{
  res.render('login',{css:'home'});
})

ViewsRouter.get('/profile',handlePolicies(['ADMIN','USER']),(req,res)=>{
  res.render('profile',{user:req.session.user})
});







export default ViewsRouter;
