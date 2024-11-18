const express = require("express");
const employeeController = require("../controllers/employee.controller");
const auth = require("../middlewares/auth.middleware");

const router = express.Router();

router.route("/login")
    .post(employeeController.login); 

router.route("/")
    .get(employeeController.findAll)
    .post(employeeController.create)
    .delete(auth, employeeController.deleteAll);

router.route("/:id")
    .get(auth, employeeController.findOne)
    .put(auth, employeeController.update)
    .delete(auth, employeeController.delete);

module.exports = router;
