'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class umkm extends Model {
    static associate(models) {
      umkm.belongsToMany(models.type, { foreignKey: 'type_id', as: 'type' }),
      umkm.hasMany(models.productpict, { foreignKey: 'productpict_id', as: 'product_pict' })
    }
  }
  umkm.init({
    name: DataTypes.STRING,
    owner: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    regency: DataTypes.STRING,
    story: DataTypes.TEXT('long'),
    year: DataTypes.INTEGER,
    location: DataTypes.GEOMETRY('POINT'),
    place_pict: DataTypes.TEXT(),
    classification: DataTypes.STRING,
    type_id: DataTypes.INTEGER,
    productpict_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'umkm',
    paranoid: true,
  });
  return umkm;
};