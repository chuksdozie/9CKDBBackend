import httpStatus from "http-status";
import { APIError } from "../../config/error";
import {
  deleteStudentByParentQuery,
  deleteStudentQuery,
  editStudentQuery,
  getAllStudentsQuery,
  getStudentByIdQuery,
  getStudentByParentIdQuery,
  getTotalOfStudentsForCurrentYearQuery,
  getTotalOfStudentsForFourYearsBackQuery,
  getTotalOfStudentsForOneYearBackQuery,
  getTotalOfStudentsForThreeYearsBackQuery,
  getTotalOfStudentsForTwoYearsBackQuery,
  getTotalOfStudentsQuery,
  registerChildQuery,
} from "../../queries";
import { now } from "../../utils";

async function registerChild(payload: childRegisterPayload) {
  try {
    const [student] = await registerChildQuery(payload);
    return student;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// get total of all the students in the db
async function getTotalOfStudents() {
  try {
    const totalStudents = await getTotalOfStudentsQuery();
    return totalStudents;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// get total of students each for the past 5 years
async function getTotalOfStudentsPerYear() {
  try {
    const [currentYearTotal] = await getTotalOfStudentsForCurrentYearQuery();
    const [aYearBackTotal] = await getTotalOfStudentsForOneYearBackQuery();
    const [twoYearsBackTotal] = await getTotalOfStudentsForTwoYearsBackQuery();
    const [threeYearsBackTotal] =
      await getTotalOfStudentsForThreeYearsBackQuery();
    const [fourYearsBackTotal] =
      await getTotalOfStudentsForFourYearsBackQuery();

    // const totalStudentsPerYear = [
    //   { "current year": currentYearTotal },
    //   { "a year back": aYearBackTotal },
    //   { "2 years back": twoYearsBackTotal },
    //   { "3 years back": threeYearsBackTotal },
    //   { "4 years back": fourYearsBackTotal },
    // ];

    const totalStudentsPerYear = [
      currentYearTotal,
      aYearBackTotal,
      twoYearsBackTotal,
      threeYearsBackTotal,
      fourYearsBackTotal,
    ];
    return totalStudentsPerYear;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// get all the students in the db
async function getAllStudents() {
  try {
    const student = await getAllStudentsQuery();
    return student;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// get student by student id
async function getStudentById(id: string) {
  try {
    const [student] = await getStudentByIdQuery(id);
    return student;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// edit student details
async function editSudent(id: string, payload: editStudentPayload) {
  try {
    const studentToEdit = await getStudentByIdQuery(id);

    if (!studentToEdit.length) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        errors: "Student to edit not found",
        message: "Student to edit not found",
      });
    }

    const editPayload = {
      first_name: payload.first_name || studentToEdit[0].first_name,
      last_name: payload.last_name || studentToEdit[0].last_name,
      date_of_birth: payload.date_of_birth || studentToEdit[0].date_of_birth,
      family_id: studentToEdit[0].family_id,
      sex: payload.sex || studentToEdit[0].sex,

      updated_at: now(),
    };

    const [editedStudent] = await editStudentQuery(id, editPayload);
    return editedStudent;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// delete students details
async function deleteStudent(id: string) {
  try {
    const childToEdit = await getStudentByIdQuery(id);

    if (!childToEdit.length) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        errors: "Student to delete not found",
        message: "Student to delete not found",
      });
    }

    const editPayload = {
      deleted_at: now(),
    };

    const [editedStudent] = await deleteStudentQuery(id, editPayload);
    return editedStudent;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

// delete students by parent ID details
async function deleteStudentByParentId(id: string) {
  try {
    const childToEdit = await getStudentByParentIdQuery(id);
    console.log(childToEdit);
    if (!childToEdit.length) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        errors: "Student to delete not found",
        message: "Student to delete not found",
      });
    }

    // for (let i = 0; i < childToEdit.length; i++) {
    // text += cars[i] + "<br>";
    // }
    const editPayload = {
      deleted_at: now(),
    };

    const editedStudent = await deleteStudentByParentQuery(id, editPayload);
    return editedStudent;
  } catch (error) {
    throw new APIError({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      errors: error,
      message: error.message || error,
    });
  }
}

export default {
  registerChild,
  getTotalOfStudents,
  getTotalOfStudentsPerYear,
  getAllStudents,
  getStudentById,
  editSudent,
  deleteStudent,
  deleteStudentByParentId,
};
