module.exports = function(app) {
  const student = require("../controllers/student.server.controller");
  const passport = require("passport");

  // student index page
  app.route("/").get(student.index);

  // student sign up
  app.route("/api/signup").post(student.create);

  // student sign in
  app.route("/api/signin").post(
    passport.authenticate("local", {
      successRedirect: "/api/welcome",
      failureRedirect: "/",
      failureFlash: true
    })
  );

  //
  app.route("/api/read_cookie").get(student.isSignedIn);

  // after success sign in
  app.route("/api/welcome").get(student.welcome);

  // student sign out
  app.route("/api/signout").get(student.signout);

  // get a list of all student
  app.route("/api/students").get(student.list);

  // read, update and delete specific student
  app
    .route("/api/students/:studentNumber")
    .get(student.read)
    .put(student.update)
    .delete(student.delete);
  app.param("studentNumber", student.studentByStudentNum);

  // list all the courses taken by a student
  app
    .route("/api/students/:studentNumber/courses")
    .get(student.findCoursesByStudent);
  //not sure if we need this line or not
  app.param("studentNumber", student.studentByStudentNum);
};
