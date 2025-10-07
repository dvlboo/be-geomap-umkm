'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class umkm extends Model {
    static associate(models) {
      umkm.belongsToMany(models.type, { 
        through: models.umkm_type,
        foreignKey: 'type_id', 
        as: 'types'
       }),
      umkm.hasMany(models.medsos, { foreignKey: 'medsos_id', as: 'medsos' }),
      umkm.hasMany(models.order, { foreignKey: 'order_id', as: 'order' }),
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
    order: DataTypes.STRING,
    payment: DataTypes.STRING,
    location_id: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER,
    medsos_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'umkm',
    paranoid: true,
  });
  return umkm;
};