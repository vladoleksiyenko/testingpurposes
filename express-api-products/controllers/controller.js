import { getProducts, getProductById, getCategory, addProduct, updateProduct, deleteProduct } from '../models/productModel.js';

// Retrieves all products from the database.

export const returnAllProducts = async (req, res) => {
    try {
        const products = await getProducts();
        res.json({
            message: "Products retrieved successfully",
            data: products
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving products",
            error: error.message
        });
    }
};


// Retrieves a single product by its ID.

export const getProductByID = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        const product = await getProductById(id);
        if (product) {
            res.json({
                message: "Product retrieved successfully",
                data: product
            });
        } else {
            res.status(404).json({
                message: "Product not found",
                data: null
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving product",
            error: error.message
        });
    }
};


// Retrieves all produicts under a given category.
 
export const getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category;

        const products = await getCategory(category);
        if (products.length > 0) {
            res.json({
                message: "Category retrieved successfully",
                data: products
            });
        } else {
            res.status(404).json({
                message: "No products found for this category",
                data: null
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving category",
            error: error.message
        });
    }
};




// Adds a new product to the database.
export const addNewProduct = async (req, res) => {
    try {
        // Validate request body
        const { name, category, price, description, features, image } = req.body;
        if (!name || !category || !price || !description || !image) {
            return res.status(400).json({ message: "Missing required product fields" });
        }

        const product = await addProduct(req.body);
        res.status(201).json({
            message: "Product added successfully",
            data: product
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding product",
            error: error.message
        });
    }
};


//Updates an existing product by its ID.
export const updateProductByID = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const updatedProduct = await updateProduct(id, req.body);
        if (updatedProduct) {
            res.json({
                message: "Product updated successfully",
                data: updatedProduct
            });
        } else {
            res.status(404).json({
                message: "Product not found",
                data: null
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error updating product",
            error: error.message
        });
    }
};


// Deletes a product from the database by its ID.
export const deleteProductByID = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const deletedProduct = await deleteProduct(id);
        if (deletedProduct) {
            res.json({
                message: "Product deleted successfully",
                data: deletedProduct
            });
        } else {
            res.status(404).json({
                message: "Product not found",
                data: null
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error deleting product",
            error: error.message
        });
    }
};
