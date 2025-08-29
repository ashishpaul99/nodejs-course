const express = require("express");
const router = express.Router();
const employeeController=require('../../controllers/employeesController');


// Handle routes at "/"
// We can chain multiple HTTP methods for the same route
router.route("/")
  // GET → Fetch all employees
  .get(employeeController.getAllEmployees)

  // POST → Add a new employee (data from request body)
  .post(employeeController.createNewEmployee)

  // PUT → Update an existing employee (data from request body)
  .put(employeeController.updateEmployee)

  // DELETE → Delete an employee by ID (sent in request body)
  .delete(employeeController.deleteEmployee)

// Handle route at "/:id"
// GET → Fetch an employee by ID (parameter in URL)
router.route("/:id")
  .get(employeeController.getEmployee);

module.exports = router;


