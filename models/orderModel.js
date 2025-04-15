import { DataTypes } from 'sequelize';
import dbConnection from '../config/database.js';
import User from './User.js'; // Import the User model
import { Product } from './productModel.js'; // Import the Product model

const Order = dbConnection.define(
	'Order',
	{
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User, // Foreign key to the User model
				key: 'id'
			}
		},
		shippingAddress: {
			type: DataTypes.STRING,
			allowNull: false
		},
		shippingAddressCity: {
			type: DataTypes.STRING,
			allowNull: false
		},
		shippingAddressPostalCode: {
			type: DataTypes.STRING,
			allowNull: false
		},
		shippingAddressCountry: {
			type: DataTypes.STRING,
			allowNull: false
		},
		paymentMethod: {
			type: DataTypes.STRING,
			allowNull: false
		},
		paymentResultId: {
			type: DataTypes.STRING,
			allowNull: true
		},
		paymentResultStatus: {
			type: DataTypes.STRING,
			allowNull: true
		},
		paymentResultUpdateTime: {
			type: DataTypes.STRING,
			allowNull: true
		},
		paymentResultEmailAddress: {
			type: DataTypes.STRING,
			allowNull: true
		},
		taxPrice: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: 0.0
		},
		shippingPrice: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: 0.0
		},
		totalPrice: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: 0.0
		},
		isPaid: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		paidAt: {
			type: DataTypes.DATE,
			allowNull: true
		},
		isDelivered: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		deliveredAt: {
			type: DataTypes.DATE,
			allowNull: true
		}
	},
	{
		timestamps: true,
		tableName: 'orders'
	}
);

// Define the relation between Order and User
Order.belongsTo(User, { foreignKey: 'userId' });

// Create an "OrderItems" model to handle the order items separately
const OrderItem = dbConnection.define(
	'OrderItem',
	{
		orderId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Order, // Foreign key to the Order model
				key: 'id'
			}
		},
		productId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Product, // Foreign key to the Product model
				key: 'id'
			}
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		qty: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false
		}
	},
	{
		timestamps: false,
		tableName: 'order_items'
	}
);

// Define the relations between OrderItem and Order/Product
Order.hasMany(OrderItem, { foreignKey: 'orderId', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' }); 
Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' }); // <-- Add this too if you want reverse access

export { Order, OrderItem };