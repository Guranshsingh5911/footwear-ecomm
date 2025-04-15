import asyncHandler from 'express-async-handler';
import { Product, Review } from '../models/productModel.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
	const pageSize = 9;
	const page = Number(req.query.pageNumber) || 1;
	const keyword = req.query.keyword
		? { name: { [Op.iLike]: `%${req.query.keyword}%` } }
		: {};

	const count = await Product.count({ where: keyword });
	const products = await Product.findAll({
		where: keyword,
		limit: pageSize,
		offset: pageSize * (page - 1)
	});

	res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findByPk(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findByPk(req.params.id);

	if (product) {
		await product.destroy();
		res.json({ message: 'Product removed' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc Create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
	const product = await Product.create({
		name: 'Sample name',
		price: 0,
		userId: req.user.id,
		image: '/images/sample.jpg',
		brand: 'Sample brand',
		category: 'Sample category',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample description'
	});

	res.status(201).json(product);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, description, image, brand, category, countInStock } =
		req.body;
	const product = await Product.findByPk(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;

		await product.save();
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc Create new review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;
	const product = await Product.findByPk(req.params.id);

	if (product) {
		const alreadyReviewed = await Review.findOne({
			where: { productId: req.params.id, userId: req.user.id }
		});

		if (alreadyReviewed) {
			res.status(400);
			throw new Error('Product already reviewed');
		}

		const review = await Review.create({
			name: req.user.name,
			rating: Number(rating),
			comment,
			userId: req.user.id,
			productId: req.params.id
		});

		product.numReviews += 1;
		product.rating =
			(product.rating * (product.numReviews - 1) + review.rating) /
			product.numReviews;

		await product.save();
		res.status(201).json({ message: 'Review added' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc Get top rated products
// @route GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
	const products = await Product.findAll({
		order: [['rating', 'DESC']],
		limit: 3
	});

	res.json(products);
});

export {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview
};