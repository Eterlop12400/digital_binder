'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cardImage: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      rarity: {
        type: Sequelize.STRING
      },
      rarityShorthand: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      faction: {
        type: Sequelize.STRING
      },
      characteristics: {
        type: Sequelize.STRING
      },
      effect: {
        type: Sequelize.STRING(500)
      },
      damage: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      power: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      support: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      collectionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      deckId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cards');
  }
};