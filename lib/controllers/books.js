const { Router } = require('express');
const router = Router();
const db = require('../models');

module.exports = router
  .get('/', async (req, res, next) => {
    try {
      const response = await db.books.findAll();
      res.json(response);
    } catch (e) {
      next(e);
    }
  });
