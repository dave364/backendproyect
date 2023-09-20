import  productModel  from "../model/Product.js";
import mongoose from "mongoose";

export default class ProductManager {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

addProduct = (product) => {
        
  return productModel.create(product);
}

  getProducts = async (page, orderBy) => {
    try {
      const order = orderBy == 0 ? {} : { price: orderBy };
      const options = {
        page: parseInt(page),
        limit: 4,
        sort: order,
      };

      const products = await productModel.paginate({}, options);

     return {
        status: "success",
        payload: products,
      };
    } catch (error) {
      console.error("Error al leer los productos manager:", error);
      //throw error;
    }
  };

  getProductsBy = (params)=>{
    return productModel.findOne(params);
}

  updateProduct = (id,product)=>{
    const idValido = new mongoose.Types.ObjectId(id);
    return productModel.findByIdAndUpdate({'_id':idValido},{$set:product})
}

  deleteProduct = (id)=>{
    const idValido = new mongoose.Types.ObjectId(id);
    return productModel.findOneAndDelete({_id:idValido});
}

getProductsByID =  (id)=>{
  const idValido = new mongoose.Types.ObjectId(id);
  return productModel.findOne({'_id':idValido});
  
}        

}


