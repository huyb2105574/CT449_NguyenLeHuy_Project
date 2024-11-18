const express = require("express");
const readerController = require("../controllers/reader.controller");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();

router.route("/login")
    .post(readerController.login);

router.route("/")
    .get(auth, readerController.findAll) 
    .post(readerController.create) 
    .delete(auth, readerController.deleteAll); 

router.route("/:id")
    .get(auth, readerController.findOne) 
    .put(auth, readerController.update)
    .delete(auth, readerController.delete); 

module.exports = router;
