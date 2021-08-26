import httpStatus from "http-status";
import { APIError } from "../../config/error";
import { now } from "../../utils";
import {
  addNewCourseQuery,
  coursesEnrolledQuery,
  deleteEnrolledCoursesByIdQuery,
  editCourseQuery,
  editEnrolledCoursesByIdQuery,
  getAllCoursesAvailableQuery,
  getCourseByIdQuery,
  getCoursesEnrolledByStudentQuery,
  getEnrolledCourseByIdQuery,
  getTotalCoursesEnrolledByStudentQuery,
  getTotalOfCoursesAvailableQuery,
} from "../../queries";

// adding a new course to the db
async function addNewCourse(payload: addNewCoursePayload) {
  try {
    const [course] = await addNewCourseQuery(payload);
    return course;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// adding a new course to a students record
async function coursesEnrolled(payload: coursesEnrolledPayload) {
  try {
    const [course] = await coursesEnrolledQuery(payload);
    return course;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// get the total number of courses available
async function getTotalOfCoursesAvailable() {
  try {
    const totalCourses = await getTotalOfCoursesAvailableQuery();
    return totalCourses;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// get the total number of courses available
async function getAllCoursesAvailable() {
  try {
    const course = await getAllCoursesAvailableQuery();
    return course;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// get COURSES A particular student has registered
async function getCoursesEnrolledByStudent(student_id: string) {
  try {
    const studentCourses = await getCoursesEnrolledByStudentQuery(student_id);
    return studentCourses;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// get TOTAL COURSES A particular student has registered
async function getTotalCoursesEnrolledByStudent(student_id: string) {
  try {
    const studentCourses = await getTotalCoursesEnrolledByStudentQuery(
      student_id
    );
    return studentCourses;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// get a course by ID
async function getCourseById(id: string) {
  try {
    const course = await getCourseByIdQuery(id);
    return course;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// edit details in a course
async function editCourseById(id: string, payload: editCoursePayload) {
  try {
    const courseToEdit = await getCourseById(id);

    if (!courseToEdit.length) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        errors: "Course to edit not found",
        message: "Course to edit not found",
      });
    }

    const editPayload = {
      course_name: payload.course_name || courseToEdit[0].course_name,
      course_code: payload.course_code || courseToEdit[0].course_code,
      updated_at: now(),
    };

    const [editedCourse] = await editCourseQuery(id, editPayload);
    return editedCourse;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// edit details in an enrolled course
async function editEnrolledCourseById(
  id: string,
  payload: editEnrolledCoursesPayload
) {
  try {
    const courseToEdit = await getEnrolledCourseByIdQuery(id);

    if (!courseToEdit.length) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
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
      updated_at: now(),
    };

    const [editedCourse] = await editEnrolledCoursesByIdQuery(id, editPayload);
    return editedCourse;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// delete details in an enrolled course
async function deleteEnrolledCourseById(id: string) {
  try {
    const courseToEdit = await getEnrolledCourseByIdQuery(id);

    if (!courseToEdit.length) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        errors: "Course to edit not found",
        message: "Course to edit not found",
      });
    }

    const editPayload = {
      deleted_at: now(),
    };

    const [editedCourse] = await deleteEnrolledCoursesByIdQuery(
      id,
      editPayload
    );
    return editedCourse;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

export default {
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
