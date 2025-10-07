'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class medsos extends Model {
    static associate(models) {
      medsos.belongsTo(models.umkm, { foreignKey: 'medsos_id' });
    }
  }
  medsos.init({
    umkm_id: DataTypes.INTEGER,
    username: DataTypes.STRING,
    platform: DataTypes.STRING,
    url: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'medsos',
    paranoid: true,
  });
  return medsos;
};