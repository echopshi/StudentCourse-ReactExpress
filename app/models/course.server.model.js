const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  courseCode: {
    type: String,
    required: "Course Code cannot be blank"
  },
  courseName: {
    type: String,
    required: "Course Name cannot be blank"
  },
  section: {
    type: String,
    required: "Course Section cannot be blank"
  },
  semester: {
    type: String
  },
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
