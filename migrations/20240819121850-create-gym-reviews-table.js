'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('GymReviews', {
      review_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      gym_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Gyms',
          key: 'gym_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_rating_star: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      user_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      agree_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      disagree_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      review_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('GymReviews');
  }
};
