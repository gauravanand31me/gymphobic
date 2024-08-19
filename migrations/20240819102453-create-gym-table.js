'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Gyms', {
      gym_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      gym_latitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      gym_longitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      gym_register_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      gym_contact_number: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('Gyms');
  }
};
