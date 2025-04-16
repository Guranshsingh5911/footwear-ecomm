import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Your Sequelize instance

// Product Model
const Product = sequelize.define('Product', {
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	image: {
		type: DataTypes.STRING,
		allowNull: false
	},
	brand: {
		type: DataTypes.STRING,
		allowNull: false
	},
	sex: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'Men'
	},
	color: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'Black'
	},
	category: {
		type: DataTypes.STRING,
		allowNull: false
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false
	},
	rating: {
		type: DataTypes.FLOAT,
		allowNull: false,
		defaultValue: 0
	},
	numReviews: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	size: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'M'
	},
	price: {
		type: DataTypes.FLOAT,
		allowNull: false,
		defaultValue: 0
	},
	countInStock: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0
	}
}, {
	timestamps: true
});

// Review Model
const Review = sequelize.define('Review', {
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	rating: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	comment: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	productId: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, {
	timestamps: true
});

// Associations
Product.hasMany(Review, {
	foreignKey: 'productId',
	as: 'reviews', // helpful for eager loading
	onDelete: 'CASCADE'
});

Review.belongsTo(Product, {
	foreignKey: 'productId',
	as: 'product'
});

export { Product, Review };
