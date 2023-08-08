import { productModel } from "../model/Product.js";

export default class ProductManager {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  addProduct = async () => {
    const { name, category, price } = this.req.body;

    try {
      const newProduct = new productModel({ name, category, price });
      const savedProduct = await newProduct.save();

      this.res.json({
        mensaje: "El producto fue agregado exitosamente",
        product: savedProduct,
      });
    } catch (error) {
      this.res.status(500).json({
        mensaje: "Error al agregar el producto",
        error: error.message,
      });
    }
  };

  getProducts = async (page, orderBy) => {
    try {
      console.log('page:', page, 'orderBy:', orderBy, );
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
}


