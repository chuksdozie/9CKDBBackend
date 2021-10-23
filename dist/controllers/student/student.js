"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const error_1 = require("../../config/error");
const queries_1 = require("../../queries");
const utils_1 = require("../../utils");
async function registerChild(payload) {
    try {
        const [student] = await (0, queries_1.registerChildQuery)(payload);
        return student;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// get total of all the students in the db
async function getTotalOfStudents() {
    try {
        const totalStudents = await (0, queries_1.getTotalOfStudentsQuery)();
        return totalStudents;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// get total of students each for the past 5 years
async function getTotalOfStudentsPerYear() {
    try {
        const [currentYearTotal] = await (0, queries_1.getTotalOfStudentsForCurrentYearQuery)();
        const [aYearBackTotal] = await (0, queries_1.getTotalOfStudentsForOneYearBackQuery)();
        const [twoYearsBackTotal] = await (0, queries_1.getTotalOfStudentsForTwoYearsBackQuery)();
        const [threeYearsBackTotal] = await (0, queries_1.getTotalOfStudentsForThreeYearsBackQuery)();
        const [fourYearsBackTotal] = await (0, queries_1.getTotalOfStudentsForFourYearsBackQuery)();
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
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// get all the students in the db
async function getAllStudents() {
    try {
        const student = await (0, queries_1.getAllStudentsQuery)();
        return student;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// get student by student id
async function getStudentById(id) {
    try {
        const [student] = await (0, queries_1.getStudentByIdQuery)(id);
        return student;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// edit student details
async function editSudent(id, payload) {
    try {
        const studentToEdit = await (0, queries_1.getStudentByIdQuery)(id);
        if (!studentToEdit.length) {
            throw new error_1.APIError({
                status: http_status_1.default.NOT_FOUND,
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
            updated_at: (0, utils_1.now)(),
        };
        const [editedStudent] = await (0, queries_1.editStudentQuery)(id, editPayload);
        return editedStudent;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// delete students details
async function deleteStudent(id) {
    try {
        const childToEdit = await (0, queries_1.getStudentByIdQuery)(id);
        if (!childToEdit.length) {
            throw new error_1.APIError({
                status: http_status_1.default.NOT_FOUND,
                errors: "Student to delete not found",
                message: "Student to delete not found",
            });
        }
        const editPayload = {
            deleted_at: (0, utils_1.now)(),
        };
        const [editedStudent] = await (0, queries_1.deleteStudentQuery)(id, editPayload);
        return editedStudent;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// delete students by parent ID details
async function deleteStudentByParentId(id) {
    try {
        const childToEdit = await (0, queries_1.getStudentByParentIdQuery)(id);
        console.log(childToEdit);
        if (!childToEdit.length) {
            throw new error_1.APIError({
                status: http_status_1.default.NOT_FOUND,
                errors: "Student to delete not found",
                message: "Student to delete not found",
            });
        }
        // for (let i = 0; i < childToEdit.length; i++) {
        // text += cars[i] + "<br>";
        // }
        const editPayload = {
            deleted_at: (0, utils_1.now)(),
        };
        const editedStudent = await (0, queries_1.deleteStudentByParentQuery)(id, editPayload);
        return editedStudent;
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
    registerChild,
    getTotalOfStudents,
    getTotalOfStudentsPerYear,
    getAllStudents,
    getStudentById,
    editSudent,
    deleteStudent,
    deleteStudentByParentId,
};
//# sourceMappingURL=student.js.map