const { Router } = require('express');
const router = Router();
const db = require('../models');

module.exports = router 
  .post('/create', async (req, res, next) => {
    try {
      const response = await db.books.create(req.body);
      res.json({
        message: 'book added',
        contents: response.body,
      });
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const response = await db.books.findAll();
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const response = await db.books.findByPk(req.params.id, {
        attributes: ['id', 'title', 'genre'],
        include: [{
          model: db.authors,
          as: 'authors',
          attributes: ['id', 'first_name', 'last_name'],
          through: {
            attributes: [],
          }
        }],
        foreignKey: 'authors_id'
      });
      res.json(response);
    } catch (e) {
      next(e);
    }
  });

