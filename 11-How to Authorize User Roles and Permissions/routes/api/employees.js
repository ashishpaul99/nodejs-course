const express = require("express");
const router = express.Router();

// Import controller and JWT middleware
const employeeController = require('../../controllers/employeesController');

// Routes at "/employees"
router.route("/")
  .get(employeeController.getAllEmployees)  // Protected → needs JWT
  .post(employeeController.createNewEmployee)          // Open → add employee
  .put(employeeController.updateEmployee)              // Open → update employee
  .delete(employeeController.deleteEmployee);          // Open → delete employee

// Route at "/employees/:id"
router.route("/:id")
  .get(employeeController.getEmployee);                // Open → get employee by ID

module.exports = router;
