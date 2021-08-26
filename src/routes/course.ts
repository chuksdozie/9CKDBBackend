import { Router } from "express";
import httpStatus from "http-status";
import course from "../controllers/course/course";
import studentCourses from "../controllers/course/course";
import editedCourse from "../controllers/course/course";
import { isSuperAdmin } from "../middlewares/auth";

const router = Router();

// adding a new course to the db
router.post("/add/course", async (req, res) => {
  try {
    const { course_name, course_code } = req.body;
    const data = await course.addNewCourse({
      course_name,
      course_code,
    });
    res.status(httpStatus.CREATED).json({ data });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

// adding a new course to a student
router.post("/register/course", async (req, res) => {
  try {
    const { student_id, course_id, camp_id, mode, location_id } = req.body;
    const data = await course.coursesEnrolled({
      student_id,
      course_id,
      camp_id,
      mode,
      location_id,
    });
    res.status(httpStatus.CREATED).json({ data });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

// get all courses available
router.get("/courses", async (_req, res) => {
  try {
    const data = await course.getAllCoursesAvailable();
    res.status(httpStatus.OK).json({ data });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

// get the total number of courses available
router.get("/courses/total", async (_req, res) => {
  try {
    const data = await course.getTotalOfCoursesAvailable();
    res.status(httpStatus.OK).json({ data });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

// get the courses already offered by a student
router.get("/courses/student/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await studentCourses.getCoursesEnrolledByStudent(id);
    res.status(httpStatus.OK).json({ data });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

// get the total courses already offered by a student
router.get("/courses/student/:id/total", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await studentCourses.getTotalCoursesEnrolledByStudent(id);
    res.status(httpStatus.OK).json({ data });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

/**
 * Edit an enrolled course details
 * Method: PUT
 * payload {course Id}
 */
router.put(
  "/course/student/edit/:enrolledCourseId",
  isSuperAdmin,
  async (req, res) => {
    try {
      const enrolledCourseId = req.params.enrolledCourseId;
      const { student_id, course_id, camp_id, mode, location_id } = req.body;
      const data = await editedCourse.editEnrolledCourseById(enrolledCourseId, {
        student_id,
        course_id,
        camp_id,
        mode,
        location_id,
      });

      res
        .status(httpStatus.OK)
        .json({ msg: "student course has updated", data });
      return;
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
      return;
    }
  }
);

/**
 * Delete an enrolled course details
 * Method: PUT
 * payload {course Id}
 */
router.put(
  "/course/student/delete/:enrolledCourseId",
  isSuperAdmin,
  async (req, res) => {
    try {
      const enrolledCourseId = req.params.enrolledCourseId;
      // const { student_id } = req.body;
      const data = await editedCourse.deleteEnrolledCourseById(
        enrolledCourseId
      );

      res
        .status(httpStatus.OK)
        .json({ msg: "student course has deleted", data });
      return;
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
      return;
    }
  }
);

/**
 * Edit an a Course's details
 * Method: PUT
 * payload {Id}
 */
router.put("/course/edit/:courseId", isSuperAdmin, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { course_name, course_code } = req.body;
    const data = await editedCourse.editCourseById(courseId, {
      course_name,
      course_code,
    });

    res.status(httpStatus.OK).json({ data });
    return;
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

export default router;
