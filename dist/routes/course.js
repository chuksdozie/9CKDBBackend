"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_1 = __importDefault(require("http-status"));
const course_1 = __importDefault(require("../controllers/course/course"));
const course_2 = __importDefault(require("../controllers/course/course"));
const course_3 = __importDefault(require("../controllers/course/course"));
const auth_1 = require("../middlewares/auth");
const router = express_1.Router();
// adding a new course to the db
router.post("/add/course", async (req, res) => {
    try {
        const { course_name, course_code } = req.body;
        const data = await course_1.default.addNewCourse({
            course_name,
            course_code,
        });
        res.status(http_status_1.default.CREATED).json({ data });
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
// adding a new course to a student
router.post("/register/course", async (req, res) => {
    try {
        const { student_id, course_id, camp_id, mode, location_id } = req.body;
        const data = await course_1.default.coursesEnrolled({
            student_id,
            course_id,
            camp_id,
            mode,
            location_id,
        });
        res.status(http_status_1.default.CREATED).json({ data });
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
// get all courses available
router.get("/courses", async (_req, res) => {
    try {
        const data = await course_1.default.getAllCoursesAvailable();
        res.status(http_status_1.default.OK).json({ data });
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
// get the total number of courses available
router.get("/courses/total", async (_req, res) => {
    try {
        const data = await course_1.default.getTotalOfCoursesAvailable();
        res.status(http_status_1.default.OK).json({ data });
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
// get the courses already offered by a student
router.get("/courses/student/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await course_2.default.getCoursesEnrolledByStudent(id);
        res.status(http_status_1.default.OK).json({ data });
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
// get the total courses already offered by a student
router.get("/courses/student/:id/total", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await course_2.default.getTotalCoursesEnrolledByStudent(id);
        res.status(http_status_1.default.OK).json({ data });
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
/**
 * Edit an enrolled course details
 * Method: PUT
 * payload {course Id}
 */
router.put("/course/student/edit/:enrolledCourseId", auth_1.isSuperAdmin, async (req, res) => {
    try {
        const enrolledCourseId = req.params.enrolledCourseId;
        const { student_id, course_id, camp_id, mode, location_id } = req.body;
        const data = await course_3.default.editEnrolledCourseById(enrolledCourseId, {
            student_id,
            course_id,
            camp_id,
            mode,
            location_id,
        });
        res
            .status(http_status_1.default.OK)
            .json({ msg: "student course has updated", data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
/**
 * Delete an enrolled course details
 * Method: PUT
 * payload {course Id}
 */
router.put("/course/student/delete/:enrolledCourseId", auth_1.isSuperAdmin, async (req, res) => {
    try {
        const enrolledCourseId = req.params.enrolledCourseId;
        // const { student_id } = req.body;
        const data = await course_3.default.deleteEnrolledCourseById(enrolledCourseId);
        res
            .status(http_status_1.default.OK)
            .json({ msg: "student course has deleted", data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
/**
 * Edit an a Course's details
 * Method: PUT
 * payload {Id}
 */
router.put("/course/edit/:courseId", auth_1.isSuperAdmin, async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const { course_name, course_code } = req.body;
        const data = await course_3.default.editCourseById(courseId, {
            course_name,
            course_code,
        });
        res.status(http_status_1.default.OK).json({ data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
exports.default = router;
//# sourceMappingURL=course.js.map