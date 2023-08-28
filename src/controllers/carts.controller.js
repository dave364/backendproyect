import {cartsService,productService,userService,ticketService} from "../services/index.js";
import { v4 as uuidv4 } from 'uuid';
import { transport } from "../app.js";
import ErrorService from "../services/ErrorService.js";
import {productErrorNoExist} from "../constants/productErrors.js"
import EErrors from "../constants/EErrors.js";

  const createCart = async (req,res)=>{
  await cartsService.createCart();
  res.send({status:"success",message:"Cart added"})
} 

 const getCartsByID = async (req,res)=>{
  const aux = await cartsService.getCartsByID(req.params.cid).populate('products.product');
  if (!aux){
     return res.send("el producto no existe");
  }
  return res.send(aux);
}

 const addProductCart = async (req, res) => {
  const { cartId, productId, quantity } = req.params;
  const result = await cartsService.addProductCart(cartId, productId, quantity);
  res.json({ message: result });
};

 const deleteAllProductsFromCart = async (req, res) => {
  const { cartId } = req.params;
  const result = await cartsService.deleteAllProductsFromCart(cartId);
  res.json({ message: result });
};

 const deleteProductFromCart = async (req, res) => {
  const { cartId, productId } = req.params;
  const result = await cartsService.deleteProductFromCart(cartId, productId);
  res.json({ message: result });
};

 const getProductsCartApi = async (req, res, next) => {
  try {
    const result = await cartsService.getProductsCartApi();
    res.json(result); // Responde con los productos del carrito

  } catch (error) {
    console.error("Error al obtener los productos del carrito:", error);

    // Si el error se debe a que el producto no existe, crea un error personalizado
    if (productErrorNoExist()) {
      const customError = {
        name: "Error de inserción del producto al carrito",
        cause: productErrorNoExist(),
        message: 'Error intentando insertar un producto inexistente al carrito',
        code: EErrors.INVALID_TYPES,
        status: 400
      };

      // Pasa el error personalizado al siguiente middleware para el manejo de errores
      next(customError);
    } else {
      // Si el error no es debido a la falta de producto, pasa el error original
      next(error);
    }
  }
};

 const getProductsCartView = async (req, res) => {
  const result = await cartsService.getProductsCartView();
  res.json(result);
};

 const updateCartProducts = async (req, res) => {
  const { cartId } = req.params;
  const { products } = req.body;
  const result = await cartsService.updateCartProducts(cartId, products);
  res.json(result);
};

const updateProductQuantity = async (req, res) => {
  const { cartId, productId } = req.params;
  const { quantity } = req.body;
  const result = await cartsService.updateProductQuantity(cartId, productId, quantity);
  res.json(result);
};

const FinalizarCompra = async (req,res) =>{
  const CartId = await cartsService.getCartsByID(req.params.cid);
  if (!CartId){
      return res.send({status:"success",message:"no existe el carrito con los productos a comprar"})  
     }
  else{         
              let counter = 0 ; 
              let total = 0;
              const ArregloProdNoCompra = []    
              const ArregloProdCompra = []            
              if  (CartId.products.length !== 0){                    
                  CartId.products.forEach(async (element) => {
              
                      console.log(element.product)
                      const product = await productService.getProductsByID(element.product);               
                      if (product.stock >= element.quantity){
                          const stockActualizado = product.stock - element.quantity;
                          await productService.updateProduct(element.product,{"stock":stockActualizado})
                          console.log(`${element.product}:`,true)                   
                          const productoEliminado = await cartsService.eliminarProductCart((req.params.cid),({"product":element.product}))     
                          console.log(productoEliminado)
                          console.log(product.price)
                          total = total + (element.quantity*product.price);
                          ArregloProdCompra.push(element.product)
                      }
                      else
                          {                        
                              console.log(`${element.product}:`,false)  
                              ArregloProdNoCompra.push(element.product)
                              //aca el stock es insuficiente a la compra y deberia sacar el producto y ponerlo en un arreglo
                          }  
                      counter++;
                          if (counter === CartId.products.length) {
                           if (total !=0) {
                              console.log(`el total es ${total}`);
                              console.log(ArregloProdNoCompra)
                                const user = await userService.getUser({cart:req.params.cid})
                                const userEmail = user.email
                                const code = uuidv4();
                                console.log(code);
                                const amount = total;
                                const purchaser = userEmail;
                                
                               await ticketService.createTicket({code,amount,purchaser});
      
                               const nombresConcatenadosComprados = ArregloProdCompra.join(" ");
                               const nombresConcatenados = ArregloProdNoCompra.join(" ");   
      
                               const result = await transport.sendMail({
                                  from:'Ecommerce Dave <catrodavid9872@gmail.com>',
                                  to:userEmail,
                                  subject:'Ticket de Compra',
                                  html:`
                                  <div>
                                      <h1>Hola, su compla fue completada</h1>
                                      <p>Precio total:${amount}</p>
                                      
                                      <h2>los Productos que si se pudieron comprar fueron : ${nombresConcatenadosComprados}</h2>
                                      <h2>los Productos que no se pudieron comprar fueron : ${nombresConcatenados}</h2>
      
                                  </div>
                                  `                            
                               })
                               return res.send({ status: "success", message: "se finalizo la compra" ,payload:nombresConcatenados});
                           }   
                           else {
                              const nombresConcatenados = ArregloProdNoCompra.join(" ");   
                              return res.send({ status: "no success", message: "no tiene productos para finalizar la compra",payload:nombresConcatenados });
                           }                    
                            
                          }            
                  }); 
              }
              else {
                  return res.send({ status: "no success", message: "no tiene productos para finalizar la compra",payload:"" });
              }
                       
          
     }
  

}

export default {
  getCartsByID,
  createCart,
  addProductCart,
  deleteAllProductsFromCart,
  deleteProductFromCart,
  getProductsCartApi,
  getProductsCartView,
  updateCartProducts,
  updateProductQuantity,
  FinalizarCompra
};