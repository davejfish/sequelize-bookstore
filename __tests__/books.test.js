const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/models');


describe('books routes', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    try {

      await db.books.bulkCreate([
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

      await db.authors.bulkCreate('authors', [
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
      
      await db.books_authors.bulkCreate('books_authors', [
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
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  it('#GET /api/v1/books should return a list of books', async () => {
    const response = await request(app).get('/api/v1/books');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(4);
    expect(response.body[0]).toEqual({
      id: 1,
      title: 'super book',
      genre: 'funny',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  // it('#GET /api/v1/books/:id should return a book with nested authors', async () => {
  //   const response = await request(app).get('/api/v1/books/2');
  //   expect(response.status).toBe(200);
  //   expect(response.body).toEqual({
  //     id: 2,
  //     title: 'big book',
  //     genre: 'serious',
  //     authors: [
  //       {
  //         id: 2,
  //         first_name: 'bill',
  //         last_name: 'preston',
  //       },
  //       {
  //         id: 2,
  //         first_name: 'ted',
  //         last_name: 'logan'
  //       },
  //     ]
  //   });
  // });
});
