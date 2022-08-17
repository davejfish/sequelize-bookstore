// const request = require('supertest');
// const app = require('../lib/app');
const db = require('../lib/models');
describe('backend-express-template routes', () => {
  beforeEach(async () => {
    await db.sequelize.sync({ force: true });
  });
  afterAll(async () => {
    await db.sequelize.close();
  });
  it('example test - delete me!', () => {
    expect(1).toEqual(1);
  });
});
