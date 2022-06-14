module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'User',
      [
        {
          id: 1,
          name: 'user 1',
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'user 2',
          createdAt: new Date().toISOString(),
        },
      ],
    );

    await queryInterface.bulkInsert(
      'Theme',
      [
        {
          id: 1,
          name: 'theme 1',
          status: 0,
          userId: 1,
        },
        {
          id: 2,
          name: 'theme 2',
          status: 1,
          userId: 2,
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
          userId: 1,
          topicId: 1,
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          message: 'comment 2',
          userId: 2,
          topicId: 1,
          createdAt: new Date().toISOString(),
        },
      ],
    );

    await queryInterface.bulkInsert(
      'Reply',
      [
        {
          id: 1,
          message: 'reply 1',
          userId: 1,
          commentId: 1,
          parentId: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 2,
          message: 'reply 2',
          userId: 2,
          commentId: 2,
          parentId: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 3,
          message: 'reply 3 (reply to reply 2)',
          userId: 1,
          commentId: 2,
          parentId: 2,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    );

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
    await queryInterface.bulkDelete('comment', null, {});
    await queryInterface.bulkDelete('topic', null, {});
    await queryInterface.bulkDelete('reply', null, {});
    await queryInterface.bulkDelete('theme', null, {});
  },
};
