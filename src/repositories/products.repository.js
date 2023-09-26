export default class ProductsRepository {
  constructor(dao){
      this.dao =dao;
  }
  getProducts = (cantidad)=>{
    return this.dao.getProducts(cantidad);
}

  getProductsPaginate(page, orderBy) {
    return this.dao.getProductsPaginate(page, orderBy);
  }

  getProductsBy = (params)=>{
    return this.dao.getProductsBy(params);
}

getProductsByID = (id)=>{
  return this.dao.getProductsByID(id);
}

addProduct = (product)=>{
  return this.dao.addProduct(product);
}

  updateProduct = (id,product)=>{
    return this.dao.updateProduct(id,product);
  }

  deleteProduct = (id)=>{
    return this.dao.deleteProduct(id);
  }

};

