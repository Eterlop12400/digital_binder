'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [{
      id: 1,
      firstName: 'John',
      lastName: 'Doe ',
      bio: 'Hello, my name is John Doe and this is my profile! ',
      email: 'jdoe@yahoo.com',
      password: '$2b$10$ZqWE1Oekt.0Ad.KzDCgyquNEoq9ybnvNLVWmeulMNWrsduxPHF1ba',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()'),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
