const express = require('express');
const BookResources = express.Router();

// Controllers
const { BookControllers } = require('../controller');
const { ValidatorMiddleware } = require('../helper');

// All user resources
BookResources.get('/', BookControllers.getAll);
BookResources.post('/', ValidatorMiddleware.checkFieldsBook ,BookControllers.create);
BookResources.get('/:guid', BookControllers.getByGuid);
BookResources.put('/:guid', ValidatorMiddleware.checkFieldsBook, BookControllers.update);
BookResources.delete('/:guid', BookControllers.delete);

module.exports = BookResources;
