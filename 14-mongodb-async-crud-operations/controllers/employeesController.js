const Employee=require('../model/Employee');

// Get all employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();  // fetch all docs from MongoDB
        res.json(employees);                      // send them as JSON response
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching employees' });
    }
};


// Create a new employee
const createNewEmployee = async (req, res) => {

    const newEmployee=req.body;
    if(!newEmployee.firstname || !newEmployee.lastname){
        return res.status(400).json({"message":"First and last name are required"});
    }

    try{
          // Generate a new ID (increment last ID if exists, else start at 1)
          const result=await Employee.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname
          });
          // Respond with 201 Created and the updated employees list
          res.status(201).json(result);
    }catch(err){
      console.error(err);
      res.status(500).json({message:"Server error creating employee"});
    }
};


// Update an employee
const updateEmployee = async (req, res) => {
    const employeeId = req.body.id;

    try {
        // 1. Find employee by _id
        const employee = await Employee.findOne({_id:employeeId}).exec();

        // 2. If not found, return error
        if (!employee) {
            return res.status(204).json({ message: `No employee matches ID ${employeeId}`});
        }

        // 3. Update fields if provided
        if (req.body?.firstname) employee.firstname = req.body.firstname;
        if (req.body?.lastname) employee.lastname = req.body.lastname;

        // 4. Save the updated employee back to MongoDB
        const updatedEmployee = await employee.save();

        // 5. Respond with the updated employee
        res.json(updatedEmployee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error updating employee' });
    }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
    const employeeId = req?.body?.id;

    try {
        // 1. Find employee by _id
        const employee = await Employee.findOne({_id:employeeId}).exec();

        // 2. If not found, return error
        if (!employee) {
            return res.status(404).json({ message: `Employee ID ${employeeId} not found` });
        }

        // 3. Delete the employee
        const result=await employee.deleteOne({_id:employeeId});
        res.json(result);

        // 4. Respond with success message
        res.json({ message: `Employee ID ${employeeId} deleted` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting employee' });
    }
};

// Get a single employee by ID
const getEmployee = async (req, res) => {
    const employeeID=req.params.id;
    // Find employee by ID (from route params, e.g. /employees/2)
    const employee = await Employee.find({_id:employeeID});
  

    // If not found, return 404 Not Found
    if (!employee) {
        return res.status(404).json({ "message": `Employee ID ${employeeID} not found` });
    }

    // Return the employee object
    res.json(employee);
};


// Export all controller functions so they can be used in routes
module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
};
