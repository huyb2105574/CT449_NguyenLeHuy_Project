const express = require("express");
const publisherController = require("../controllers/publisher.controller");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();

router.route("/")
    .get(auth,publisherController.findAll)
    .post(auth,publisherController.create)
    .delete(auth,publisherController.deleteAll);

router.route("/:id")
    .get(auth,publisherController.findOne)
    .put(auth,publisherController.update)
    .delete(auth,publisherController.delete);

module.exports = router;
