import { Router } from "express";
import httpStatus from "http-status";
import student from "../controllers/student/student";
import totalStudents from "../controllers/student/student";
import { isSuperAdmin } from "../middlewares/auth";
import editedStudent from "../controllers/student/student";

const router = Router();

router.post("/register/child", async (req, res) => {
  try {
    const { first_name, last_name, family_id, date_of_birth, sex } = req.body;

    const data = await student.registerChild({
      first_name,
      last_name,
      family_id,
      date_of_birth,
      sex,
    });

    res.status(httpStatus.CREATED).json({ data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

router.get("/students/total", async (_req, res) => {
  try {
    const data = await totalStudents.getTotalOfStudents();
    res.status(httpStatus.OK).json({ data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

// get total of students per year 5 years back
router.get("/students/totalperyear", async (_req, res) => {
  try {
    const data = await totalStudents.getTotalOfStudentsPerYear();
    res.status(httpStatus.OK).json({ data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

router.get("/students", async (_req, res) => {
  try {
    const data = await student.getAllStudents();
    res.status(httpStatus.OK).json({ data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

router.get("/student/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await student.getStudentById(id);
    res.status(httpStatus.OK).json({ data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

/**
 * Edit a student details
 * Method: PUT
 * payload {Camp Id}
 */
router.put("/student/edit/:id", isSuperAdmin, async (req, res) => {
  try {
    const studentId = req.params.id;
    const { first_name, last_name, date_of_birth, sex } = req.body;
    const data = await editedStudent.editSudent(studentId, {
      first_name,
      last_name,
      date_of_birth,
      sex,
    });

    res
      .status(httpStatus.OK)
      .json({ message: "student details have been updated", data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

/**
 * Edit a students details
 * Method: PUT
 * payload {Camp Id}
 */
router.put("/student/delete/:id", isSuperAdmin, async (req, res) => {
  try {
    const studentId = req.params.id;

    const data = await editedStudent.deleteStudent(studentId);

    res
      .status(httpStatus.OK)
      .json({ message: "student details have been deleted", data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

export default router;
