# Here are the setup instructions and notes on how to build the Employee Management System backend:

# Setup Instructions:

## Clone the Repository:

```
git clone https://github.com/mahmoudAlBaghdady/employee-directory-api
```

## Install Dependencies:

1. Navigate to the project directory in your terminal

```
cd employee-directory-api
```

2. run the following command to install dependencies listed in package.json:

```
npm install
```

## Set Environment Variables:

1. Create a .env file in the root directory of your project. 
2. Add necessary environment variables: 

```
PORT=
DATABASE_URL=
```

## Prisma Setup:
* Run the following command to initialize Prisma and generate the Prisma Client:
* npx prisma generate
  
## Start the Server:
* You can start the server in development mode using nodemon by running:
```
npm run dev
```
* You can start the server in production mode using nodemon by running:
```
npm run start
```

# Continout integrations (CI)

The project includes CI workflow to automate the testing process when the developers publish new PRs on GitHub. The CI runs integrations tests that covers all APIs and all possible HTTP methods as well.

The CI includes tests for:

- departments API (GET, POST, PATCH, DELETE)
- locations API (GET, POST, PATCH, DELETE)
- employees API (GET, POST, PATCH, DELETE)

# API Documentation

The full API documentation can be found here: https://www.employeedirectory.site/developers

# Notes:
* Prisma: Prisma is used as an ORM (Object-Relational Mapping) tool to interact with the database. Ensure that you have Prisma CLI installed globally (npm install -g prisma).
* Joi: Joi is used for input validation. You can define validation schemas using Joi to validate incoming requests.
* Jest: Jest is the testing framework used for unit and integration testing.
* Express: Express is used as the web server framework to handle HTTP requests.
* dotenv: dotenv is used to load environment variables from a .env file into process.env.