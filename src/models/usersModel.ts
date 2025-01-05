import { DataTypes } from 'sequelize';
import sequelize from '../db'; // Import the sequelize instance from db.ts

// Define the User model
const UsersModel = sequelize.define('auth', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { UsersModel };
