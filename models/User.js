import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import dbConnection from '../config/database.js';

const User = dbConnection.define(
	'User',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	},
	{
		timestamps: true
	}
);

// Compare hashed password with entered password
User.prototype.matchPassword = async function (enteredPassword) {
	const isMatch = await bcrypt.compare(enteredPassword, this.password);
	console.log('Password match result:', isMatch);
	return isMatch;
};

// Hash password before saving (on create)
User.beforeCreate(async user => {
	if (user.password) {
		console.log('Password before hashing: ', user.password);
		user.password = await bcrypt.hash(user.password, 10);
		console.log('Password after hashing: ', user.password);
	}
});

// Hash password before updating (if changed)
User.beforeUpdate(async user => {
	if (user.changed('password')) {
		console.log('Password before hashing: ', user.password);
		user.password = await bcrypt.hash(user.password, 10);
		console.log('Password after hashing: ', user.password);
	}
});

export default User;