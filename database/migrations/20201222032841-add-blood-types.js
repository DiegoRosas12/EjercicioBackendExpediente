'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Expedientes', 'sangre', {
      type: Sequelize.STRING
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Expedientes', 'sangre');
  }
};
