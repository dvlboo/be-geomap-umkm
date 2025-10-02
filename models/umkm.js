'use strict';
const {
  Model,
  ARRAY
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class umkm extends Model {
    static associate(models) {
      umkm.belongsTo(models.type, { foreignKey: 'type_id', as: 'type' }),
      umkm.hasMany(models.medsos, { foreignKey: 'medsos_id', as: 'medsos' }),
      umkm.hasMany(models.payment, { foreignKey: 'payment_id', as: 'payment' }),
      umkm.hasMany(models.order, { foreignKey: 'order_id', as: 'order' }),
      umkm.hasMany(models.location, { foreignKey: 'location_id', as: 'location' })
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
    place_pict: DataTypes.TEXT(),
    product_pict: DataTypes.TEXT(),
    classification: DataTypes.STRING,
    location_id: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    payment_id: DataTypes.INTEGER,
    medsos_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'umkm',
    paranoid: true,
  });
  return umkm;
};