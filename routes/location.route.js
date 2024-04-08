const express = require("express");
const router = express.Router();
const {createLocation , getLocationById, getLocations, updateLocation, deleteLocation} = require("../controllers/location.controller");
const {
  validateBody,
  validateParams,
  locationSchema,
  idSchema,
} = require("../middleware/validationMiddleware");

// Create a new location
router.post("/", validateBody(locationSchema), createLocation);

// Retrieve all locations
router.get("/", getLocations);

// Retrieve a location by ID
router.get("/:id", validateParams(idSchema), getLocationById);

// Update a location by ID
router.patch("/:id", validateParams(idSchema), validateBody(locationSchema), updateLocation);

//Delete a location by ID
router.delete("/:id", validateParams(idSchema), deleteLocation);


module.exports = router;