// Description: Test cases for employee routes.
const request = require("supertest"); // Importing supertest for making HTTP requests
const prisma = require("../../db/connection"); // Importing the Prisma client for database interactions

require("dotenv").config(); // Loading environment variables

async function cleanDatabase() {
  await prisma.department.deleteMany(); // Deleting all departments
  await prisma.location.deleteMany(); // Deleting all locations
  await prisma.employee.deleteMany(); // Deleting all employees
}

beforeAll(async () => {
  await prisma.$connect();
  await cleanDatabase();
});

afterAll(async () => {
  await cleanDatabase();
  await prisma.$disconnect();
});

// Test case for creating a new employee using POST /api/employees
describe("POST /api/employees", () => {
  let department;
  let location;

  beforeAll(async () => {
    // Creating a new department
    department = await prisma.department.create({
      data: { name: "IT" },
    });

    // Creating a new location
    location = await prisma.location.create({
      data: { name: "Beirut" },
    });
  });
  it("should create a new employee", async () => {
    const res = await request("http://127.0.0.1:3002") // Making a POST request to create a employee
      .post("/api/employees")
      .send({
        email: "test@example.com",
        name: "Mahmoud",
        jobTitle: "Developer",
        pictureUrl: "https://example.com",
        departmentId: department.id,
        locationId: location.id,
      });
    expect(res.statusCode).toBe(201); // Expecting the response status code to be 201 (Created)

    expect(res.body.email).toBe("test@example.com"); // Expecting the response body to contain the created employee's email
    expect(res.body.name).toBe("Mahmoud"); // Expecting the response body to contain the created employee's name
    expect(res.body.jobTitle).toBe("Developer"); // Expecting the response body to contain the created employee's jobTitle
    expect(res.body.pictureUrl).toBe("https://example.com"); // Expecting the response body to contain the created employee's pictureUrl
    expect(res.body.departmentId).toBe(department.id); // Expecting the response body to contain the created employee's departmentId
    expect(res.body.locationId).toBe(location.id); // Expecting the response body to contain the created employee's locationId
  });
});

// Test case for retrieving all employees using GET /api/employees
// describe("GET /api/employee", () => {
//   it("should return all employees", async () => {
//     const res = await request("http://127.0.0.1:3002").get(`/api/employees?page=${1}&limit=${10}`); // Making a GET request to retrieve all employees
//     expect(res.statusCode).toBe(200); // Expecting the response status code to be 200 (OK)
//     expect(res.body.length).toBeGreaterThan(0); // Expecting the response body to contain at least one employee
//   });
// });

// Test case for retrieving a employee by ID using GET /api/employees/:id
describe("GET /api/employee/:id", () => {
  let department;
  let location;
  let employee;

  beforeAll(async () => {
    // Creating a new department
     department = await prisma.department.create({
      data: { name: "Sales" },
    });

    // Creating a new location
     location = await prisma.location.create({
      data: { name: "Jbeil" },
    });

    // Creating a new employee
    employee = await prisma.employee.create({
      data: {
        email: "test@example.com",
        name: "Mahmoud",
        jobTitle: "Developer",
        pictureUrl: "https://example.com",
        departmentId: department.id,
        locationId: location.id,
      },
    });
  });

  it("should return an employee by id", async () => {
    // Making a GET request to retrieve the created employee

    const res = await request("http://127.0.0.1:3002").get(
      `/api/employees/${employee.id}`
    );
    expect(res.statusCode).toBe(200); // Expecting the response status code to be 200

    expect(res.body.email).toBe("test@example.com"); // Expecting the response body to contain the employee's email
    expect(res.body.name).toBe("Mahmoud"); // Expecting the response body to contain the employee's name
    expect(res.body.jobTitle).toBe("Developer"); // Expecting the response body to contain the employee's jobTitle
    expect(res.body.pictureUrl).toBe("https://example.com"); // Expecting the response body to contain the employee's pictureUrl
    expect(res.body.departmentId).toBe(department.id); // Expecting the response body to contain the employee's departmentId
    expect(res.body.locationId).toBe(location.id); // Expecting the response body to contain the employee's locationId
  });
});

describe("PATCH /api/employee/:id", () => {
  let employee;
  let newDepartment;
  let newLocation;

  beforeAll(async () => {
    // Creating a new department
    const currentDepartment = await prisma.department.create({
      data: { name: "Support" },
    });

    // Creating a new location
    const currentLocation = await prisma.location.create({
      data: { name: "Tripoli" },
    });

    // Creating a new employee
    employee = await prisma.employee.create({
      data: {
        email: "test@example.com",
        name: "Mahmoud",
        jobTitle: "Developer",
        pictureUrl: "https://example.com",
        departmentId: currentDepartment.id,
        locationId: currentLocation.id,
      },
    });

    // Creating a new department
    newDepartment = await prisma.department.create({
      data: { name: "Social Media" },
    });

    // Creating a new location
    newLocation = await prisma.location.create({
      data: { name: "Sidon" },
    });
  });

  it("should update employee name by id", async () => {
    // Making a PATCH request to update the created employee

    const res = await request("http://127.0.0.1:3002")
      .patch(`/api/employees/${employee.id}`)
      .send({
        email: "test2@example.com",
        name: "Mahmoud2",
        jobTitle: "Developer2",
        pictureUrl: "https://example2.com",
        departmentId: newDepartment.id,
        locationId: newLocation.id,
      }); // Sending data for updating the employee

    expect(res.statusCode).toBe(200); // Expecting the response status code to be 200 (OK)

    expect(res.body.email).toBe("test2@example.com"); // Expecting the response body to contain the updated employee's email
    expect(res.body.name).toBe("Mahmoud2"); // Expecting the response body to contain the updated employee's name
    expect(res.body.jobTitle).toBe("Developer2"); // Expecting the response body to contain the updated employee's jobTitle
    expect(res.body.pictureUrl).toBe("https://example2.com"); // Expecting the response body to contain the updated employee's pictureUrl
    expect(res.body.departmentId).toBe(newDepartment.id); // Expecting the response body to contain the updated employee's departmentId
    expect(res.body.locationId).toBe(newLocation.id); // Expecting the response body to contain the updated employee's locationId
  });
});

describe("DELETE /api/employee/:id", () => {
  let employee;

  beforeAll(async () => {
    // Creating a new department
    const department = await prisma.department.create({
      data: { name: "Graphics" },
    });

    // Creating a new location
    const location = await prisma.location.create({
      data: { name: "baabda" },
    });

    // Creating a new employee
    employee = await prisma.employee.create({
      data: {
        email: "test@example.com",
        name: "Mahmoud",
        jobTitle: "Developer",
        pictureUrl: "https://example.com",
        departmentId: department.id,
        locationId: location.id,
      },
    });
  });

  it("should delete a employee by id", async () => {
    // Making a DELETE request to delete the created employee

    const res = await request("http://127.0.0.1:3002").delete(
      `/api/employees/${employee.id}`
    );
    expect(res.statusCode).toBe(200); // Expecting the response status code to be 200 (OK)
  });
});
