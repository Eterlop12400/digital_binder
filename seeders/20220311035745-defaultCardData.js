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
    await queryInterface.bulkInsert('Cards', [{
      id: 1,
      cardImage: 'https://i.imgur.com/HDCE7jS.jpg',
      name: 'Raijin Shinobi',
      rarity: 'Super Rare',
      rarityShorthand: 'SR',
      type: 'Base Character',
      faction: 'Guile',
      characteristics: '[Male] [Ninja] [Weapon]',
      effect: 'When this character attacks reveal the top 3 cards of your deck, you may then choose to put a technique card revealed this way into your hand then shuffle the rest of the cards into your deck.',
      damage: 1,
      power: 3,
      support: 0,
      setId: 1,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()'),
    }, {
      id: 2,
      cardImage: 'https://i.imgur.com/fJsynPF.jpg',
      name: 'Two As One',
      rarity: 'Super Rare',
      rarityShorthand: 'SR',
      type: 'Event',
      faction: 'Nautical',
      characteristics: 'n/a',
      effect: 'Choose 1 [Non-Unique] + [Sea Creature] character you control, and flash summon a character with the same name from your hand or deck.',
      damage: 0,
      power: 0,
      support: 0,
      setId: 1,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()'),
    }, {
      id: 3,
      cardImage: 'https://i.imgur.com/v37M9vw.jpg',
      name: 'Riza the Water Dragon',
      rarity: 'Rare',
      rarityShorthand: 'R',
      type: 'Base Character',
      faction: 'Nautical',
      characteristics: '[Unknown] [Sea Creature]',
      effect: 'This character cannot be flash summoned, and this character can only be deployed by abolishing 2 [Sea Creature] characters you control. All non-[Sea Creature] characters battling against this characters squad loses 1 power and 1 support until the end phase.',
      damage: 1,
      power: 3,
      support: 1,
      setId: 1,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()'),
    }, {
      id: 4,
      cardImage: 'https://i.imgur.com/CU9QOgv.jpg',
      name: 'Blight, Spirit Stealer',
      rarity: 'Common',
      rarityShorthand: 'C',
      type: 'Base Character',
      faction: 'Guile',
      characteristics: '[Female] [Rogue] [Weapon]',
      effect: 'When this character earns a victory, remove 1 spirit counter from your opponents field (if possible), then place 1 spirit counter on this character.',
      damage: 1,
      power: 3,
      support: 1,
      setId: 1,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()'),
    }, {
      id: 5,
      cardImage: 'https://i.imgur.com/vicC3Uk.jpg',
      name: 'Sir Bill the Elite Warrior',
      rarity: 'Super Rare',
      rarityShorthand: 'SR',
      type: 'Base Character',
      faction: 'Warrior',
      characteristics: '[Male] [Knight] [Weapon]',
      effect: 'You can only deploy this character while you have 5 or more characters in your discard pile with different names. While this character is on the field all your opponents characters with a power of 3 or less have their effects and abilities negated.',
      damage: 2,
      power: 5,
      support: 0,
      setId: 1,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()'),
    }, {
      id: 6,
      cardImage: 'https://i.imgur.com/vicC3Uk.jpg',
      name: 'Sir Bill the Elite Warrior',
      rarity: 'Super Rare',
      rarityShorthand: 'SR',
      type: 'Base Character',
      faction: 'Warrior',
      characteristics: '[Male] [Knight] [Weapon]',
      effect: 'You can only deploy this character while you have 5 or more characters in your discard pile with different names. While this character is on the field all your opponents characters with a power of 3 or less have their effects and abilities negated.',
      damage: 2,
      power: 5,
      support: 0,
      deckId: 1,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()'),
    }, {
      id: 7,
      cardImage: 'https://i.imgur.com/v37M9vw.jpg',
      name: 'Riza the Water Dragon',
      rarity: 'Rare',
      rarityShorthand: 'R',
      type: 'Base Character',
      faction: 'Nautical',
      characteristics: '[Unknown] [Sea Creature]',
      effect: 'This character cannot be flash summoned, and this character can only be deployed by abolishing 2 [Sea Creature] characters you control. All non-[Sea Creature] characters battling against this characters squad loses 1 power and 1 support until the end phase.',
      damage: 1,
      power: 3,
      support: 1,
      collectionId: 1,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()'),
    }, {
      id: 8,
      cardImage: 'https://i.imgur.com/vicC3Uk.jpg',
      name: 'Sir Bill the Elite Warrior',
      rarity: 'Super Rare',
      rarityShorthand: 'SR',
      type: 'Base Character',
      faction: 'Warrior',
      characteristics: '[Male] [Knight] [Weapon]',
      effect: 'You can only deploy this character while you have 5 or more characters in your discard pile with different names. While this character is on the field all your opponents characters with a power of 3 or less have their effects and abilities negated.',
      damage: 2,
      power: 5,
      support: 0,
      collectionId: 1,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()'),
    }, {
      id: 9,
      cardImage: 'https://i.imgur.com/vicC3Uk.jpg',
      name: 'Sir Bill the Elite Warrior',
      rarity: 'Super Rare',
      rarityShorthand: 'SR',
      type: 'Base Character',
      faction: 'Warrior',
      characteristics: '[Male] [Knight] [Weapon]',
      effect: 'You can only deploy this character while you have 5 or more characters in your discard pile with different names. While this character is on the field all your opponents characters with a power of 3 or less have their effects and abilities negated.',
      damage: 2,
      power: 5,
      support: 0,
      collectionId: 1,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()'),
    }, {
      id: 10,
      cardImage: 'https://i.imgur.com/vicC3Uk.jpg',
      name: 'Sir Bill the Elite Warrior',
      rarity: 'Super Rare',
      rarityShorthand: 'SR',
      type: 'Base Character',
      faction: 'Warrior',
      characteristics: '[Male] [Knight] [Weapon]',
      effect: 'You can only deploy this character while you have 5 or more characters in your discard pile with different names. While this character is on the field all your opponents characters with a power of 3 or less have their effects and abilities negated.',
      damage: 2,
      power: 5,
      support: 0,
      collectionId: 2,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()'),
    },



    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Cards', null, {});
  }
};
