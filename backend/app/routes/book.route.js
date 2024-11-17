
const express = require("express");
const bookController = require("../controllers/book.controller");
const { BookService, uploadImage } = require('../services/book.service');


const router = express.Router();

router.route("/")
    .get(bookController.findAll)
    .post(BookService.uploadImage.single('image'), bookController.create)  
    .delete(bookController.deleteAll);

router.route("/:id")
    .get(bookController.findOne)
    .put(bookController.update)
    .delete(bookController.delete);

module.exports = router;
