// Description: Test cases for location routes.
const request = require("supertest"); // Importing supertest for making HTTP requests
const prisma = require("../../db/connection"); // Importing the Prisma client for database interactions

require("dotenv").config(); // Loading environment variables

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

// Test case for creating a new location using POST /api/locations
describe("POST /api/location", () => {
  it("should create a new location", async () => {
    const res = await request("http://127.0.0.1:3002")
      .post("/api/locations")
      .send({ name: "Beirut" });
    expect(res.statusCode).toBe(201);// Expecting the response status code to be 201 (Created)
    expect(res.body.name).toBe("Beirut");// Expecting the response body to contain the created location's name
  });
});

// Test case for retrieving all locations using GET /api/locations
describe("GET /api/location", () => {
  it("should return all locations", async () => {
    const res = await request("http://127.0.0.1:3002").get("/api/locations");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

// Test case for retrieving a location by ID using GET /api/locations/:id
describe("GET /api/locations/:id", () => {
  let location;

  beforeAll(async () => {
    // Creating a new location
    location = await prisma.location.create({
      data: { name: "Tripoli" },
    });
  });
  it("should return a location by id", async () => {
    // Retrieve the created location by ID
    const res = await request("http://127.0.0.1:3002").get(
      `/api/locations/${location.id}`
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Tripoli");
  });
});

describe("PATCH /api/locations/:id", () => {
  let location;

  beforeAll(async () => {
    // Creating a new location

    location = await prisma.location.create({
      data: { name: "Sidon" },
    });
  });
  it("should update a location by id", async () => {
    // Making a PATCH request to update the created location

    const res = await request("http://127.0.0.1:3002")
      .patch(`/api/locations/${location.id}`)
      .send({ name: "Jounieh" });

    expect(res.statusCode).toBe(200); // Expecting the response status code to be 200 (OK)
    expect(res.body.name).toBe("Jounieh"); // Expecting the response body to contain the correct location name
  });
});

describe("DELETE /api/locations/:id", () => {
  let location;

  beforeAll(async () => {
    // Creating a new location

    location = await prisma.location.create({
      data: { name: "Jbeil" },
    });
  });
  it("should delete a location by id", async () => {
    // Making a DELETE request to delete the created location

    const res = await request("http://127.0.0.1:3002").delete(
      `/api/locations/${location.id}`
    );

    expect(res.statusCode).toBe(200); // Expecting the response status code to be 200 (OK)
  });
});
