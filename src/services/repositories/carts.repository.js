export default class CartsRepository {
  constructor(dao){
      this.dao =dao;
  } 
  createCart = ()=>{
        return this.dao.createCart();
  }
  getCartsByID= (params)=>{
    console.log("Entrando a getCartsByID");
    return this.dao.getCartsByID(params);
  }

  addProductCart = (idCart,producto)=>{
    return this.dao.addProductCart(idCart,producto);
}

deleteProductFromCart = (idCart,producto)=>{
  return this.dao.deleteProductFromCart(idCart,producto);
}

  deleteAllProductsFromCart= (idCart)=>{
    return this.dao.deleteAllProductsFromCart(idCart)
}

   updateCartProducts= (idCart,arregloProductos)=>{
    return this.dao.updateCartProducts(idCart,arregloProductos);
}

   updateProductQuantity= (idCart,producto)=>{
    return this.dao.updateProductQuantity(idCart,producto);
} 
}

