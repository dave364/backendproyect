import cartsService from "../services/carts.service.js";

export const addProductCart = async (req, res) => {
  const { cartId, productId, quantity } = req.params;
  const result = await cartsService.addProductCart(cartId, productId, quantity);
  res.json({ message: result });
};

export const deleteAllProductsFromCart = async (req, res) => {
  const { cartId } = req.params;
  const result = await cartsService.deleteAllProductsFromCart(cartId);
  res.json({ message: result });
};

export const deleteProductFromCart = async (req, res) => {
  const { cartId, productId } = req.params;
  const result = await cartsService.deleteProductFromCart(cartId, productId);
  res.json({ message: result });
};

export const getProductsCartApi = async (req, res) => {
  const result = await cartsService.getProductsCartApi();
  res.json(result);
};

export const getProductsCartView = async (req, res) => {
  const result = await cartsService.getProductsCartView();
  res.json(result);
};

export const updateCartProducts = async (req, res) => {
  const { cartId } = req.params;
  const { products } = req.body;
  const result = await cartsService.updateCartProducts(cartId, products);
  res.json(result);
};

export const updateProductQuantity = async (req, res) => {
  const { cartId, productId } = req.params;
  const { quantity } = req.body;
  const result = await cartsService.updateProductQuantity(cartId, productId, quantity);
  res.json(result);
};

export default {
  addProductCart,
  deleteAllProductsFromCart,
  deleteProductFromCart,
  getProductsCartApi,
  getProductsCartView,
  updateCartProducts,
  updateProductQuantity
};