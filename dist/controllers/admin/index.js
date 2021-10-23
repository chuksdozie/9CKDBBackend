"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const argon2_1 = __importDefault(require("argon2"));
const error_1 = require("../../config/error");
const queries_1 = require("../../queries");
const auth_1 = require("../auth/auth");
const utils_1 = require("../../utils");
const mailer_1 = require("../../config/mailer");
const auth_2 = require("../../middlewares/auth");
// import {Request,Response} from 'express'
async function signUpAdmin(payload) {
    try {
        const hashedPassword = await argon2_1.default.hash(payload.password);
        const [admin] = await (0, queries_1.signUpAdminQuery)(Object.assign(Object.assign({}, payload), { password: hashedPassword }));
        (0, auth_1.sendTokenViaEmail)(payload.official_email);
        console.log(payload.password);
        return admin;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
/**
create a new admin 🆗
generate a hashed password as admin password 🆗
verify the user 🆗
send the unhashed password to the admins email 🆗
**/
async function addNewAdmin(payload) {
    try {
        const password = (0, utils_1.newPassword)();
        const hashedPassword = await argon2_1.default.hash(password);
        const [newAdmin] = await (0, queries_1.addNewAdminQuery)(Object.assign(Object.assign({}, payload), { role: "admin", password: hashedPassword }));
        const [verifiedUser] = await (0, queries_1.verifyOwnerAdminQuery)(newAdmin.official_email);
        const passwordUrl = `<p>Use the following details to login to the Student Record Database<br>
      email:  <strong>${newAdmin.official_email}</strong><br>
      password:  <strong>${password}</strong><br>
      Please feel free to change your password anytime
      </p>`;
        // takes in email address and content in html
        (0, mailer_1.sendmailRef)(newAdmin.official_email, passwordUrl);
        console.log(verifiedUser);
        console.log(password);
        // signAdminToken({
        //   id: verifiedUser.id,
        //   role: verifiedUser.role,
        //   verified: verifiedUser.verified
        // })
        return verifiedUser;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
/**
create a new super admin 🆗
generate a hashed password as admin password 🆗
verify the user 🆗
send the unhashed password to the admins email 🆗
**/
async function addNewSuperAdmin(payload) {
    try {
        const password = (0, utils_1.newPassword)();
        const hashedPassword = await argon2_1.default.hash(password);
        const [newAdmin] = await (0, queries_1.addNewAdminQuery)(Object.assign(Object.assign({}, payload), { role: "super admin", owner: false, password: hashedPassword }));
        const [verifiedUser] = await (0, queries_1.verifyAdminQuery)(newAdmin.official_email);
        const passwordUrl = `<p>Use the following details to login to the Student Record Database<br>
      email:  <strong>${newAdmin.official_email}</strong><br>
      password:  <strong>${password}</strong><br>
      Please feel free to change your password anytime
      </p>`;
        // takes in email address and content in html
        (0, mailer_1.sendmailRef)(newAdmin.official_email, passwordUrl);
        console.log(verifiedUser);
        console.log(password);
        // signAdminToken({
        //   id: verifiedUser.id,
        //   role: verifiedUser.role,
        //   verified: verifiedUser.verified
        // })
        return verifiedUser;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// get admin details by id
async function getAdminById(id) {
    try {
        const [admin] = await (0, queries_1.getAdminByIdQuery)(id);
        return admin;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// a collection of admins recent logins
async function recentAdminLogin() {
    try {
        const admin = await (0, queries_1.recentAdminLoginQuery)();
        console.log(admin);
        return admin;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// a collection of admins recent logins
async function getAllAdmins() {
    try {
        const admin = await (0, queries_1.getAllAdminsQuery)();
        console.log(admin);
        return admin;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// getting all the regular admins
async function getRegularAdmins() {
    try {
        const admin = await (0, queries_1.getRegularAdminsQuery)();
        console.log(admin);
        return admin;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// edit details of an admin
async function editAdminById(id, payload) {
    try {
        const adminToEdit = await (0, queries_1.getAdminByIdQuery)(id);
        if (!adminToEdit.length) {
            throw new error_1.APIError({
                status: http_status_1.default.NOT_FOUND,
                errors: "Admin to edit not found",
                message: "Admin to edit not found",
            });
        }
        let hashedPassword;
        const { password } = payload;
        console.log("1");
        console.log(adminToEdit[0].password);
        console.log(adminToEdit[0].admin_lastname);
        console.log("thanks");
        console.log(password);
        if (password) {
            hashedPassword = await argon2_1.default.hash(password);
        }
        else {
            hashedPassword = adminToEdit[0].password;
        }
        const editPayload = {
            admin_firstname: payload.admin_firstname || adminToEdit[0].admin_firstname,
            admin_lastname: payload.admin_lastname || adminToEdit[0].admin_lastname,
            official_email: payload.official_email || adminToEdit[0].official_email,
            admin_phonenumber: payload.admin_phonenumber || adminToEdit[0].admin_phonenumber,
            password: hashedPassword,
            updated_at: (0, utils_1.now)(),
        };
        const [editedAdmin] = await (0, queries_1.editAdminQuery)(id, editPayload);
        const { password: _ } = editedAdmin, rest = __rest(editedAdmin, ["password"]);
        return rest;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// edit details of an admin
async function editAdminRoleById(id, payload) {
    try {
        const adminToEdit = await (0, queries_1.getAdminByIdQuery)(id);
        if (!adminToEdit.length) {
            throw new error_1.APIError({
                status: http_status_1.default.NOT_FOUND,
                errors: "Admin to edit not found",
                message: "Admin to edit not found",
            });
        }
        const editPayload = {
            admin_firstname: payload.admin_firstname || adminToEdit[0].admin_firstname,
            admin_lastname: payload.admin_lastname || adminToEdit[0].admin_lastname,
            official_email: payload.official_email || adminToEdit[0].official_email,
            admin_phonenumber: payload.admin_phonenumber || adminToEdit[0].admin_phonenumber,
            role: payload.role || adminToEdit[0].role,
            updated_at: (0, utils_1.now)(),
        };
        const [editedAdmin] = await (0, queries_1.editAdminRoleQuery)(id, editPayload);
        return editedAdmin;
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
async function changePassword(id, newPassword, payload) {
    try {
        const adminToEdit = await (0, queries_1.getAdminPasswordByIdQuery)(id);
        if (!adminToEdit.length) {
            throw new error_1.APIError({
                status: http_status_1.default.NOT_FOUND,
                errors: "Admin to edit not found",
                message: "Admin to edit not found",
            });
        }
        let hashedPassword;
        const { password } = payload;
        if (password) {
            if (await argon2_1.default.verify(adminToEdit[0].password, password)) {
                hashedPassword = await argon2_1.default.hash(newPassword);
            }
            else {
                throw new error_1.APIError({
                    status: http_status_1.default.CONFLICT,
                    errors: "Password does not match current Admin password",
                    message: "Password does not match current Admin password",
                });
            }
        }
        else {
            throw new error_1.APIError({
                status: http_status_1.default.CONFLICT,
                errors: "You have not confirmed you current password",
                message: "You have not confirmed you current password",
            });
        }
        const editPayload = {
            password: hashedPassword,
            updated_at: (0, utils_1.now)(),
        };
        const [editedAdmin] = await (0, queries_1.editAdminPasswordQuery)(id, editPayload);
        const { password: _ } = editedAdmin, rest = __rest(editedAdmin, ["password"]);
        return rest;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// send password reset token to email
async function forgotPassword(email) {
    try {
        const adminToEdit = await (0, queries_1.getAdminByEmailQuery)(email);
        console.log(1, email);
        console.log(2, adminToEdit);
        if (!adminToEdit.length) {
            throw new error_1.APIError({
                status: http_status_1.default.NOT_FOUND,
                errors: "Admin not found",
                message: "Admin not found",
            });
        }
        else {
            (0, auth_1.sendResetPasswordTokenViaEmail)(email);
        }
        return adminToEdit;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// use password reset token to set a new password
async function resetPassword(id, newPassword) {
    try {
        const adminToEdit = await (0, queries_1.getAdminByIdQuery)(id);
        if (!adminToEdit.length) {
            throw new error_1.APIError({
                status: http_status_1.default.NOT_FOUND,
                errors: "Admin not found",
                message: "Admin not found",
            });
        }
        let hashedPassword;
        hashedPassword = await argon2_1.default.hash(newPassword);
        const editPayload = {
            password: hashedPassword,
            updated_at: (0, utils_1.now)(),
        };
        const [editedAdmin] = await (0, queries_1.editAdminPasswordQuery)(id, editPayload);
        const { password: _ } = editedAdmin, rest = __rest(editedAdmin, ["password"]);
        return rest;
    }
    catch (error) {
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
// edit details of an admin
async function deleteAdminById(id, payload) {
    try {
        const adminToEdit = await (0, queries_1.getAdminByIdQuery)(id);
        if (!adminToEdit.length) {
            throw new error_1.APIError({
                status: http_status_1.default.NOT_FOUND,
                errors: "Admin to edit not found",
                message: "Admin to edit not found",
            });
        }
        if (adminToEdit[0].role == "super admin") {
            auth_2.isOwner;
        }
        const editPayload = {
            admin_firstname: payload.admin_firstname,
            admin_lastname: payload.admin_lastname,
            official_email: payload.official_email,
            deleted_at: (0, utils_1.now)(),
        };
        const [editedAdmin] = await (0, queries_1.deleteAdminByIdQuery)(id, editPayload);
        return editedAdmin;
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
    signUpAdmin,
    addNewAdmin,
    addNewSuperAdmin,
    editAdminById,
    editAdminRoleById,
    getAdminById,
    recentAdminLogin,
    getAllAdmins,
    getRegularAdmins,
    changePassword,
    forgotPassword,
    resetPassword,
    deleteAdminById,
};
//# sourceMappingURL=index.js.map