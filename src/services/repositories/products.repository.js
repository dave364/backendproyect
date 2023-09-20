export default class ProductsRepository {
  constructor(dao){
      this.dao =dao;
  }
     addProduct(product) {
    return this.dao.addProduct(product);
  }

  getProducts(page, orderBy) {
    return this.dao.getProducts(page, orderBy);
  }

  getProductsBy = (params)=>{
    return this.dao.getProductsBy(params);
}

getProductsByID = (id)=>{
  return this.dao.getProductsByID(id);
}

  updateProduct = (id,product)=>{
    return this.dao.updateProduct(id,product);
  }

  deleteProduct = (id)=>{
    return this.dao.deleteProduct(id);
  }

};

