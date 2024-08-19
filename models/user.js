// models/user.js
'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4, 
      allowNull: false,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      defaultValue() {
        return `user_${Math.floor(Math.random() * 1000000)}`;
      },
    },
    user_first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_mobile_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_otp_verification: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    user_register_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    user_current_location: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    user_latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    user_longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  }, {});

  User.associate = function(models) {
    User.hasOne(models.UserProfile, { foreignKey: 'user_id', as: 'userProfile' });
  };

  return User;
};
