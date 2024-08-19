// models/gymImage.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const GymImage = sequelize.define('GymImage', {
    image_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    gym_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Gyms', // Reference to the Gyms table
        key: 'gym_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    upload_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  }, {});

  // Associations can be defined here
  GymImage.associate = function(models) {
    GymImage.belongsTo(models.Gym, { foreignKey: 'gym_id', as: 'gym' });
  };

  return GymImage;
};
