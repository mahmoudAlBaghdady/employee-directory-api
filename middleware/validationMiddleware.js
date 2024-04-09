const Joi = require("joi");

// Middleware function for validating request body using Joi schema
const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

// Middleware function for validating request parameters using Joi schema
const validateParams = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

// Middleware function for validating request query parameters using Joi schema
const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

// Example Joi schema for validating request body
const departmentSchema = Joi.object({
  name: Joi.string().required(),
});
const locationSchema = Joi.object({
  name: Joi.string().required(),
});

const employeeSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  pictureUrl: Joi.string().uri().required(),
  jobTitle: Joi.string().required(),
  departmentId: Joi.string().alphanum().required(),
  locationId: Joi.string().alphanum().required(),
  isFavorite: Joi.boolean(),
});

const employeeSchemaPagination = Joi.object({
  page: Joi.number(),
  limit: Joi.number(),
  search: Joi.string(),
});
 
// Example Joi schema for validating request parameters
const idSchema = Joi.object({
  id: Joi.string().alphanum().required(),
});

module.exports = {
  validateBody,
  validateParams,
  validateQuery,
  departmentSchema,
  locationSchema,
  employeeSchema,
  idSchema,
  employeeSchemaPagination,
};
