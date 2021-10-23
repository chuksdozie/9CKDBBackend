"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_1 = __importDefault(require("http-status"));
const family_1 = __importDefault(require("../controllers/family/family"));
const auth_1 = require("../middlewares/auth");
const family_2 = __importDefault(require("../controllers/family/family"));
const student_1 = __importDefault(require("../controllers/student/student"));
const router = (0, express_1.Router)();
router.post("/register/parent", async (req, res) => {
    try {
        const { parent_firstname, parent_lastname, parent_phonenumber, emergency_firstname, emergency_lastname, emergency_phonenumber, parent_email, home_address, city, how_parent_heard_about_us, } = req.body;
        const data = await family_1.default.registerParent({
            parent_firstname,
            parent_lastname,
            parent_phonenumber,
            emergency_firstname,
            emergency_lastname,
            emergency_phonenumber,
            parent_email,
            home_address,
            city,
            how_parent_heard_about_us,
        });
        res.status(http_status_1.default.CREATED).json({ data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
router.get("/parent/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await family_1.default.getParentById(id);
        res.status(http_status_1.default.OK).json({ data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
// get all parent in db
router.get("/parents", async (_req, res) => {
    try {
        const data = await family_1.default.getAllParents();
        res.status(http_status_1.default.OK).json({ data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
// get all students belonging to a parent in db
router.get("/parent/students/:family_id", async (req, res) => {
    try {
        const family_id = req.params.family_id;
        const data = await family_1.default.getStudentsByParentId(family_id);
        res.status(http_status_1.default.OK).json({ data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
// get total number of students belonging to a parent in db
router.get("/parent/students/total/:family_id", async (req, res) => {
    try {
        const family_id = req.params.family_id;
        const data = await family_1.default.getTotalStudentsByParentId(family_id);
        res.status(http_status_1.default.OK).json({ data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
/**
 * Edit a pareents details
 * Method: PUT
 * payload {Camp Id}
 */
router.put("/parent/:id", auth_1.isSuperAdmin, async (req, res) => {
    try {
        const parentId = req.params.id;
        const { parent_firstname, parent_lastname, parent_phonenumber, emergency_firstname, emergency_lastname, emergency_phonenumber, parent_email, home_address, city, how_parent_heard_about_us, } = req.body;
        const data = await family_2.default.editParent(parentId, {
            parent_firstname,
            parent_lastname,
            parent_phonenumber,
            emergency_firstname,
            emergency_lastname,
            emergency_phonenumber,
            parent_email,
            home_address,
            city,
            how_parent_heard_about_us,
        });
        res
            .status(http_status_1.default.OK)
            .json({ message: "parent details have been updated", data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
/**
 * Edit a pareents details
 * Method: PUT
 * payload {Camp Id}
 */
router.put("/parent/delete/:id", auth_1.isSuperAdmin, async (req, res) => {
    try {
        const parentId = req.params.id;
        const datum = await student_1.default.deleteStudentByParentId(parentId);
        const data = await family_2.default.deleteParent(parentId);
        res.status(http_status_1.default.OK).json({
            message: "parent details and children of parent has been deleted",
            data,
            datum,
        });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
exports.default = router;
//# sourceMappingURL=family.js.map