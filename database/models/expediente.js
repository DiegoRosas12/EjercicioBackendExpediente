'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expediente extends Model {

    static associate(models) {
      // define association here
    }
  };
  Expediente.init({
    nombre: DataTypes.STRING,
    ultimaConsulta: DataTypes.DATE,
    sangre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Expediente',
  });
  return Expediente;
};