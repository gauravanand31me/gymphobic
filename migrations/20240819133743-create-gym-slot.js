'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GymSlots', {
      gym_slot_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
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
      slot_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Slots',
          key: 'slot_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cost: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true, // Default to true
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
    await queryInterface.dropTable('GymSlots');
  }
};
