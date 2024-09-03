const Student = require("../models/student");

// Add a new student
const AddStudent = async (req, res) => {
  const { name, subject, marks } = req.body;
  const userId = res.locals.userData._id;
  console.log("USER ID :", userId);
  try {
    const student = new Student({ name, subject, marks, user: userId });
    await student.save();
    res.status(201).json(student);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Get all students
const GetStudents = async (req, res) => {
  const userId = res.locals.userData._id;
  console.log("USER ID :", userId);
  try {
    const students = await Student.find({ user: userId });
    res.status(200).json(students);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Get a student by ID
const GetStudentById = async (req, res) => {
  const { id } = req.params;
  const userId = res.locals.userData._id;
  console.log("USER ID :", userId);
  try {
    const student = await Student.findOne({ _id: id, user: userId });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(student);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Update a student by ID
const UpdateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, subject, marks } = req.body;
  const userId = res.locals.userData._id;
  console.log("USER ID :", userId);
  try {
    const student = await Student.findOneAndUpdate(
      { _id: id, user: userId },
      { name, subject, marks },
      { new: true }
    );
    if (!student) {
      return res
        .status(404)
        .json({ error: "Student not found or unauthorized" });
    }
    res.status(200).json(student);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Delete a student by ID
const DeleteStudent = async (req, res) => {
  const { id } = req.params;
  const userId = res.locals.userData._id;
  console.log("USER ID :", userId);
  try {
    const student = await Student.findOneAndDelete({ _id: id, user: userId });
    if (!student) {
      return res
        .status(404)
        .json({ error: "Student not found or unauthorized" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  AddStudent,
  GetStudents,
  GetStudentById,
  UpdateStudent,
  DeleteStudent,
};
