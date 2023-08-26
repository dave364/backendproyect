import { productService, cartsService } from "../services/index.js";
import  jwt  from "jsonwebtoken";
import config from "../config/config.js";

// Ruta para renderizar la vista products.handlebars
const mostrarProductos = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const orderBy = req.query.orderBy || 0;

    console.log('page:', page, 'orderBy:', orderBy); // Agrega este console.log

    const products = await productService.getProducts(page, orderBy);

    console.log('Productos obtenidos:', products); // Agrega este console.log

    res.render("products", { user: req.session.user, products });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.render("products", { user: req.session.user, products: [] });
  }
};

// Ruta para renderizar la vista cart.handlebars
const getCarrito = async (req, res) => {
  try {
    const response = await cartsService.getProductsCartView();
    const productsCart = response.productsCart;

    console.log("Productos obtenidos del carrito:", productsCart); // Agrega este console.log

    res.render("cart", { productsCart });
  } catch (error) {
    console.error("Error al obtener los productos del carrito:", error);
    res.render("cart", { productsCart: [] });
  }
};

const register = (req, res) => {
  res.render('register', { css: 'home' });
};

const login = (req, res) => {
  res.render('login', { css: 'home' });
};

const profile = (req, res) => {
  res.render('profile', { user: req.session.user });
};

const panelAdmin = (req,res) =>{
  res.render('panelAdmin', { css:'home',  user: req.session.user })
}

const restoreRequest = (req,res) =>{
  res.render('restoreRequest')
}

const restorePassword = (req,res) =>{
  const {token} = req.query;
  try{
    const validToken = jwt.verify(token,config.jwt.SECRET)
    res.render('restorePassword')
  } 
  catch(error){      
     return res.render('invalidToken')    
    }   
 
}

export default {
  mostrarProductos,
  getCarrito,
  register,
  login,
  profile,
  panelAdmin,
  restoreRequest,
  restorePassword
};
