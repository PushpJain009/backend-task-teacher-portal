const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
