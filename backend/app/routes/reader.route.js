const express = require("express");
const readerController = require("../controllers/reader.controller");

const router = express.Router();

router.route("/")
    .get(readerController.findAll)
    .post(readerController.create)
    .delete(readerController.deleteAll);

router.route("/:id")
    .get(readerController.findOne)
    .put(readerController.update)
    .delete(readerController.delete);

module.exports = router;
