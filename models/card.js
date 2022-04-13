'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    static associate(models) {
      // Cards belong to Sets, Decks, and Collections
      models.Card.belongsTo(models.Set)
      models.Card.belongsTo(models.Deck)
      models.Card.belongsTo(models.Collection)
    }
  }
  Card.init({
    cardImage: {
      type: DataTypes.STRING,
      notNull: true,
    },
    name: {
      type: DataTypes.STRING,
      notNull: true,
    },
    rarity: {
      type: DataTypes.STRING,
      notNull: true,
    },
    rarityShorthand: {
      type: DataTypes.STRING,
      notNull: true,
    },
    type: {
      type: DataTypes.STRING,
      notNull: true,
    },
    faction: {
      type: DataTypes.STRING,
      notNull: true,
    },
    characteristics: {
      type: DataTypes.STRING,
      notNull: true,
    },
    effect: {
      type: DataTypes.STRING,
      notNull: true,
      len: [0,500],
    },
    damage: {
      type: DataTypes.INTEGER,
      notNull: true,
    },
    power: {
      type: DataTypes.INTEGER,
      notNull: true,
    },
    support: {
      type: DataTypes.INTEGER,
      notNull: true,
    },
    setId: {
      type: DataTypes.INTEGER,
      notNull: false,
    },
    collectionId: {
      type: DataTypes.INTEGER,
      notNull: false,
    },
    deckId: {
      type: DataTypes.INTEGER,
      notNull: false,
    },
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};