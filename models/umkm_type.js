'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class umkm_type extends Model {
    static associate(models) {
      umkm_type.belongsTo(models.umkm, { foreignKey: 'umkm_id', as: 'umkm' })
      umkm_type.belongsTo(models.type, { foreignKey: 'type_id', as: 'type' })
    }
  }
  umkm_type.init({
    umkm_id: { 
      type: DataTypes.INTEGER, 
      references: { model: 'umkms', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    type_id: { 
      type: DataTypes.INTEGER, 
      references: { model: 'types', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'umkm_type',
    paranoid: true,
  });
  return umkm_type;
};