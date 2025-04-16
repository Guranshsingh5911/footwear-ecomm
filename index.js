import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import productRoutes from './routes/productRoutes.js';
import authRoute from './routes/Auth/auth.js';
import orderRoutes from './routes/orderRoutes.js';
import dbConnection from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic API test route
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to backend application.' });
});

// API Routes
app.use('/api/users', authRoute);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

// PayPal config route
app.get('/api/config/paypal', (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID);
});

// Serve static assets (React frontend)
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle any other routes (for React router)
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Connect to database
try {
	await dbConnection.sync({ force: false });
	console.log('✅ Connection has been established successfully.');
} catch (error) {
	console.error('❌ Unable to connect to the database:', error);
}

// Start server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
	console.log(`🚀 Server is running on port ${PORT}.`);
});
