import {productService} from "../services/index.js";

export const addProduct = async (req, res) => {
  const { name, category, price } = req.body;

  try {
    const result = await productService.addProduct(name, category, price);
    if (result.error) {
      return res.status(500).json(result);
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al agregar el producto",
      error: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  console.log(req.query)
  try {
    const { page, orderBy } = req.query;

    console.log("Page:", page);
    console.log("OrderBy:", orderBy);

    const result = await productService.getProducts(page, orderBy);
    res.json(result);
  } catch (error) {
    console.error("Error al leer los productos:", error);
    res.status(500).json({
      status: "error",
      message: "Error al leer los productos",
    });
  }
};

export default {
  addProduct,
  getProducts,
};
