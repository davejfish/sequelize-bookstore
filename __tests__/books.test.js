const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/models');


describe('books routes', () => {
  beforeEach(async () => {
    // await db.sequelize.sync({ force: true });
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
});
