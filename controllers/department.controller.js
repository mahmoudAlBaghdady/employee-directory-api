const prisma = require("../db/connection");

/**
 * Create a new department with the provided name.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Created department object.
 */
const createDepartment = async (req, res) => {
    const { name } = req.body;
    try {
        const department = await prisma.department.create({
            data: { name },
        });
        res.status(201).json(department);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Retrieve a list of all departments.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Array} - Array of department objects.
 */
const getDepartments = async (req, res) => {
    try {
        const departments = await prisma.department.findMany();
        res.json(departments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Retrieve a department by its unique identifier.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Department object with the specified ID.
 */
const getDepartmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const department = await prisma.department.findUnique({
            where: { id },
        });
        res.json(department);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Update the name of a department with the specified ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Updated department object.
 */
const updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedDepartment = await prisma.department.update({
            where: { id },
            data: { name },
        });
        res.json(updatedDepartment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
/**
 * Delete a department with the specified ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const deleteDepartment = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteDepartment = await prisma.department.delete({
            where: { id },
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createDepartment,
    getDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
};
