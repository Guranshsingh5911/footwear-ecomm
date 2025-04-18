import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const dbConnection = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    define: {
        timestamps: true, // enable timestamps globally
    },
    logging: false, // disable logging
});

export default dbConnection;