import { Router } from 'express';
import { returnAllProducts, getProductByID, getProductsByCategory, addNewProduct, updateProductByID, deleteProductByID } from '../controllers/controller.js';

const router = Router();

// Route to get all products
router.get("/", returnAllProducts);

// Route to get a product by its ID
router.get("/:id", getProductByID);

// Route to get products by category
router.get("/category/:category", getProductsByCategory);

// Route to add a new product
router.post("/", addNewProduct);

// Route to update an existing product by its ID
router.put("/:id", updateProductByID); // Updated function name

// Route to delete a product by its ID
router.delete("/:id", deleteProductByID);

export default router;
