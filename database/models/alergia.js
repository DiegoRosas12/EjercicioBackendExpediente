'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class alergia extends Model {
    static associate(models) {
      models.alergia.belongsToMany(models.Expediente, {
        through: 'expedienteAlergia',
        as: 'alergias',
        foreignKey: 'id',
        otherKey: 'uuid'
      });
    }
  }
  alergia.init(
    {
      nombre: DataTypes.STRING,
      medicamento: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'alergia'
    }
  );
  return alergia;
};
