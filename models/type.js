'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class type extends Model {
    static associate(models) {
      type.hasMany(models.umkm, { foreignKey: 'type_id', as: 'umkm' })
    }
  }
  type.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'type',
    paranoid: true,
  });
  return type;
};