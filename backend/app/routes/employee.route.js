const express = require("express");
const employeeController = require("../controllers/employee.controller");

const router = express.Router();

router.route("/")
    .get(employeeController.findAll)
    .post(employeeController.create)
    .delete(employeeController.deleteAll);

router.route("/:id")
    .get(employeeController.findOne)
    .put(employeeController.update)
    .delete(employeeController.delete);

module.exports = router;
