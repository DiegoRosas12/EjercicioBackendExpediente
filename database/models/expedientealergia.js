'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class expedienteAlergia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  expedienteAlergia.init({
    expedienteId: DataTypes.UUID,
    alergiaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'expedienteAlergia',
  });
  return expedienteAlergia;
};