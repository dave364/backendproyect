export default class CartsRepository {
  constructor(dao){
      this.dao =dao;
  }
   addProductToCart = ()=>{
    return this.dao.addProductToCart();
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

