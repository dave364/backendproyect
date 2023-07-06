import Cart from "../model/Cart.js";

export const getProductsCart = async (req, res) => {console.log("getproductcart", res);
  const productsCart = await Cart.find();

  if (productsCart) {
    res.json({ productsCart });
  } else {
    res.json({ mensaje: "No hay productos en el carrito" });
  }
};
