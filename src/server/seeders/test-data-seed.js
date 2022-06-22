module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'User',
      [
        {
          id: 1,
          name: 'user 1',
          theme: 'DARK',
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'user 2',
          theme: 'LIGHT',
          createdAt: new Date().toISOString(),
        },
      ],
    );

    await queryInterface.bulkInsert(
      'Topic',
      [
        {
          id: 1,
          name: 'topic 1',
          status: 0,
          userId: 1,
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'topic 2',
          status: 1,
          userId: 2,
          createdAt: new Date().toISOString(),
        },
      ],
    );

    await queryInterface.bulkInsert(
      'Comment',
      [
        {
          id: 1,
          message: 'comment 1',
          parentId: null,
          userId: 1,
          topicId: 1,
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          message: 'comment 2',
          parentId: null,
          userId: 2,
          topicId: 1,
          createdAt: new Date().toISOString(),
        },
        {
          id: 3,
          message: 'comment 3',
          parentId: null,
          userId: 2,
          topicId: 2,
          createdAt: new Date().toISOString(),
        },
        {
          id: 4,
          message: 'comment 4 to 1',
          parentId: 1,
          userId: 1,
          topicId: 1,
          createdAt: new Date().toISOString(),
        },
        {
          id: 5,
          message: 'comment 5 to 1',
          parentId: 1,
          userId: 2,
          topicId: 1,
          createdAt: new Date().toISOString(),
        },
        {
          id: 6,
          message: 'comment 6 to 4',
          parentId: 4,
          userId: 2,
          topicId: 2,
          createdAt: new Date().toISOString(),
        },
      ],
    );

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

    await queryInterface.bulkInsert(
      'CommentReactions',
      [
        {
          userId: 1,
          commentId: 1,
          reactionId: 4,
        },
        {
          userId: 1,
          commentId: 2,
          reactionId: 5,
        },
        {
          userId: 2,
          commentId: 1,
          reactionId: 2,
        },
        {
          userId: 2,
          commentId: 2,
          reactionId: 4,
        },
      ],
    );

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
    await queryInterface.bulkDelete('CommentReactions', null, {});
    await queryInterface.bulkDelete('Comment', null, {});
    await queryInterface.bulkDelete('Topic', null, {});
    await queryInterface.bulkDelete('Reaction', null, {});
  },
};
