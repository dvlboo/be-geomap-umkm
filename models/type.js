'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class type extends Model {
    static associate(models) {
      type.belongsToMany(models.umkm, { 
        through: models.umkm_type,
        foreignKey: 'type_id',
        as: 'umkms'
      })
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