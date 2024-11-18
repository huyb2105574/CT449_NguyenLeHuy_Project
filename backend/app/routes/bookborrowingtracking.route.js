const express = require("express");
const bookborrowingtrackingController = require("../controllers/bookborrowingtracking.controller");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();


router.route("/")
    .get(auth,bookborrowingtrackingController.findAll)
    .post(bookborrowingtrackingController.create)
    .delete(auth,bookborrowingtrackingController.deleteAll);

router.route("/:id")
    .get(auth,bookborrowingtrackingController.findOne)
    .put(auth,bookborrowingtrackingController.update)
    .delete(auth,bookborrowingtrackingController.delete);

module.exports = router;
