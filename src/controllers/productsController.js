import { productModel } from "../model/Product.js";

export const addProduct = async (req, res) => {
 
  const { name, category, price } = req.body;

  try {
    // Crear una instancia del modelo de Producto con los datos proporcionados
    const newProduct = new productModel({ name, category, price });

    // Guardar el nuevo producto en la base de datos
    const savedProduct = await newProduct.save();

    res.json({
      mensaje: "El producto fue agregado exitosamente",
      product: savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al agregar el producto",
      error: error.message,
    });
  }
};

export const getProducts = async (req, res) => {

    try {
      /*console.log("holaa", req);*/
  
      const { page, orderBy } = req.query; 
      const order = orderBy == 0 ? {} : { price: orderBy };
      const options = {
        page: parseInt(page),
        limit: 4,
        sort: order
      };
      
      const products = await productModel.paginate({}, options);
     
      return     res.json({
        status: "success",
        payload: products    
      });
    }
      catch (error) {
      console.error("Error al leer los productos:", error);
      //throw error;
    }
  
};