const express = require("express");
const router = express.Router();

// Import controller and JWT middleware
const employeeController = require('../../controllers/employeesController');
const ROLES_LIST=require('../../config/roles_list');
const verifyRoles=require('../../middleware/verifyRoles');

// Routes at "/employees"
router.route("/")
  .get(employeeController.getAllEmployees)  // Protected → needs JWT
  .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),employeeController.createNewEmployee)          // Open → add employee
  .put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),employeeController.updateEmployee)              // Open → update employee
  .delete(verifyRoles(ROLES_LIST.Admin),employeeController.deleteEmployee);          // Open → delete employee

// Route at "/employees/:id"
router.route("/:id")
  .get(employeeController.getEmployee);                // Open → get employee by ID

module.exports = router;
