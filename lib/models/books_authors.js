'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class books_authors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    //   books_authors.hasMany(models.books, {
    //     foreignKey: 'id',
    //   });
    //   books_authors.hasMany(models.authors, {
    //     foreignKey: 'id',
    //   });
    // }
  }
  books_authors.init({
    book_id: DataTypes.BIGINT,
    author_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'books_authors',
  });
  return books_authors;
};
