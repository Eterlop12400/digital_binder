'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deck extends Model {
    static associate(models) {
      // Decks belong to many Users and Decks have many Cards
      models.Deck.belongsTo( models.User )
      models.Deck.hasMany( models.Card, { foreignKey: 'deckId'} )
    }
  }
  Deck.init({
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
    modelName: 'Deck',
  });
  return Deck;
};