const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const authMiddleware = require("../middleware/auth");

router.post("/students", authMiddleware, studentController.AddStudent);
router.get("/students", authMiddleware, studentController.GetStudents);
router.get("/students/:id", authMiddleware, studentController.GetStudentById);
router.put("/students/:id", authMiddleware, studentController.UpdateStudent);
router.delete("/students/:id", authMiddleware, studentController.DeleteStudent);

module.exports = router;
