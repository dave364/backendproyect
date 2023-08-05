export default class ProductsService {
  constructor(dao){
      this.dao =dao;
  }
     addProduct(name, category, price) {
    return this.dao.addProduct(name, category, price);
  }

  async getProducts(page, orderBy) {
    console.log(page);
    return this.dao.getProducts(page, orderBy);
  }
};

