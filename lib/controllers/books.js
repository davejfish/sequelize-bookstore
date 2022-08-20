const { Router } = require('express');
const router = Router();
const db = require('../models');

module.exports = router 
  .post('/create', async (req, res, next) => {
    try {
      const data = [];
      const book = await db.books.create(req.body);
      if (req.body.authors) {
        for (const author of req.body.authors) {
          let sakka = await db.authors.findOne({ where: { 
            first_name: author.first_name,
            last_name: author.last_name
          } });
          if (sakka) {
            await db.books_authors.create({
              book_id: book.id,
              author_id: sakka.id,
            });
            data.push(sakka);
          }
          else {
            sakka = await db.authors.create({
              first_name: author.first_name,
              last_name: author.last_name,
            });
            await db.books_authors.create({
              book_id: book.id,
              author_id: sakka.id,
            });
            data.push(sakka);
          }
        }
      }
      res.json({
        message: 'book added',
        content: book,
        authors: data,
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

