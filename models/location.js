'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class location extends Model {
    static associate(models) {
      location.hasOne(models.umkm, { foreignKey: 'location_id' })
    }
  }
  location.init({
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'location',
    paranoid: true,
  });
  return location;
};