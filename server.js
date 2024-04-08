// Importing express module
const express = require("express");

// Creating an express application instance
const app = express();

// Setting up the port to listen on, defaulting to 3002 if not provided
const port = process.env.PORT || 3002;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse incoming URL-encoded requests with extended options
app.use(express.urlencoded({ extended: true }));

// Starting the server to listen on the specified port
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
