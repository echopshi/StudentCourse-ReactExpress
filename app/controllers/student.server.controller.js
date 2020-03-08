const Student = require("mongoose").model("Student");

const getErrorMessage = function(err) {
  var message = "";
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = "Usernmae already exists";
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
    heading: "Course Information",
    messages: req.flash("error") || req.flash("info"),
    userEmail: req.user ? req.user.email : ""
  });
};

exports.renderSignup = function(req, res) {
  return res.render("signup", {
    title: "Sign Up page",
    heading: "Sign Up as Student"
  });
};

exports.signup = function(req, res) {
  if (req.body.email) {
    const student = new Student(req.body);
    student.provider = "local";
    student.save(err => {
      if (err) {
        const message = getErrorMessage(err);
        req.flash("error", message); //save the error into flash memory.
        return res.redirect("/signup");
      } else {
        return res.redirect("/");
      }
    });
  } else {
    return res.redirect("/signup");
  }
};

exports.display = function(req, res, next) {
  Student.find({}, (err, students) => {
    if (err) {
      return next(err);
    } else {
      res.render("students", {
        title: "Students Page",
        heading: "List All Students",
        students: students
      });
    }
  });
};

exports.userByID = function(req, res, next) {
  Student.findOne(
    {
      email: req.session.email
    },
    (err, student) => {
      if (err) {
        return next(err);
      } else {
        next();
      }
    }
  );
};

exports.logout = function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect("/");
};
