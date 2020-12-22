'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expediente extends Model {
    static associate(models) {
      models.Expediente.belongsToMany(models.alergia, {
        through: 'expedienteAlergia',
        as: 'alergias',
        foreignKey: 'uuid',
        otherKey: 'alergiaId'
      });
    }
  }
  Expediente.init(
    {
      uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      nombre: DataTypes.STRING,
      ultimaConsulta: DataTypes.DATE,
      sangre: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Expediente'
    }
  );
  return Expediente;
};
