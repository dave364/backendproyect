import express from "express";
import { getCarts, getCart, createCart, updateCart, deleteCartProduct, updateCartItem, deleteCart } from "../controllers/cartController.js";

const router = express.Router();

router.get("/", getCarts);
router.get("/:cid", getCart);
router.post("/", createCart);
router.put("/:cid", updateCart);
router.delete("/:cid/products/:pid", deleteCartProduct);
router.put("/:cid/products/:pid", updateCartItem);
router.delete("/:cid", deleteCart);

export default router;
