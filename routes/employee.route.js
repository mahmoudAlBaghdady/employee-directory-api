const express = require("express");
const router = express.Router();
const { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee} = require("../controllers/employee.controller")
const {
  validateBody,
  validateParams,
  validateQuery,
  employeeSchema,
  idSchema,
  employeeSchemaPagination,
} = require("../middleware/validationMiddleware");


// Create a new employee
router.post("/", validateBody(employeeSchema), createEmployee);

// Retrieve all employees
router.get("/",validateQuery(employeeSchemaPagination), getEmployees);

// Retrieve an employee by ID
router.get("/:id", validateParams(idSchema), getEmployeeById);

// Update an employee by ID
router.patch( "/:id", validateParams(idSchema), validateBody(employeeSchema), updateEmployee);

// Delete an employee by ID
router.delete("/:id", validateParams(idSchema), deleteEmployee);

module.exports = router;