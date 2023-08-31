
import  cartModel  from "../model/Cart.js";
import mongoose from "mongoose";


export default class CartsManager {

  createCart = ()=>{
    return  cartModel.create({"products":[]})
} 

getCartsByID = (params)=>{
  return cartModel.findOne({'_id':params}).lean();
}

 addProductCart = async (idCart,producto) =>{
  const cartBuscado =  await this.getCartsByID(idCart);
  if (!cartBuscado){
      return "no existe el carrito"
  }
  else
      {     
          const ProductoEncontrado = await cartModel.findOne({
              _id: idCart,
              products: { $elemMatch: { product: new mongoose.Types.ObjectId(producto.product)} }
            });
          if (!ProductoEncontrado) {
              await cartModel.updateOne(
                  {_id:idCart},                    
                  {$push:{products:{product:new mongoose.Types.ObjectId(producto.product),quantity:producto.quantity}}}                
                  )
              return "se agrego el producto nuevo"
          }
          else{                  
              
              await cartModel.updateOne(
                { _id:idCart, "products.product": new mongoose.Types.ObjectId(producto.product) },
                { $inc: { "products.$.quantity": producto.quantity } }
              );
              return "se modifico el quantity"
              
          }
            
          

  }
}

 deleteAllProductsFromCart = async (idCart) =>{
  await cartModel.findOneAndUpdate(
      { _id: idCart }, // Condición de búsqueda
      { $set: { products: [] } }, // Operador de actualización con el nuevo arreglo
      { new: true } // Opciones
    );

}

   deleteProductFromCart = async (idCart,producto)=>{
    const cartBuscado =  await this.getCartsByID(idCart);
    if (!cartBuscado){
        return "no existe el carrito"
    }
    else{
        const ProductoEncontrado = await cartModel.findOne({
            _id: idCart,
            products: { $elemMatch: { product: new mongoose.Types.ObjectId(producto.product)} }
          });
          if (!ProductoEncontrado) {
            return "no existe el producto a eliminar en el carrito"
          }
          else{
            await cartModel.findOneAndUpdate(
                { _id: idCart }, // Condición de búsqueda
                { $pull: { products: { product: new mongoose.Types.ObjectId(producto.product) } } }, // Operador de actualización
                { new: true } // Opciones
              );
          }

    }
}

  

 // Actualizar el carrito con un arreglo de productos
 updateCartProducts = async (idCart,arregloProductos) =>{
  await cartModel.findOneAndUpdate(
      { _id: idCart }, // Condición de búsqueda
      { $set: { products: arregloProductos } }, // Operador de actualización con el nuevo arreglo
      { new: true } // Opciones
    );

}

// Actualizar la cantidad de un producto en el carrito
 updateProductQuantity = async (idCart,producto) =>{
  const ProductoEncontrado = await cartModel.findOne({
      _id: idCart,
      products: { $elemMatch: { product: new mongoose.Types.ObjectId(producto.product)} }
    });
  if (!ProductoEncontrado) {
      return "no se encontro el producto a modificar dentro del carrito"
   }
  else {
      await cartModel.findOneAndUpdate(
          { _id: idCart }, // Condición de búsqueda
          { $set: { "products.$[elem].quantity": producto.quantity } }, // Operador de actualización
          { 
            new: true, // Opciones
            arrayFilters: [{ "elem.product": new mongoose.Types.ObjectId(producto.product) }] // Filtro para actualizar solo el elemento correspondiente
          }
        );
  }
      
}

}










