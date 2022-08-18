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

    await queryInterface.bulkInsert('authors', [
      {
        first_name: 'bill',
        last_name: 'preston',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: 'ted',
        last_name: 'logan',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: 'dave',
        last_name: 'fisher',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('books', [
      {
        title: 'super book',
        genre: 'funny',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'big book',
        genre: 'serious',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'small book',
        genre: 'philosophical',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'old book',
        genre: 'comic',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('books_authors', [
      {
        book_id: '1',
        author_id: '3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        book_id: '2',
        author_id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        book_id: '2',
        author_id: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        book_id: '3',
        author_id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        book_id: '3',
        author_id: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        book_id: '3',
        author_id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        book_id: '4',
        author_id: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
