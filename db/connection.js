
/**
 * This module exports an instance of PrismaClient, which is a database client for interacting with the database using Prisma ORM.
 * PrismaClient provides methods for performing various database operations such as querying, inserting, updating, and deleting data.
 * It is initialized once and exported as a singleton instance to be reused throughout the application.
 * Importing this module allows easy access to the database functionality provided by Prisma ORM.
 */

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
console.log("Prisma client connected");

module.exports = prisma;
