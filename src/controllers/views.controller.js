import { productService, cartsService } from "../services/index.service.js";
import TokenDTO from "../dtos/user/TokenDTO.js";
import  jwt  from "jsonwebtoken";
import {userService } from "../services/index.service.js";
import config from "../config/config.js";

// Ruta para renderizar la vista products.handlebars
const mostrarProductos = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const orderBy = req.query.orderBy || 0;


    const products = await productService.getProducts(page, orderBy);


    res.render("products", { user: req.session.user, products });
  } catch (error) {
    res.render("products", { user: req.session.user, products: [] });
  }
};

// Ruta para renderizar la vista cart.handlebars
const getCarrito = async (req,res) =>{
  const carritoId = await cartsService.getCartsByID(req.params.cid).populate('products.product');;
  
  let total=0;
  carritoId.products.forEach(element => {        
    if (element && element.product && element.product.price) {
      total = total + element.quantity * element.product.price;
    }
  });
  
 res.render('cart',{carritoId ,total,css:'styles'})
}


const register = (req, res) => {
  res.render('register', { css: 'styles' });
};

const login = (req, res) => {
  res.render('login', { css: 'styles' });
};

const profile = (req, res) => {
  res.render('profile', { user: req.session.user });
};

const panelAdmin = (req,res) =>{
  res.render('panelAdmin', { css:'styles',  user: req.session.user })
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

const panelAdminUser = async (req,res)=>{
  const users = await userService.getUserAll();
  const userDTO = users.map( user =>  new TokenDTO(user) ) 
  res.render('panelAdminUser',{
    users:userDTO,
    css:'styles'
  })
}

export default {
  mostrarProductos,
  getCarrito,
  register,
  login,
  profile,
  panelAdmin,
  restoreRequest,
  restorePassword,
  panelAdminUser
};
