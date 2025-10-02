'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    static associate(models) {
      payment.belongsTo(models.umkm, { foreignKey: 'payment_id' });
    }
  }
  payment.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'payment',
    paranoid: true,
  });
  return payment;
};