import fs from 'fs';
import path from 'path';
import { addProduct } from '../models/productModel.js';

// Read the products.json file
const productsFilePath = path.resolve('./models/products.json');
const productsData = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// Function to seed the database with products
const seedDatabase = async () => {
    try {
        for (const product of productsData) {
            await addProduct(product);
            console.log(`Inserted product: ${product.name}`);
        }
        console.log('Database seeding completed.');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

// Run the seed function
seedDatabase();