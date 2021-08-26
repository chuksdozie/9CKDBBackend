"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = __importDefault(require("../controllers/admin"));
const admin_2 = __importDefault(require("../controllers/admin"));
const admin_3 = __importDefault(require("../controllers/admin"));
// import verify from '../controllers/admin'
const http_status_1 = __importDefault(require("http-status"));
const auth_1 = require("../controllers/auth/auth");
const auth_2 = require("../middlewares/auth");
const router = express_1.Router();
/**
 * Add an admin
 * Method: POST
 * payload {admin information}
 */
router.post("/create", async (req, res) => {
    try {
        const { admin_firstname, admin_lastname, admin_phonenumber, official_email, password, } = req.body;
        const data = await admin_1.default.signUpAdmin({
            admin_firstname,
            admin_lastname,
            admin_phonenumber,
            official_email,
            password,
        });
        res.status(http_status_1.default.CREATED).json({ data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
router.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;
        const data = await auth_1.verifyEmail(token);
        res.status(http_status_1.default.CREATED).json({ data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
router.post("/login", async (req, res) => {
    try {
        const { official_email, password } = req.body;
        const data = await auth_1.loginAdmin(official_email, password);
        res.status(http_status_1.default.CREATED).json({ data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
router.post("/create/newadmin", auth_2.isSuperAdmin, async (req, res) => {
    try {
        const { admin_firstname, admin_lastname, admin_phonenumber, official_email, } = req.body;
        const data = await admin_1.default.addNewAdmin({
            admin_firstname,
            admin_lastname,
            admin_phonenumber,
            official_email,
        });
        res.status(http_status_1.default.CREATED).json({ data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
router.post("/create/newsuperadmin", auth_2.isOwner, async (req, res) => {
    try {
        const { admin_firstname, admin_lastname, admin_phonenumber, official_email, } = req.body;
        const data = await admin_1.default.addNewSuperAdmin({
            admin_firstname,
            admin_lastname,
            admin_phonenumber,
            official_email,
        });
        res.status(http_status_1.default.CREATED).json({ data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
router.get("/admin/:id", auth_2.isAdmin, async (req, res) => {
    try {
        const id = req.admin.id;
        const data = await admin_1.default.getAdminById(id);
        res.status(http_status_1.default.OK).json({ data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
router.get("/admins/recentlogin", auth_2.isSuperAdmin, async (_req, res) => {
    try {
        const data = await admin_1.default.recentAdminLogin();
        console.log(data);
        res.status(http_status_1.default.OK).json({ data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
router.get("/admins/all", auth_2.isOwner, async (_req, res) => {
    try {
        const data = await admin_1.default.getAllAdmins();
        console.log(data);
        res.status(http_status_1.default.OK).json({ data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
// get all the regular admins
router.get("/admins/regular", async (_req, res) => {
    try {
        const data = await admin_1.default.getRegularAdmins();
        console.log(data);
        res.status(http_status_1.default.OK).json({ data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
/**
 * Edit a Admin's role
 * Method: PUT
 * payload {Admin Id}
 */
router.put("/admin/edit/adminrole/:adminId", auth_2.isOwner, async (req, res) => {
    try {
        const adminId = req.params.adminId;
        const { admin_firstname, admin_lastname, official_email, admin_phonenumber, role, } = req.body;
        const data = await admin_2.default.editAdminRoleById(adminId, {
            admin_firstname,
            admin_lastname,
            official_email,
            admin_phonenumber,
            role,
        });
        res
            .status(http_status_1.default.OK)
            .json({ message: `${admin_firstname} is now ${data.role}`, data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
/**
 * Edit a Admin's details
 * Method: PUT
 * payload {Admin Id}
 */
router.put("/admin/edit/:adminId", auth_2.isAdmin || auth_2.isSuperAdmin, async (req, res) => {
    try {
        const adminId = req.params.adminId;
        const { admin_firstname, admin_lastname, official_email, admin_phonenumber, password, } = req.body;
        const data = await admin_2.default.editAdminById(adminId, {
            admin_firstname,
            admin_lastname,
            official_email,
            admin_phonenumber,
            password,
        });
        res
            .status(http_status_1.default.OK)
            .json({ message: "your details have been updated", data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
/**
 * Delete an Admin
 * Method: PUT
 * payload {Admin Id}
 */
router.put("/admin/delete/:adminId", auth_2.isSuperAdmin, async (req, res) => {
    try {
        const adminId = req.params.adminId;
        const { official_email } = req.body;
        const data = await admin_2.default.deleteAdminById(adminId, {
            official_email,
        });
        res.status(http_status_1.default.OK).json({ message: "admin has been removed", data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
/**
 * Edit a Admin's details
 * Method: PUT
 * payload {Admin Id}
 */
router.put("/admin/changepassword/:adminId", auth_2.isAdmin || auth_2.isSuperAdmin, async (req, res) => {
    try {
        const adminId = req.params.adminId;
        const { password, newPassword } = req.body;
        const data = await admin_2.default.changePassword(adminId, newPassword, {
            password,
        });
        res
            .status(http_status_1.default.OK)
            .json({ message: "password change was successful", data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
router.get("/forgotpassword", async (req, res) => {
    try {
        const { official_email } = req.body;
        const [data] = await admin_3.default.forgotPassword(official_email);
        res.status(http_status_1.default.OK).json({
            message: `Password reset email has been sent to ${data.official_email}`,
            data,
        });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
/**
 * reset Admin's password
 * Method: PUT
 * payload {Admin Id}
 */
router.put("/resetpassword/:id", async (req, res) => {
    try {
        const adminId = req.params.id;
        const { newPassword } = req.body;
        const data = await admin_2.default.resetPassword(adminId, newPassword);
        res
            .status(http_status_1.default.OK)
            .json({ message: "password reset was successful", data });
        return;
    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        return;
    }
});
exports.default = router;
//# sourceMappingURL=admin.js.map