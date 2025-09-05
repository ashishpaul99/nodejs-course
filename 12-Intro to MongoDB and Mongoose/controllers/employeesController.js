// Import employees data from model (JSON file)
const data = {
    employees:require('../model/employees.json'),
    setEmployees:function(data){
         this.employees=data
    }        
};


// Get all employees
const getAllEmployees = (req, res) => {
    res.json(data.employees); // Send all employees as JSON response
};


// Create a new employee
const createNewEmployee = (req, res) => {
    // Generate a new ID (increment last ID if exists, else start at 1)
    const newEmployee = {
        id: data.employees?.length 
            ? data.employees[data.employees.length - 1].id + 1 
            : 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };

    // Validate required fields
    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(404).json({ 'message': 'First and last names are required' });
    }

    // Save new employee to in-memory store
    data.setEmployees([...data.employees, newEmployee]);

    // Respond with 201 Created and the updated employees list
    res.status(201).json(data.employees);
};


// Update an employee
const updateEmployee = (req, res) => {
    // 1. Find employee by ID
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));

    // 2. If not found, return error
    if (!employee) {
        return res.status(404).json({ "message": `Employee ID ${req.body.id} not found` });
    }

    // 3. Update fields if provided
    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;

    // 4. Create new array with updated employee
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const updatedEmployees = [...filteredArray, employee];

    // 5. Save updated array back to data
    data.setEmployees(updatedEmployees);

    // 6. Respond with the updated list (or just updated employee)
    res.json(data.employees);
};

// Delete an employee
const deleteEmployee = (req, res) => {
   const employee=data.employees.find(emp=>emp.id===parseInt(req.body.id));
   if(!employee){
       return res.status(404).json({"message":`Employee ID ${req.body.id} not found`});
   }

   const filteredArray=data.employees.filter(emp=>emp.id!==parseInt(req.body.id));
   data.setEmployees(filteredArray);
    res.json({ "message": `Employee ID ${req.body.id} deleted`, employees: data.employees });
   
};

// Get a single employee by ID
const getEmployee = (req, res) => {
    // Find employee by ID (from route params, e.g. /employees/2)
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));

    // If not found, return 404 Not Found
    if (!employee) {
        return res.status(404).json({ "message": `Employee ID ${req.params.id} not found` });
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
