// models/gym.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Gym = sequelize.define('Gym', {
    gym_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    gym_latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    gym_longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    gym_register_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    gym_contact_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});


  Gym.associate = function(models) {
    // Define association with GymImage
    Gym.hasMany(models.GymImage, { foreignKey: 'gym_id', as: 'images' });
  };

  return Gym;
};
