'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('expedienteAlergia', 'expedienteId');
    return queryInterface.addColumn('expedienteAlergia', 'uuid', {
      type: Sequelize.UUID
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('expedienteAlergia', 'uuid');
    return queryInterface.addColumn('expedienteAlergia', 'expedienteId', {
      type: Sequelize.UUID
    });
  }
};
