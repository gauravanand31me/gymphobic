'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_name: {
        type: Sequelize.STRING
      },
      user_first_name: {
        type: Sequelize.STRING
      },
      user_last_name: {
        type: Sequelize.STRING
      },
      user_mobile_number: {
        type: Sequelize.STRING
      },
      user_otp_verification: {
        type: Sequelize.STRING
      },
      user_is_verified: {
        type: Sequelize.BOOLEAN
      },
      user_register_date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};