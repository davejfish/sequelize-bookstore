const { Router } = require('express');
const db = require('../models');
const router = Router();

module.exports = router
  .post('/create', async (req, res, next) => {
    try {
      // add a conditional to check for req.body.books, update
      // books_authors with info before handling adding author
      const response = await db.authors.create(req.body);
      res.json({
        message: 'author added',
        author: response.body,
      });
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const response = await db.authors.findByPk(req.params.id, {
        attributes: ['id', 'first_name', 'last_name'],
        foreignKey: 'books_id',
        include: [{
          model: db.books,
          as: 'books',
          attributes: ['id', 'title', 'genre'],
          through: {
            attributes: []
          }
        }]
      });
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const response = await db.authors.findAll();
      res.json(response);
    } catch (e) {
      next(e);
    }
  });

