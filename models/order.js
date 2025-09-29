'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    static associate(models) {
      order.belongsTo(models.umkm, { foreignKey: 'order_id' });
    }
  }
  order.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'order',
    paranoid: true,
  });
  return order;
};