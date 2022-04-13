'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addColumn('Collections', 'userId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      },
       allowNull: true
    })
    queryInterface.addColumn('Decks', 'userId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      },
      allowNull: true
    })
    queryInterface.addColumn('Sets', 'gameId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Games'
        },
        key: 'id'
      },
      allowNull: true
    })
    queryInterface.addColumn('Cards', 'setId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Sets'
        },
        key: 'id'
      },
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Collections', 'userId')
    await queryInterface.removeColumn('Decks', 'userId')
    await queryInterface.removeColumn('Sets', 'gameId')
    await queryInterface.removeColumn('Cards', 'setId')
  }
};
