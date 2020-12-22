'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class alergia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  alergia.init({
    nombre: DataTypes.STRING,
    medicamento: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'alergia',
  });
  return alergia;
};