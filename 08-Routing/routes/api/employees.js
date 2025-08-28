const express = require("express");
const router = express.Router();

// Load employee data
const data = {};
data.employees = require("../../data/employees.json");

// Handle routes at "/"
// We can chain multiple HTTP methods for the same route
router.route("/")
  // GET → Fetch all employees
  .get((req, res) => {
    res.json(data.employees);
  })

  // POST → Add a new employee (data from request body)
  .post((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname
    });
  })

  // PUT → Update an existing employee (data from request body)
  .put((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname
    });
  })

  // DELETE → Delete an employee by ID (sent in request body)
  .delete((req, res) => {
    res.json({
      id: req.body.id
    });
  });

// Handle route at "/:id"
// GET → Fetch an employee by ID (parameter in URL)
router.route("/:id")
  .get((req, res) => {
    res.json({ id: req.params.id });
  });

module.exports = router;

// Testing the api routes by using thunder client extension in vs code
