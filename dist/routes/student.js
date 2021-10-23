"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_1 = __importDefault(require("http-status"));
const student_1 = __importDefault(require("../controllers/student/student"));
const student_2 = __importDefault(require("../controllers/student/student"));
const auth_1 = require("../middlewares/auth");
const student_3 = __importDefault(require("../controllers/student/student"));
const router = (0, express_1.Router)();
router.post("/register/child", async (req, res) => {
    try {
        const { first_name, last_name, family_id, date_of_birth, sex } = req.body;
        const data = await student_1.default.registerChild({
            first_name,
            last_name,
            family_id,
            date_of_birth,
            sex,
        });
        res.status(http_status_1.default.CREATED).json({ data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
router.get("/students/total", async (_req, res) => {
    try {
        const data = await student_2.default.getTotalOfStudents();
        res.status(http_status_1.default.OK).json({ data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
// get total of students per year 5 years back
router.get("/students/totalperyear", async (_req, res) => {
    try {
        const data = await student_2.default.getTotalOfStudentsPerYear();
        res.status(http_status_1.default.OK).json({ data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
router.get("/students", async (_req, res) => {
    try {
        const data = await student_1.default.getAllStudents();
        res.status(http_status_1.default.OK).json({ data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
router.get("/student/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await student_1.default.getStudentById(id);
        res.status(http_status_1.default.OK).json({ data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
/**
 * Edit a student details
 * Method: PUT
 * payload {Camp Id}
 */
router.put("/student/edit/:id", auth_1.isSuperAdmin, async (req, res) => {
    try {
        const studentId = req.params.id;
        const { first_name, last_name, date_of_birth, sex } = req.body;
        const data = await student_3.default.editSudent(studentId, {
            first_name,
            last_name,
            date_of_birth,
            sex,
        });
        res
            .status(http_status_1.default.OK)
            .json({ message: "student details have been updated", data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
/**
 * Edit a students details
 * Method: PUT
 * payload {Camp Id}
 */
router.put("/student/delete/:id", auth_1.isSuperAdmin, async (req, res) => {
    try {
        const studentId = req.params.id;
        const data = await student_3.default.deleteStudent(studentId);
        res
            .status(http_status_1.default.OK)
            .json({ message: "student details have been deleted", data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
exports.default = router;
//# sourceMappingURL=student.js.map