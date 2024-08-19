'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Followers', {
      follow_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
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
      follower_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      followed_on: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      is_blocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
      },
    });

    // Add unique constraint on user_id and follower_id
    await queryInterface.addConstraint('Followers', {
      fields: ['user_id', 'follower_id'],
      type: 'unique',
      name: 'unique_user_follower'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove unique constraint
    await queryInterface.removeConstraint('Followers', 'unique_user_follower');
    
    // Drop the Followers table
    await queryInterface.dropTable('Followers');
  }
};
