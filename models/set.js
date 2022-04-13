'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Set extends Model {
    static associate(models) {
      // Sets belong to Games and Sets have many Cards
      models.Set.belongsTo(models.Game)
      models.Set.hasMany(models.Card, { foreignKey: 'setId' })
    }
  }
  Set.init({
    setImage: {
      type: DataTypes.STRING,
      notNull: true,
    },
    name: {
      type: DataTypes.STRING,
      notNull: true,
    },
    gameId: {
      type: DataTypes.INTEGER,
      notNull: true,
    },
  }, {
    sequelize,
    modelName: 'Set',
  });
  return Set;
};