const config = require("./config");
const mongoose = require("mongoose");

// Define the Mongoose configuration method
module.exports = function() {
  // Use Mongoose to connect to MongoDB
  const db = mongoose.connect(config.db);

  // Load the 'User' and 'course' model
  require("../app/models/student.server.model");
  require("../app/models/course.server.model");

  // Return the Mongoose connection instance
  return db;
};
