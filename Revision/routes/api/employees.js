const express=require("express");
const router=express.Router();
const employeeController=require('../../controller/employeesController')

const data={};
data.exployees=require('../../model/employees.json');
router.route('/')
        .get(employeeController.getAllEmployees)
        .post(employeeController.createNewEmployee)
        .put(employeeController.updateEmployee)
        .delete(employeeController.deleteEmployee)

router.route("/:id")
          .get(employeeController.getEmployee);
    
module.exports=router;