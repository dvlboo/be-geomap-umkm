'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class umkm extends Model {
    static associate(models) {
      umkm.hasMany(models.medsos, { foreignKey: 'umkm_id', as: 'medsos' }),
      umkm.belongsTo(models.location, { foreignKey: 'location_id', as: 'location' })
    }
  }
  umkm.init({
    name: DataTypes.STRING,
    owner: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    regency: DataTypes.STRING,
    story: DataTypes.TEXT(),
    year: DataTypes.INTEGER,
    place_pict: DataTypes.TEXT(),
    product_pict: DataTypes.TEXT(),
    classification: DataTypes.STRING,
    type: DataTypes.STRING,
    order: DataTypes.STRING,
    payment: DataTypes.STRING,
    location_id: DataTypes.INTEGER,
    slug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'umkm',
    paranoid: true,
  });
  return umkm;
};