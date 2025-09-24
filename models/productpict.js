'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productpict extends Model {
    static associate(models) {
      productpict.belongsTo(models.umkm, { foreignKey: 'productpict_id' });
    }
  }
  productpict.init({
    url: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'productpict',
    paranoid: true,
  });
  return productpict;
};