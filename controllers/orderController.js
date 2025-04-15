import asyncHandler from 'express-async-handler';
import {Order, OrderItem} from '../models/orderModel.js';
import User from '../models/User.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
        // shippingAddressCity,
        // shippingAddressPostalCode,
        // shippingAddressCountry,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice
	} = req.body;

    const {
        address,
        city,
        postalCode,
        country
      } = shippingAddress;

	if (!orderItems || orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items');
	}

    // if (!shippingAddress || !shippingAddressCity || !shippingAddressPostalCode || !shippingAddressCountry) {
    //     res.status(400);
    //     throw new Error('All shipping address fields are required');
    // }

    if (!shippingAddress || !address || !city || !postalCode || !country) {
        res.status(400);
        throw new Error('All shipping address fields are required');
    }      

	const newOrder = await Order.create({
		userId: req.user.id,
        shippingAddress: address,
        shippingAddressCity: city,
        shippingAddressPostalCode: postalCode,
        shippingAddressCountry: country,
        // shippingAddressCity,
        // shippingAddressPostalCode,
        // shippingAddressCountry,
		// orderItems, // this should be associated through OrderItems model if normalized
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
        isPaid: false, // default is unpaid
        isDelivered: false // default is not delivered
	});

	const orderItemsData = orderItems.map(item => ({
        orderId: newOrder.id,
        productId: item.productId,
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price
    }));

    try {
		// Bulk insert the order items
		await OrderItem.bulkCreate(orderItemsData);
	} catch (error) {
		res.status(500);
		throw new Error('Error while creating order items');
	}

	// Respond with the created order
	res.status(201).json(newOrder);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findByPk(req.params.id, {
		include: [{ model: User, attributes: ['name', 'email'] },
    { model: OrderItem } ]
	});

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findByPk(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = new Date();
		order.paymentResultId = req.body.id;
        order.paymentResultStatus = req.body.status;
        order.paymentResultUpdateTime = req.body.update_time;
        order.paymentResultEmailAddress = req.body.payer.email_address;

		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.findAll({
		where: { userId: req.user.id }
	});
	res.json(orders);
});

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.findAll({
		include: [{ model: User, attributes: ['id', 'name'] }]
	});
	res.json(orders);
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findByPk(req.params.id);

	if (order) {
		order.isDelivered = true;
		order.deliveredAt = new Date();

		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

export {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	getMyOrders,
	getOrders,
	updateOrderToDelivered
};