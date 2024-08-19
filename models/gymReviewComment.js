// models/gymReviewComment.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const GymReviewComment = sequelize.define('GymReviewComment', {
    comment_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    gym_review_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'GymReviews', // This should match your GymReview model's table name
        key: 'review_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users', // This should match your User model's table name
        key: 'user_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    agree: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null,
    },
    disagree: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null,
    },
    user_comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    comment_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {});

  // Associations can be defined here
  GymReviewComment.associate = function(models) {
    GymReviewComment.belongsTo(models.GymReview, { foreignKey: 'gym_review_id', as: 'review' });
    GymReviewComment.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return GymReviewComment;
};
