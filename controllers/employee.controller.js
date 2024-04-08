const prisma = require("../db/connection");

/**
 * Create a new employee with the provided name.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Created employee object.
 */
const createEmployee = async (req, res) => {
    const { name, pictureUrl, email, jobTitle, departmentId, locationId} = req.body;
    try {
        const employee = await prisma.employee.create({
            data: {
                email,
                name,
                departmentId,
                locationId,
                jobTitle,
                pictureUrl
            }
        });
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Retrieve a list of all employees.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Array} - Array of employee objects.
 */
const getEmployees = async (req, res) => {
    const { page, limit } = req.params;

    try {
        const employees = await prisma.employee.findMany({
            include: {
              department: {
                select: { name: true },
              },
              location: {
                select: { name: true },
              },
          },
            skip: (page - 1) * limit,
        });
        const total = await prisma.employee.count();
        const totalPage = Math.ceil(total / limit);
        res.json({ employees, totalPage });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Retrieve an employee by its unique identifier.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Employee object with the specified ID.
 */
const getEmployeeById = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await prisma.employee.findUnique({
          where: { id },
          include: {
            department: {
              select: { name: true },
            },
            location: {
              select: { name: true },
            },
          },
        });
        res.json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Update the isFavorite of an employee with the specified ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Updated employee object.
 */
const addIsFavorite = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await prisma.employee.update({
            where: { id },
            data: { isFavorite: true },
        });
        res.json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
/**
 * Update the isFavorite of an employee with the specified ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Updated employee object.
 */

const removeIsFavorite = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await prisma.employee.update({
            where: { id },
            data: { isFavorite: false },
        });
        res.json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Retrieve a list of all favorite employees.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Array} - Array of favorite employee objects.
 */

const getFavorites = async (req, res) => {
    
 const { page, limit } = req.params;
    try {
        const employees = await prisma.employee.findMany({
            where: {
                isFavorite: true,
            },
            include: {
                department: {
                    select: { name: true },
                },
                location: {
                    select: { name: true },
                },
            },
            skip: (page - 1) * limit,
            
        });
        const total = await prisma.employee.count({
            where: {
                isFavorite: true,
            },

        });
        const totalPage = Math.ceil(total / limit);
        res.json({ employees, totalPage });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Update the details of an employee with the specified ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Updated employee object.
 */
const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, pictureUrl, email, jobTitle, departmentId, locationId} = req.body;
    try {
        const employee = await prisma.employee.update({
            where: { id },
            data: {
                email,
                name,
                departmentId,
                locationId,
                jobTitle,
                pictureUrl
            },
        });
        res.json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Delete an employee with the specified ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Deleted employee object.
 */
const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await prisma.employee.delete({
            where: { id },
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
/**
 * Search for an employee by name, email, jobTitle, department, or location.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Array} - Array of employee objects.
 */
const searchEmployee = async (req, res) => {
    const { queryparams } = req.params;
    try {
        const employees = await prisma.employee.findMany({
          where: {
            OR: [
              { name: { contains: queryparams, mode: "insensitive" } },
              { email: { contains: queryparams, mode: "insensitive" } },
              { jobTitle: { contains: queryparams, mode: "insensitive" } },
              {
                department: {
                  name: { contains: queryparams, mode: "insensitive" },
                },
              },
              {
                location: {
                  name: { contains: queryparams, mode: "insensitive" },
                },
              },
            ],
          },
        });

        res.json(employees);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createEmployee,
    getEmployees,
    getEmployeeById,
    addIsFavorite,
    removeIsFavorite,
    getFavorites,
    updateEmployee,
    deleteEmployee,
    searchEmployee,
};