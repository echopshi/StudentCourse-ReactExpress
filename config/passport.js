// Load the module dependencies
const passport = require("passport");
const mongoose = require("mongoose");

// Define the Passport configuration method
module.exports = function() {
  const Student = mongoose.model("Student");

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Student.findOne(
      {
        _id: id
      },
      "-password -salt",
      (err, user) => {
        done(err, user);
      }
    );
  });

  // Load Passport's strategies configuration files
  require("./strategies/local.js")();
};
