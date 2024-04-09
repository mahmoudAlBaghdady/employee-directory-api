// Description: Test cases for department routes.
const request = require("supertest"); // Importing supertest for making HTTP requests
const prisma = require("../../db/connection"); // Importing the Prisma client for database interactions

require("dotenv").config(); // Loading environment variables

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

// Test case for creating a new department using POST /api/departments
describe("POST /api/department", () => {
  it("should create a new department", async () => {
    const res = await request("http://127.0.0.1:3002") // Making a POST request to create a department
      .post("/api/departments")
      .send({ name: "IT" }); // Sending data for creating the department
    expect(res.statusCode).toBe(201); // Expecting the response status code to be 201 (Created)
    expect(res.body.name).toBe("IT"); // Expecting the response body to contain the created department's name
  });
});

// Test case for retrieving all departments using GET /api/departments
describe("GET /api/department", () => {
  it("should return all deparment", async () => {
    const res = await request("http://127.0.0.1:3002").get("/api/departments"); // Making a GET request to retrieve all departments
    expect(res.statusCode).toBe(200); // Expecting the response status code to be 200 (OK)
    expect(res.body.length).toBeGreaterThan(0); // Expecting the response body to contain at least one department
  });
});

// Test case for retrieving a department by ID using GET /api/departments/:id
describe("GET /api/department/:id", () => {
  let department;

  beforeAll(async () => {
    // Creating a new department

    department = await prisma.department.create({
      data: { name: "Finance" },
    });
  });
  it("should return a department by id", async () => {
    // Making a GET request to retrieve the created department

    const res = await request("http://127.0.0.1:3002").get(
      `/api/departments/${department.id}`
    );
    expect(res.statusCode).toBe(200); // Expecting the response status code to be 200 (OK)
    expect(res.body.name).toBe("Finance"); // Expecting the response body to contain the correct department name
  });
});

describe("PATCH /api/department/:id", () => {
  let department;

  beforeAll(async () => {
    // Creating a new department

    department = await prisma.department.create({
      data: { name: "Sales" },
    });
  });

  it("should update a department by id", async () => {
    // Making a PATCH request to update the created department

    const res = await request("http://127.0.0.1:3002")
      .patch(`/api/departments/${department.id}`)
      .send({ name: "Support" }); // Sending data for creating the department

    expect(res.statusCode).toBe(200); // Expecting the response status code to be 200 (OK)
    expect(res.body.name).toBe("Support"); // Expecting the response body to contain the correct department name
  });
});

describe("DELETE /api/department/:id", () => {
  let department;

  beforeAll(async () => {
    // Creating a new department

    department = await prisma.department.create({
      data: { name: "Social Media" },
    });
  });
  it("should delete a department by id", async () => {
    // Making a DELETE request to delete the created department

    const res = await request("http://127.0.0.1:3002").delete(
      `/api/departments/${department.id}`
    );
    expect(res.statusCode).toBe(200); // Expecting the response status code to be 200 (OK)
  });
});
