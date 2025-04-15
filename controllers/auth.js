import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ where: { email } });

	if (user) {
		const isMatch = await user.matchPassword(password);
		if (isMatch) {
			res.json({
				id: user.id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: generateToken(user.id)
			});
		} else {
			res.status(401);
			throw new Error('Invalid email or password');
		}
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

// @desc    Register new user (isAdmin: true)
// @route   POST /api/users
// @access  Public
const register = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ where: { email } });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await User.create({
		name,
		email,
		password,
		isAdmin: true // Make all users admin
	});

	if (user) {
		res.status(201).json({
			id: user.id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user.id)
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findByPk(req.user.id);

	if (user) {
		res.json({
			id: user.id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findByPk(req.user.id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;

		if (req.body.password) {
			user.password = req.body.password;
			await user.changed('password', true); // Ensure hook runs
		}

		const updatedUser = await user.save();

		res.json({
			id: updatedUser.id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser.id)
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

export { login, register, getUserProfile, updateUserProfile };