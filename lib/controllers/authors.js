const { Router } = require('express');
const db = require('../models');
const router = Router();

module.exports = router
  .post('/create', async (req, res, next) => {
    try {
      const author = await db.authors.create(req.body);
      if (req.body.books) {
        for (const book of req.body.books) {
          let hon = await db.books.findOne({ where: { title: book.title } });
          if (hon) {
            await db.books_authors.create({
              book_id: hon.id,
              author_id: author.id
            });
          }
          else {
            hon = await db.books.create({
              title: book.title,
              genre: book.genre,
            });
            await db.books_authors.create({
              book_id: hon.id,
              author_id: author.id
            });
          }
        }
      }
      res.json({
        message: 'author added',
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

