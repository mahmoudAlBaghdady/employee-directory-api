const express = require("express");
const router = express.Router();
const { createEmployee , getEmployees , addIsFavorite, getFavorites , getEmployeeById,
  removeIsFavorite, updateEmployee, deleteEmployee, searchEmployee} = require("../controllers/employee.controller")
const {
  validateBody,
  validateParams,
  employeeSchema,
  idSchema,
  employeeSchemaPagination,
  employeeSchemaSearch,
} = require("../middleware/validationMiddleware");



// Create a new employee
router.post("/", validateBody(employeeSchema), createEmployee);

// Retrieve all employees
router.get("/",validateParams(employeeSchemaPagination), getEmployees);

// Retrieve an employee by ID
router.get("/:id", validateParams(idSchema), getEmployeeById);

// Update an employee by ID
router.patch( "/:id", validateParams(idSchema), validateBody(employeeSchema), updateEmployee);

// Delete an employee by ID
router.delete("/:id", validateParams(idSchema), deleteEmployee);

// Retrieve all favorite employees
router.get("/favorites",validateParams(employeeSchemaPagination), getFavorites);

// Search for an employee
router.get("/search/:queryparms",validateParams(employeeSchemaSearch), searchEmployee);


module.exports = router;