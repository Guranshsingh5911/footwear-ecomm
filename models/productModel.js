// import { DataTypes } from 'sequelize';
// import dbConnection from '../config/database.js';
// import User from './User.js'; // Import the User model
// // Product Model
// const ProductModel = dbConnection.define(
// 	'product_details',
// 	{
// 		userId: {
// 			type: DataTypes.INTEGER, // Use INTEGER for foreign keys
// 			allowNull: false,
// 			references: {
// 				model: User, // Reference to the User model
// 				key: 'id' // Key in User model
// 			}
// 		},
// 		name: {
// 			type: DataTypes.STRING,
// 			allowNull: false
// 		},
// 		image: {
// 			type: DataTypes.STRING,
// 			allowNull: false
// 		},
// 		brand: {
// 			type: DataTypes.STRING,
// 			allowNull: false
// 		},
// 		sex: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 			defaultValue: 'Men'
// 		},
// 		color: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 			defaultValue: 'Black'
// 		},
// 		category: {
// 			type: DataTypes.STRING,
// 			allowNull: false
// 		},
// 		description: {
// 			type: DataTypes.STRING,
// 			allowNull: false
// 		},
// 		rating: {
// 			type: DataTypes.FLOAT,
// 			allowNull: false,
// 			defaultValue: 0
// 		},
// 		numReviews: {
// 			type: DataTypes.INTEGER,
// 			allowNull: false,
// 			defaultValue: 0
// 		},
// 		size: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 			defaultValue: 'M'
// 		},
// 		price: {
// 			type: DataTypes.FLOAT,
// 			allowNull: false,
// 			defaultValue: 0
// 		},
// 		countInStock: {
// 			type: DataTypes.INTEGER,
// 			allowNull: false,
// 			defaultValue: 0
// 		}
// 	},
// 	{
// 		timestamps: true
// 	}
// );

// // Associations (if necessary)
// ProductModel.belongsTo(User, { foreignKey: 'userId' }); // A Product belongs to a User
// User.hasMany(ProductModel, { foreignKey: 'userId' }); // A User can have many Products

// export default ProductModel;

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // assuming sequelize instance is exported from db.js

const Product = sequelize.define(
	'Product',
	{
		userId: {
			type: DataTypes.INTEGER, // Assuming user is a foreign key referencing the User table
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
	},
	{
		timestamps: true
	}
);

const Review = sequelize.define(
	'Review',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		comment: {
			type: DataTypes.STRING,
			allowNull: false
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{
		timestamps: true
	}
);

Product.hasMany(Review, { foreignKey: 'productId' });
Review.belongsTo(Product, { foreignKey: 'productId' });

export { Product, Review };