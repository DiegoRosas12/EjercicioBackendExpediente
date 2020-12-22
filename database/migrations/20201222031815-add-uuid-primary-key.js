'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Expedientes', 'id')
    return queryInterface.addColumn('Expedientes','uuid', {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Expedientes', 'uuid')
    return queryInterface.addColumn('Expedientes','id', {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    })
  }
};
