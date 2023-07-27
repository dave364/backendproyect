
import { productModel } from "../model/Product.js";
import { cartModel } from "../model/Cart.js";


export const addProductCart = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    // Verificar si el carrito existe
    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ mensaje: "El carrito no existe" });
    }

    // Verificar si el producto existe
    const product = await productModel.findById(pid);
    if (!product) {
      return res.status(404).json({ mensaje: "El producto no existe" });
    }

    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.products.find(
      (item) => item.product.toString() === pid
    );

    // Si el producto ya está en el carrito, incrementar la cantidad
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      // Si el producto no está en el carrito, agregarlo
      cart.products.push({ product: pid, quantity: 1 });
    }

    // Guardar el carrito actualizado en la base de datos
    await cart.save();

    res.json({
      mensaje: "El producto fue agregado al carrito",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al agregar el producto al carrito" });
  }
};

export const deleteAllProductsFromCart = async (req, res) => {
    const { cartId } = req.params;
  
    try {
      // Buscar el carrito por su ID
      const cart = await Cart.findById(cartId);
  
      // Verificar si el carrito existe
      if (!cart) {
        return res.status(404).json({ message: "El carrito no existe" });
      }
  
      // Eliminar todos los productos del carrito
      cart.products = [];
  
      // Guardar los cambios en el carrito
      await cart.save();
  
      res.json({ message: "Todos los productos han sido eliminados del carrito" });
    } catch (error) {
      res.status(500).json({ message: "Hubo un error al eliminar los productos del carrito" });
    }
  };

  export const deleteProductFromCart = async (req, res) => {
    const { cartId, productId } = req.params;
  
    try {
      // Buscar el carrito por su ID
      const cart = await Cart.findById(cartId);
  
      // Verificar si el carrito existe
      if (!cart) {
        return res.status(404).json({ message: "El carrito no existe" });
      }
  
      // Encontrar el producto en el carrito
      const product = cart.products.find((product) => product._id.toString() === productId);
  
      // Verificar si el producto existe en el carrito
      if (!product) {
        return res.status(404).json({ message: "El producto no existe en el carrito" });
      }
  
      // Restar 1 a la cantidad del producto en el carrito
      product.quantity -= 1;
  
      // Verificar si la cantidad llega a 0 y eliminar el producto completamente
      if (product.quantity === 0) {
        cart.products = cart.products.filter((product) => product._id.toString() !== productId);
      }
  
      // Guardar los cambios en el carrito
      await cart.save();
  
      res.json({ message: "Producto eliminado del carrito correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Hubo un error al eliminar el producto del carrito" });
    }
  };
  
  export const getProductsCartApi = async (req, res) => {
    try {
      const productsCart = await cartModel.find();
  
      if (productsCart.length > 0) {
        res.json({ productsCart });
      } else {
        res.json({ mensaje: "No hay productos en el carrito" });
      }
    } catch (error) {
      console.error("Error al obtener los productos del carrito:", error);
      res.status(500).json({ mensaje: "Error al obtener los productos del carrito desde la base de datos" });
    }
  };
  
 export const getProductsCartView = async (req, res) => {
  try {
    const productsCart = await cartModel.find();

    if (productsCart.length > 0) {
      const cart = productsCart[0];
      const products = await Promise.all(cart.products.map(async (item) => {
        const product = await productModel.findById(item.product);
        return {
          _id: product._id,
          name: product.name,
          quantity: item.quantity,
        };
      }));

      return { productsCart: products };
    } else {
      return { productsCart: [] };
    }
  } catch (error) {
    console.error("Error al obtener los productos del carrito:", error);
    return { productsCart: [] };
  }
};
  

 // Actualizar el carrito con un arreglo de productos
export const updateCartProducts = async (req, res) => {
  const cartId = req.params.cid;
  const { products } = req.body;

  try {
    const updatedCart = await cartModel.findByIdAndUpdate(cartId, { products }, { new: true });
    res.json({ message: "Carrito actualizado exitosamente", cart: updatedCart });
  } catch (error) {
    console.error("Error al actualizar el carrito:", error);
    res.status(500).json({ message: "Error al actualizar el carrito" });
  }
};

// Actualizar la cantidad de un producto en el carrito
export const updateProductQuantity = async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const { quantity } = req.body;

  try {
    const updatedCart = await cartModel.findOneAndUpdate(
      { _id: cartId, "products.product": productId },
      { $set: { "products.$.quantity": quantity } },
      { new: true }
    );

    if (updatedCart) {
      res.json({ message: "Cantidad del producto actualizada exitosamente", cart: updatedCart });
    } else {
      res.status(404).json({ message: "No se encontró el carrito o el producto" });
    }
  } catch (error) {
    console.error("Error al actualizar la cantidad del producto en el carrito:", error);
    res.status(500).json({ message: "Error al actualizar la cantidad del producto en el carrito" });
  }
};

