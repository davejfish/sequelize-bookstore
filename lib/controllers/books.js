const { Router } = require('express');
const db = require('../models');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const response = await db.books.findAll();
      res.json(response);
    } catch (e) {
      next(e);
    }
  });
