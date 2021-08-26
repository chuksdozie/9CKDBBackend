"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const error_1 = require("../../config/error");
const utils_1 = require("../../utils");
const queries_1 = require("../../queries");
// adding a new course to the db
async function addNewCourse(payload) {
    try {
        const [course] = await queries_1.addNewCourseQuery(payload);
        return course;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// adding a new course to a students record
async function coursesEnrolled(payload) {
    try {
        const [course] = await queries_1.coursesEnrolledQuery(payload);
        return course;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// get the total number of courses available
async function getTotalOfCoursesAvailable() {
    try {
        const totalCourses = await queries_1.getTotalOfCoursesAvailableQuery();
        return totalCourses;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// get the total number of courses available
async function getAllCoursesAvailable() {
    try {
        const course = await queries_1.getAllCoursesAvailableQuery();
        return course;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// get COURSES A particular student has registered
async function getCoursesEnrolledByStudent(student_id) {
    try {
        const studentCourses = await queries_1.getCoursesEnrolledByStudentQuery(student_id);
        return studentCourses;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// get TOTAL COURSES A particular student has registered
async function getTotalCoursesEnrolledByStudent(student_id) {
    try {
        const studentCourses = await queries_1.getTotalCoursesEnrolledByStudentQuery(student_id);
        return studentCourses;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// get a course by ID
async function getCourseById(id) {
    try {
        const course = await queries_1.getCourseByIdQuery(id);
        return course;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// edit details in a course
async function editCourseById(id, payload) {
    try {
        const courseToEdit = await getCourseById(id);
        if (!courseToEdit.length) {
            throw new error_1.APIError({
                status: http_status_1.default.NOT_FOUND,
                errors: "Course to edit not found",
                message: "Course to edit not found",
            });
        }
        const editPayload = {
            course_name: payload.course_name || courseToEdit[0].course_name,
            course_code: payload.course_code || courseToEdit[0].course_code,
            updated_at: utils_1.now(),
        };
        const [editedCourse] = await queries_1.editCourseQuery(id, editPayload);
        return editedCourse;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// edit details in an enrolled course
async function editEnrolledCourseById(id, payload) {
    try {
        const courseToEdit = await queries_1.getEnrolledCourseByIdQuery(id);
        if (!courseToEdit.length) {
            throw new error_1.APIError({
                status: http_status_1.default.NOT_FOUND,
                errors: "Course to edit not found",
                message: "Course to edit not found",
            });
        }
        const editPayload = {
            student_id: courseToEdit[0].student_id,
            course_id: payload.course_id || courseToEdit[0].course_id,
            camp_id: payload.camp_id || courseToEdit[0].camp_id,
            mode: payload.mode || courseToEdit[0].mode,
            location_id: payload.location_id || courseToEdit[0].location_id,
            updated_at: utils_1.now(),
        };
        const [editedCourse] = await queries_1.editEnrolledCoursesByIdQuery(id, editPayload);
        return editedCourse;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// delete details in an enrolled course
async function deleteEnrolledCourseById(id) {
    try {
        const courseToEdit = await queries_1.getEnrolledCourseByIdQuery(id);
        if (!courseToEdit.length) {
            throw new error_1.APIError({
                status: http_status_1.default.NOT_FOUND,
                errors: "Course to edit not found",
                message: "Course to edit not found",
            });
        }
        const editPayload = {
            deleted_at: utils_1.now(),
        };
        const [editedCourse] = await queries_1.deleteEnrolledCoursesByIdQuery(id, editPayload);
        return editedCourse;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
exports.default = {
    addNewCourse,
    coursesEnrolled,
    getCourseById,
    editCourseById,
    editEnrolledCourseById,
    deleteEnrolledCourseById,
    getAllCoursesAvailable,
    getTotalOfCoursesAvailable,
    getCoursesEnrolledByStudent,
    getTotalCoursesEnrolledByStudent,
};
//# sourceMappingURL=course.js.map