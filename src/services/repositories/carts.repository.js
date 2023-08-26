export default class CartsRepository {
  constructor(dao){
      this.dao =dao;
  } 
  createCart = ()=>{
        return this.dao.createCart();
  }
  getCartsByID= (params)=>{
    return this.dao.getCartsByID(params);
  }

  addProductCart = ()=>{
    return this.dao.addProductCart();
  }

  deleteAllProductsFromCart= ()=>{
    return this.dao.deleteAllProductsFromCart();
  }

   deleteProductFromCart= ()=>{
    return this.dao.deleteProductFromCart();
  }

   getProductsCartApi= ()=>{
    return this.dao.getProductsCartApi();
  }

   getProductsCartView = ()=>{
    return this.dao.getProductsCartView();
  }

   updateCartProducts= ()=>{
    return this.dao.updateCartProducts();
  }

   updateProductQuantity= ()=>{
    return this.dao.updateProductQuantity();
  }
}

