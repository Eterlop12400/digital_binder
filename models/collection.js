'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    static associate(models) {
      // Collections belong to Users and Collections have many Cards
      models.Collection.belongsTo( models.User )
      models.Collection.hasMany( models.Card, { foreignKey: 'collectionId' } )
    }
  }
  Collection.init({
    name: {
      type: DataTypes.STRING,
      notNull: true,
    },
    description: {
      type: DataTypes.STRING,
      notNull: false,
      len: [0,500],
    },
    color: {
      type: DataTypes.STRING,
      notNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      notNull: true,
    },
  }, {
    sequelize,
    modelName: 'Collection',
  });
  return Collection;
};