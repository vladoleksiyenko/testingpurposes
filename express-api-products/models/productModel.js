import db from '../models/productsDb.js';

// Function to get all products
export async function getProducts() {
    const [products] = await db.execute('SELECT * FROM products');
    return products;
}

// Function to get a product by its ID
export async function getProductById(id) {
    const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
}

// Function to get products by category
export async function getCategory(category) {
    const [rows] = await db.execute('SELECT * FROM products WHERE category = ?', [category]);
    return rows;
}

// Function to create a new product
export async function addProduct(product) {
    const { name, category, price, description, features, image } = product;

    // Check for undefined values and replace with null
    const values = [name, category, price, description, JSON.stringify(features), image].map(value => value === undefined ? null : value);

    const [result] = await db.execute(
        'INSERT INTO products (name, category, price, description, features, image) VALUES (?, ?, ?, ?, ?, ?)',
        values
    );
    return { id: result.insertId, name, category, price, description, features, image };
}

//Function to update an existing product by its ID
export async function updateProduct(id, updatedProduct) {
    const { name, category, price, description, features, image } = updatedProduct;
    const [result] = await db.execute(
        'UPDATE products SET name = ?, category = ?, price = ?, description = ?, features = ?, image = ? WHERE id = ?',
        [name, category, price, description, JSON.stringify(features), image, id]
    );
    if (result.affectedRows > 0) {
        return { id, name, category, price, description, features, image };
    }
    return null;
}

// Function to delete a product by its ID
export async function deleteProduct(id) {
    const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
        return { id };
    }
    return null;
}