// models/gymReview.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const GymReview = sequelize.define('GymReview', {
    review_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    gym_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Gyms',
        key: 'gym_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    user_rating_star: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    user_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    agree_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    disagree_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    review_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {});

  // Associations can be defined here
  GymReview.associate = function(models) {
    GymReview.belongsTo(models.Gym, { foreignKey: 'gym_id', as: 'gym' });
    GymReview.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return GymReview;
};
