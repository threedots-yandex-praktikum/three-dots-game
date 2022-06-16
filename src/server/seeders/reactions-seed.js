module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Reaction',
      [
        'SLIGHTLY_SMILING_FACE',
        'LAUGHING_WITH_TEARS',
        'CRYING_FACE',
        'SCREAMING_FACE',
        'THUMBS_UP',
        'THUMBS_DOWN',
        'FIRE',
        'PLUS',
        'MINUS',
      ]
        .map((code, index) => ({
          id: index + 1,
          code,
        })),
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reaction', null, {});
  },
};
