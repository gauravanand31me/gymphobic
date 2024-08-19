'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      booking_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
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
      gym_slot_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'GymSlots',
          key: 'gym_slot_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      booking_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      booking_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      payment_status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['pending', 'completed', 'failed']],
        },
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookings');
  }
};
