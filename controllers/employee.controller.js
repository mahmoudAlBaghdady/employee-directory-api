const prisma = require("../db/connection");

/**
 * Create a new employee with the provided name.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Created employee object.
 */
const createEmployee = async (req, res) => {
    const { name, pictureUrl, email, jobTitle, departmentId, locationId, isFavorite } = req.body;
    try {
        const employee = await prisma.employee.create({
            data: {
                email,
                name,
                jobTitle,
                pictureUrl,
                isFavorite, // optional - default to false
                department: {
                    connect: { id: departmentId }, // Use the connect operation to link to an existing department
                },
                location: {
                    connect: { id: locationId }, // Use the connect operation to link to an existing location
                },

            }
        });
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Retrieve a list of all employee.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Array} - Array of employee objects.
 */

const getEmployees = async (req, res) => {
    let { page, limit, search } = req.query;
    // Convert page and limit to integers
    page = parseInt(page, 10) || 1; // Default to page 1 if not provided
    limit = parseInt(limit, 10) || 10; // Default to limit 10 if not provided
    const skip = Math.max(0, (page - 1) * limit);

    try {
        // Build the where condition based on search if they exist
        const whereCondition = search ? {
            OR: [
                { name: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { jobTitle: { contains: search, mode: "insensitive" } },
                {
                    department: {
                        name: { contains: search, mode: "insensitive" },
                    },
                },
                {
                    location: {
                        name: { contains: search, mode: "insensitive" },
                    },
                },
            ],
        } : {};

        // Fetch employees with or without search conditions
        const employees = await prisma.employee.findMany({
            where: whereCondition,
            include: {
                department: {
                    select: { name: true },
                },
                location: {
                    select: { name: true },
                },
            },
            skip,
            take: limit,
        });
        // Count the total employees with or without search conditions
        const total = await prisma.employee.count({ where: whereCondition });
        const totalPage = Math.ceil(total / limit);
        res.json({ employees, totalPage });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
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
 * Retrieve a list of all favorite employee.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Array} - Array of favorite employee objects.
 */

const getFavorites = async (req, res) => {
    
    let { page, limit } = req.params;
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    try {
        const skip = Math.max(0, (page - 1) * limit);
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
            skip: skip,
            take: limit, 
            
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
    const { name, pictureUrl, email, jobTitle, departmentId, locationId, isFavorite} = req.body;
    try {
        const employee = await prisma.employee.update({
            where: { id },
            data: {
                email,
                name,
                departmentId,
                locationId,
                jobTitle,
                pictureUrl,
                isFavorite
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

        res.json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = {
    createEmployee,
    getEmployees,
    getEmployeeById,
    getFavorites,
    updateEmployee,
    deleteEmployee,
};