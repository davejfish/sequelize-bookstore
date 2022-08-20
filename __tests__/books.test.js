const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/models');


describe('books routes', () => {
  let books, authors;
  beforeEach(async () => {
    const queryInterface = db.sequelize.getQueryInterface();
    await queryInterface.bulkDelete('books_authors', null, {});
    await queryInterface.bulkDelete('books', null, {});
    await queryInterface.bulkDelete('authors', null, {});
    // await db.sequelize.sync({ force: true });
    try {

      books = await db.books.bulkCreate([
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

      authors = await db.authors.bulkCreate([
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
    
      await db.books_authors.bulkCreate([
        {
          book_id: books[0].id,
          author_id: authors[2].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          book_id: books[1].id,
          author_id: authors[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          book_id: books[1].id,
          author_id: authors[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          book_id: books[2].id,
          author_id: authors[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          book_id: books[2].id,
          author_id: authors[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          book_id: books[3].id,
          author_id: authors[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          book_id: books[3].id,
          author_id: authors[1].id,
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
      id: expect.any(String),
      title: expect.any(String),
      genre: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it('#GET /api/v1/books/:id should return a book with nested authors', async () => {
    const response = await request(app).get(`/api/v1/books/${books[1].id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      title: 'big book',
      genre: 'serious',
      authors: [
        {
          id: expect.any(String),
          first_name: 'bill',
          last_name: 'preston',
        },
        {
          id: expect.any(String),
          first_name: 'ted',
          last_name: 'logan'
        },
      ]
    });
  });

  it('#POST /api/v1/books/create should add a new book with authors', async () => {
    const response = await request(app).post('/api/v1/books/create').send({
      title: 'green book',
      genre: 'mystery',
      authors: [
        { first_name: 'shan', last_name: 'hathaway' },
        { first_name: 'biggie', last_name: 'smalls' },
      ],
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'book added',
      content: expect.any(Object),
      authors: expect.any(Array),
    });
    
  });

  it('#GET /api/v1/authors should return a list of authors', async () => {
    const response = await request(app).get('/api/v1/authors');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  });

  it('#GET /api/v1/authors/:id should return an author with books detail', async () => {
    const response = await request(app).get(`/api/v1/authors/${authors[0].id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      first_name: 'bill',
      last_name: 'preston',
      books: [
        { id: expect.any(String), title: 'big book', genre: 'serious' },
        { id: expect.any(String), title: 'small book', genre: 'philosophical' },
        { id: expect.any(String), title: 'old book', genre: 'comic' },
      ],
    });
  });
  
  it('#POST /api/v1/authors/create should add a new author with books', async () => {
    const response = await request(app).post('/api/v1/authors/create').send({
      first_name: 'shan',
      last_name: 'hathaway',
      books: [
        { title: 'shans book', genre: 'fantasy' },
        { title: 'tall book', genre: 'comedy' },
      ]
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'author added',
      content: expect.any(Object),
      books: expect.any(Array),
    });
    
  });

});
