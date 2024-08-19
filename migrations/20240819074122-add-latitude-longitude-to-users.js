'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'user_latitude', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'user_longitude', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'user_latitude');
    await queryInterface.removeColumn('Users', 'user_longitude');
  }
};
