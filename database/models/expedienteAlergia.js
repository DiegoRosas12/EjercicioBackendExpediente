'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class expedienteAlergia extends Model {
    static associate(models) {
      // define association here
    }
  }
  expedienteAlergia.init(
    {
      uuid: DataTypes.UUID,
      alergiaId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'expedienteAlergia'
    }
  );
  return expedienteAlergia;
};
