# here are the setup instructions and notes on how to build the Employee Management System backend:

# Setup Instructions:
## Clone the Repository: Clone the repository containing the project files to your local machine.

## Install Dependencies:
* Navigate to the project directory in your terminal and run the 
* following command to install dependencies listed in package.json:
  - yarn install
## Set Environment Variables:
* Create a .env file in the root directory of your project. 
* Add necessary environment variables such as database connection string, port, etc. 
*For example: PORT=3002, DATABASE_URL=
## Database Setup:
* Ensure MongoDB is installed and running on your local machine or provide the connection URL to your MongoDB instance in the .env file.

## Prisma Setup:
* Run the following command to initialize Prisma and generate the Prisma Client:

* npx prisma generate
## Start the Server:
* You can start the server in development mode using nodemon by running:
  - yarn dev
  - Or start the server in production mode using:
  - yarn start
## Run Tests:
To run unit and integration tests using Jest, execute:
* yarn test

# Notes:
* Prisma: Prisma is used as an ORM (Object-Relational Mapping) tool to interact with the database.Ensure that you have Prisma CLI installed globally (npm install -g prisma).
* Joi: Joi is used for input validation. You can define validation schemas using Joi to validate incoming requests.
* Jest: Jest is the testing framework used for unit and integration testing.
* Express: Express is used as the web server framework to handle HTTP requests.
* dotenv: dotenv is used to load environment variables from a .env file into process.env.
