import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

// read in our environment variables from config.env
dotenv.config({
    path: './config.env'
});

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const config = {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
};

const connection = await mysql.createConnection(config);
console.log("Connected to the database");

export default connection;