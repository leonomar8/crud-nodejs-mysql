const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Ensure that the ID is auto-incremented
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
}, {
  timestamps: false, // Disable timestamps to prevent automatic `createdAt` and `updatedAt` columns
  tableName: 'users', // Use the existing 'users' table in your DB
});

// Sync the model with the database to create the table (if it doesn't exist)
User.sync()
  .then(() => {
    console.log('Users table has been created or already exists.');
  })
  .catch((err) => {
    console.error('Error syncing users table:', err);
  });

module.exports = User;
