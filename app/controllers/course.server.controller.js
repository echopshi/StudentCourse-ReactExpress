const Course = require("mongoose").model("Course");

function getErrorMessage(err) {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return "Unknown server error";
  }
}

exports.create = function(req, res) {
  const course = new Course(req.body);
  course.student = req.user._id;

  course.save(err => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(course);
    }
  });
};

exports.list = function(req, res) {
  Course.find()
    .sort("-created")
    .populate("creator", "firstName lastName fullName")
    .exec((err, courses) => {
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        res.status(200).json(courses);
      }
    });
};

exports.read = function(req, res) {
  res.status(200).json(req.course);
};

exports.hasAuthorization = function(req, res, next) {
  if (!req.course.student.equals(req.user._id)) {
    return res.status(403).send({
      message: "User is not authorized"
    });
  }
  next();
};

exports.update = function(req, res) {
  Course.findByIdAndUpdate({ _id: req.courseId }, req.body, function(
    err,
    course
  ) {
    if (err) return next(err);
    res.json(course);
  });
};

exports.delete = function(req, res) {
  Course.findByIdAndRemove({ _id: req.courseId }, req.body, function(
    err,
    course
  ) {
    if (err) return next(err);
    res.json(course);
  });
};

exports.courseByID = function(req, res, next, id) {
  Course.findById(id).exec((err, course) => {
    if (err) return next(err);
    if (!course) return next(new Error("Failed to load course " + id));
    req.course = course;
    req.courseId = course._id;
    next();
  });
};

// this part we may need to discuss
// I am not sure if this works or not
exports.findStudentByCourse = function(req, res, next) {
  Course.find(
    {
      courseCode: req.course.courseCode
    },
    (err, courses) => {
      if (err) return next(err);
      req.courses = courses;
    }
  ).then(function() {
    let studentList = [];
    req.courses.forEach(course => {
      studentList.add(course.student);
    });
    res.json(studentList);
  });
};
