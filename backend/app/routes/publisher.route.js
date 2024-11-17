const express = require("express");
const publisherController = require("../controllers/publisher.controller");

const router = express.Router();

router.route("/")
    .get(publisherController.findAll)
    .post(publisherController.create)
    .delete(publisherController.deleteAll);

router.route("/:id")
    .get(publisherController.findOne)
    .put(publisherController.update)
    .delete(publisherController.delete);

module.exports = router;
