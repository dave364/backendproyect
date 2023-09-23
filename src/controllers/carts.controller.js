import {cartsService,productService,userService,ticketService} from "../services/index.service.js";
import { v4 as uuidv4 } from 'uuid';
import { transport } from "../app.js";
import ErrorService from "../services/error.service.js";
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

 const addProductCart =  async (req,res,next)=>{
  try {
      const ProductId = await productService.getProductsByID(req.params.pid);
      
   if (ProductId){
       const mensaje = await cartsService.addProductCart((req.params.cid),({"product":req.params.pid,"quantity":req.body.quantity || 1}))             
       return res.send({status:"success",message:mensaje})  
   }
   ErrorService.createError({
      name:"Error de insercion del producto al carrito",
      cause: productErrorNoExist(),
      message: 'Error intentando insertar un  producto inexistente al carrito ',
      code: EErrors.INVALID_TYPES,
      status:400
  })
     
  } catch (error) {
      req.logger.error(error)
      next(error);         
  }

}

 const deleteAllProductsFromCart = async (req,res) =>{
  const CartId = await cartsService.getCartsByID(req.params.cid);
  if (!CartId){
   return res.send({status:"success",message:"no existe el carrito con los productos a eliminar"})  
  }
  else{         
       await cartsService.deleteAllProductsFromCart(req.params.cid);
       return res.send({status:"success",message:"los productos fueron eliminados"})  
  }
}

 const deleteProductFromCart = async (req,res)=>{
  const ProductId = await productService.getProductsByID(req.params.pid);
  if (ProductId){
      const mensaje = await cartsService.deleteProductFromCart((req.params.cid),({"product":req.params.pid}))             
      return res.send({status:"success",message:mensaje})  
  }
  return res.send({status:"success",message:"Product no exist"}) 
}


 const updateCartProducts =  async (req,res) =>{
  const CartId = await cartsService.getCartsByID(req.params.cid);
  if (!CartId){
   return res.send({status:"success",message:"no existe el carrito con los productos a modificar"})  
  }
  else{
       const datos = req.body;
       await cartsService.updateCartProducts(req.params.cid,datos);
       return res.send({status:"success",message:"los productos fueron modificados"})  
  }
}

const updateProductQuantity = async (req,res)=>{
  const CartId = await cartsService.getCartsByID(req.params.cid);
  if (!CartId){
      return res.send({status:"no success",message:"el carrito no existe"})
  }
  else{   
      const ProductId = await productService.getProductsByID(req.params.pid);       
       if (ProductId){
          const mensaje = await cartsService.updateProductQuantity((req.params.cid),({"product":req.params.pid,"quantity":req.body.quantity}))             
          return res.send({status:"success",message:mensaje})  
      }
      return res.send({status:"no success",message:"Product no exist"}) 
  }
}

const FinalizarCompra = async (req,res) =>{
    const CartId = await cartsService.getCartsByID(req.params.cid);
    console.log(`cantidad de productos en el cart+${CartId.products.length}`)
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
                
                        console.log(element)
                        const product = await productService.getProductsByID(element.product);                         
                        if (product){
                            if (product.stock >= element.quantity){
                                const stockActualizado = product.stock - element.quantity;
                                await productService.updateProduct(element.product,{"stock":stockActualizado})
                                req.logger.debug(`${element.product}:`,true)                   
                                const productoEliminado = await cartService.eliminarProductCart((req.params.cid),({"product":element.product}))     
                                req.logger.debug(productoEliminado)
                                req.logger.debug(product.price)
                                total = total + (element.quantity*product.price);
                                ArregloProdCompra.push(element.product)
                            }
                            else
                                {                        
                                    req.logger.debug(`${element.product}:`,false)  
                                    ArregloProdNoCompra.push(element.product)
                                    //aca el stock es insuficiente a la compra y deberia sacar el producto y ponerlo en un arreglo
                                } 
                        }                         
                        counter++;

                            if (counter === CartId.products.length) {
                             if (total !=0) {
                                req.logger.debug(`el total es ${total}`);                                
                                  const user = await userService.getUser({cart:req.params.cid})
                                  const userEmail = user.email
                                  const code = uuidv4();                                  
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
  updateCartProducts,
  updateProductQuantity,
  FinalizarCompra
};