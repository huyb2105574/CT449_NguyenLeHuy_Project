const express = require("express");
const bookborrowingtrackingController = require("../controllers/bookborrowingtracking.controller");

const router = express.Router();

router.route("/")
    .get(bookborrowingtrackingController.findAll)
    .post(bookborrowingtrackingController.create)
    .delete(bookborrowingtrackingController.deleteAll);

router.route("/:id")
    .get(bookborrowingtrackingController.findOne)
    .put(bookborrowingtrackingController.update)
    .delete(bookborrowingtrackingController.delete);

module.exports = router;
