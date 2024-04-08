const prisma = require("../db/connection");

/**
 * Create a new location with the provided name.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Created location object.
 */
const createLocation = async (req, res) => {
  const { name } = req.body;
  try {
    const location = await prisma.location.create({
      data: { name },
    });
    res.status(201).json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Retrieve a list of all locations.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Array} - Array of location objects.
 */

const getLocations = async (req, res) => {
  try {
    const locations = await prisma.location.findMany();
    res.json(locations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * Retrieve a location by its unique identifier.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Location object with the specified ID.
 */

const getLocationById = async (req, res) => {
  const { id } = req.params;
  try {
    const location = await prisma.location.findUnique({
      where: { id },
    });
    res.json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * Update the name of a location with the specified ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Updated location object.
 */

const updateLocation = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const location = await prisma.location.update({
      where: { id },
      data: { name },
    });
    res.json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
/**
 * Delete a location with the specified ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const deleteLocation = async (req, res) => {
  const { id } = req.params;
  try {
      const deleteLocation = await prisma.location.delete({
          where: { id },
      });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
}
module.exports = {
    createLocation,
    getLocations,
    getLocationById,
    updateLocation,
    deleteLocation
};