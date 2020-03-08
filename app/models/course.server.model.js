const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  courseCode: String,
  courseName: String,
  program: String,
  semester: String,
  created: {
    type: Date,
    default: Date.now
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student"
  }
});
mongoose.model("Course", CourseSchema);
