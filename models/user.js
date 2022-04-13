'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Users have many Collections and Decks
      models.User.hasMany( models.Collection, { foreignKey: 'userId' })
      models.User.hasMany( models.Deck)
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      notNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      notNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      len: [0,500],
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      notNull: true,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};