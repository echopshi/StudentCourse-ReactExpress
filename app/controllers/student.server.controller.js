const Student = require("mongoose").model("Student");
const Course = require("mongoose").model("Course");

const getErrorMessage = function(err) {
  var message = "";
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = "student number already exists";
        break;
      default:
        message = "something went wrong";
    }
  } else {
    for (const errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  return message;
};

exports.index = function(req, res) {
  res.render("index", {
    heading: "Express REST API"
  });
};

exports.create = function(req, res) {
  const student = new Student(req.body);
  student.provider = "local";
  student.save(err => {
    if (err) {
      const message = getErrorMessage(err);
      req.flash("error", message); //save the error into flash memory.
      return next(err);
    } else {
      return res.json(student);
    }
  });
};

exports.welcome = function(req, res) {
  if (!req.user) {
    return res.send({ screen: "auth" }).end();
  }
  res.status(200).send({
    screen: `Welcome student: ${req.user.firstName}!`,
    studentName: `${req.user.firstName}`,
    studentId: `${req.user._id}`
  });
};

exports.signout = function(req, res) {
  req.logout();
  req.session.destroy();
  return res.status("200").json({ message: "signed out" });
};

exports.list = function(req, res, next) {
  Student.find({}, (err, students) => {
    if (err) {
      return next(err);
    } else {
      res.json(students);
    }
  });
};

exports.read = function(req, res) {
  res.json(req.student);
};

exports.update = function(req, res, next) {
  Student.findByIdAndUpdate({ _id: req.studentId }, req.body, function(
    err,
    user
  ) {
    if (err) return next(err);
    res.json(user);
  });
};

exports.delete = function(req, res, next) {
  Student.findByIdAndRemove({ _id: req.studentId }, req.body, function(
    err,
    user
  ) {
    if (err) return next(err);
    res.json(user);
  });
};

exports.studentByStudentNum = function(req, res, next, studentNum) {
  Student.findOne(
    {
      studentNumber: studentNum
    },
    (err, student) => {
      if (err) return next(err);
      else {
        req.student = student;
        req.studentId = student._id;
        next();
      }
    }
  );
};

exports.findCoursesByStudent = function(req, res, next) {
  Course.find(
    {
      student: req.studentId
    },
    (err, courses) => {
      if (err) return next(err);
      else {
        res.json(courses);
      }
    }
  );
};

exports.requiresLogin = function(req, res, next) {
  if (!req.user) {
    return res.send({ screen: "auth" }).end();
  }
  next();
};

exports.isSignedIn = (req, res) => {
  if (!req.user) {
    return res.send({ screen: "auth" }).end();
  }
  return res.send({ screen: `Welcome student: ${req.user.firstName}!` }).end();
};
