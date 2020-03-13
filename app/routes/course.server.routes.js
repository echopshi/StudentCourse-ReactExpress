var courses = require("../controllers/course.server.controller");
var student = require("../controllers/student.server.controller");

module.exports = function(app) {
  // create course
  app.route("/api/courses/create").post(student.requiresLogin, courses.create);

  // to show a list of course
  app.route("/api/courses").get(courses.list);

  // read, update, delete course by courseId
  app
    .route("/api/courses/:courseId")
    .get(courses.read)
    .put(student.requiresLogin, courses.hasAuthorization, courses.update)
    .delete(student.requiresLogin, courses.hasAuthorization, courses.delete);
  app.param("courseId", courses.courseByID);

  // list all students that taking the course
  app.route("/api/courses/:courseId/students").get(courses.findStudentByCourse);
  app.param("courseId", courses.courseByID);
};
