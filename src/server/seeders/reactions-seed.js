module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('CommentReactions', 'CommentReactions_reactionId_commentId_key');

    await queryInterface.bulkInsert(
      'Reaction',
      [
        'LAUGHING_WITH_TEARS',
        'CRYING_FACE',
        'SCREAMING_FACE',
        'FIRE',
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
