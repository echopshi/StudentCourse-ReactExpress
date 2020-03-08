module.exports = function(app) {
  const student = require("../controllers/student.server.controller");
  const passport = require("passport");

  app
    .route("/")
    .get(student.index)
    .post(
      passport.authenticate("local", {
        successRedirect: "/submitcomments",
        failureRedirect: "/",
        failureFlash: true
      })
    );

  app
    .route("/signup")
    .get(student.renderSignup)
    .post(student.signup);

  app.route("/logout").get(student.logout);
  app.route("/display").get(student.display);
};
