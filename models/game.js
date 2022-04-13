'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      // Games have many Sets
      models.Game.hasMany(models.Set)
    }
  }
  Game.init({
    gameImage: {
      type: DataTypes.STRING,
      notNull: true,
    },
    name: {
      type: DataTypes.STRING,
      notNull: true,
    },
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};