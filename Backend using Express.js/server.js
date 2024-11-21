import express from "express"; // Import Express framework
import mongoose from "mongoose"; // Import Mongoose for MongoDB object modeling
import { validUser } from "./userSchema.js"; // Import the user schema/model

// Initialize the Express application
const myApp = new express();

// Connect to the MongoDB database
mongoose.connect("mongodb://localhost:27017");

// Sample in-memory user data
const usersList = [
  { firstName: "Anshika", lastName: "Agarwal", hobby: "Teaching" },
  { firstName: "Rahul", lastName: "Sharma", hobby: "Photography" },
  { firstName: "Priya", lastName: "Singh", hobby: "Reading" },
  { firstName: "Vikram", lastName: "Joshi", hobby: "Cooking" },
  { firstName: "Sneha", lastName: "Patel", hobby: "Dancing" },
  { firstName: "Arjun", lastName: "Verma", hobby: "Traveling" },
  { firstName: "Tina", lastName: "Mehta", hobby: "Gardening" },
  { firstName: "Nikhil", lastName: "Kumar", hobby: "Gaming" },
  { firstName: "Aditi", lastName: "Srinivasan", hobby: "Writing" },
  { firstName: "Rohan", lastName: "Iyer", hobby: "Cycling" },
];

// Clear the existing user collection and insert sample data
await validUser.deleteMany(); // Delete all users from the collection
await validUser.insertMany(usersList); // Insert the sample users into the database

// Start the server and listen on port 4200
myApp.listen(4200, () => {
  console.log("server is ON my guy");
});

// Middleware to parse JSON request bodies
myApp.use(express.json());

// Middleware to log request details and status code
myApp.use((req, res, next) => {
  // Store the original send method
  const originalSend = res.send;

  // Override the res.send method to log details
  res.send = function (body) {
    console.log(req.method, req.originalUrl, res.statusCode); // Log the request method, URL, and status code

    // Call the original send method under the same this environment
    return originalSend.call(this, body);
  };
  next(); // Proceed to the next middleware/route
});

// Validation middleware for required fields
const validateUserFields = (req, res, next) => {
  const { firstName, lastName, hobby } = req.body; // Destructure the request body

  // Check for missing required fields
  if (!firstName || !lastName || !hobby) {
    return res.status(400).json({
      message:
        "Missing required fields: firstName, lastName, and hobby are required.",
    });
  }

  next(); // Proceed to the next middleware/route
};

// Route to get all users
myApp.get("/users", async (req, res) => {
  const usersListFromDB = await validUser.find(); // Fetch all users from the database
  res.send(usersListFromDB); // Send the list of users in the response
});

// Route to get a user by ID
myApp.get("/users/:id", async (req, res) => {
  const id = req.params.id; // Get the user ID from the request parameters
  const user = await validUser.findOne({ _id: id }); // Find the user by ID
  if (!user) {
    return res.status(404).json({
      message: `no user with id:${id} found`, // Send 404 if user not found
    });
  }
  res.send(user); // Send the found user in the response
});

// Route to add a new user
myApp.post("/user", validateUserFields, async (req, res) => {
  // Validate incoming request fields using middleware
  const newUser = await validUser.create(req.body); // Create a new user in the database
  res.status(201).send(newUser); // Send the created user with 201 status
});

// Route to update an existing user by ID
myApp.put("/user/:id", validateUserFields, async (req, res) => {
  const id = req.params.id; // Get the user ID from the request parameters

  const existingUser = await validUser.findOne({ _id: id }); // Find the existing user
  if (!existingUser) {
    return res.status(404).json({
      message: `no user with id:${id} found`, // Send 404 if user not found
    });
  }

  // Update user properties based on the request body
  const keys = Object.keys(req.body); // Get the keys from the request body
  for (let key of keys) {
    existingUser[key] = req.body[key]; // Update the user's properties
  }

  // Save the updated user back to the database
  await existingUser.save(); // Persist changes

  res.send(existingUser); // Send the updated user in the response
});

// Route to delete a user by ID
myApp.delete("/user/:id", async (req, res) => {
  const id = req.params.id; // Get the user ID from the request parameters
  const user = await validUser.deleteOne({ _id: id }); // Delete the user from the database

  if (user.deletedCount === 0) {
    return res.status(404).json({
      message: `no user with id:${id} found`, // Send 404 if no user was deleted
    });
  }
  res.send(user); // Send the result of the delete operation
});
