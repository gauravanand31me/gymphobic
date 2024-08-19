// migrations/xxxxxx-create-gymReviewComment.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GymReviewComments', {
      comment_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      gym_review_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'GymReviews', // This should match your GymReview model's table name
          key: 'review_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users', // This should match your User model's table name
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      agree: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: null,
      },
      disagree: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: null,
      },
      user_comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      comment_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GymReviewComments');
  }
};
