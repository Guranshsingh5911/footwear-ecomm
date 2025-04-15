import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import productRoutes from './routes/productRoutes.js';
import authRoute from './routes/Auth/auth.js';
import orderRoutes from './routes/orderRoutes.js';

import dbConnection from './config/database.js';

const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to backend application.' });
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

app.use('/api/users', authRoute);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

app.get('/api/config/paypal', (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID);
});

try {
	await dbConnection.sync({ force: false });
	console.log('Connection has been established successfully.');
} catch (error) {
	console.error('Unable to connect to the database:', error);
}

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});