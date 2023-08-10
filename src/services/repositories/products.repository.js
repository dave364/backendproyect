export default class ProductsRepository {
  constructor(dao){
      this.dao =dao;
  }
     addProduct(product) {
    return this.dao.addProduct(product);
  }

  async getProducts(page, orderBy) {
    console.log(page);
    return this.dao.getProducts(page, orderBy);
  }

  getProductsBy = (params)=>{
    return this.dao.getProductsBy(params);
}

  updateProduct = (id,product)=>{
    return this.dao.updateProduct(id,product);
  }

  deleteProduct = (id)=>{
    return this.dao.deleteProduct(id);
  }

};

