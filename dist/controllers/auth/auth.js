"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.sendResetPasswordTokenViaEmail = exports.loginAdmin = exports.verifyEmail = exports.sendTokenViaEmail = void 0;
var uuid = require("uuid");
const redis_1 = __importStar(require("../../config/redis"));
const argon2_1 = __importDefault(require("argon2"));
const mailer_1 = require("../../config/mailer");
const queries_1 = require("../../queries");
const http_status_1 = __importDefault(require("http-status"));
const error_1 = require("../../config/error");
const database_1 = require("../../stores/database");
const tokenUtils_1 = require("../../utils/tokenUtils");
const utils_1 = require("../../utils");
async function sendTokenViaEmail(email) {
    /*
        gen token
        sensd token in mail body
      */
    const token = uuid.v4();
    const emailKey = `${redis_1.REDIS_PREFIX}-${token}`;
    const mainurl = `${process.env.BASE_URL}/api/auth/verify/${token}`;
    redis_1.default.set(emailKey, email);
    const tokenurl = `<p>Thanks for registering, please <a href="${mainurl}", target="_blank">click here</a> to verify your email.</p>`;
    (0, mailer_1.sendmailRef)(email, tokenurl);
    // tokenVerification(email)
}
exports.sendTokenViaEmail = sendTokenViaEmail;
async function verifyEmail(token) {
    try {
        const emailKey = `${redis_1.REDIS_PREFIX}-${token}`;
        /*
        check if token is in redis ✅
        get email from token ✅
        verify email on table ✅
        return a response
         */
        const keyExists = await redis_1.default.exists(emailKey);
        // if key does not exist
        if (keyExists === 0) {
            throw new Error("Invalid token");
        }
        const email = (await redis_1.default.get(emailKey));
        console.log(email);
        const [verifiedUser] = await (0, queries_1.verifyAdminQuery)(email);
        const tokeng = (0, tokenUtils_1.signToken)({
            id: verifiedUser.id,
            verified: verifiedUser.verified,
        });
        const { password } = verifiedUser, rest = __rest(verifiedUser, ["password"]);
        return [
            rest,
            tokeng,
            `${verifiedUser.admin_firstname}, You have been verified`,
        ];
    }
    catch (error) {
        console.error(error);
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
exports.verifyEmail = verifyEmail;
async function loginAdmin(email, password) {
    /*
    get an email and password
    check if that email is in the database
    check if the email has the same password in the database
    verify if the password is equal to the password in the database
    verify if the email is equal to the email in the database
    */
    console.log(password);
    console.log(email);
    const [admin] = await (0, database_1.sql) `SELECT * FROM admins WHERE official_email = ${email}`;
    try {
        if (!admin.verified) {
            throw new error_1.APIError({
                status: http_status_1.default.NOT_FOUND,
                message: "Admin not verified",
                errors: "Admin not verified",
            });
        }
        if (!admin) {
            console.log("fff");
            throw new error_1.APIError({
                status: http_status_1.default.NOT_FOUND,
                message: "Incorrect Credentials",
                errors: "User not found",
            });
        }
        const [pass] = await (0, queries_1.loginAdminQuery)(email);
        console.log(pass.password);
        console.log(pass.official_email);
        if ((await argon2_1.default.verify(pass.password, password)) &&
            pass.official_email == email) {
            pass.logged_at = (0, utils_1.now)();
            (0, database_1.sql) `UPDATE admins SET logged_at = ${pass.logged_at} 
        WHERE official_email = ${email}`;
            console.log("comfirmed credentials");
            const tokeng = (0, tokenUtils_1.signAdminToken)({
                id: pass.id,
                role: pass.role,
                verified: pass.verified,
                owner: pass.owner,
            });
            return [pass, tokeng];
        }
        else {
            console.log("wrong credentials");
            throw new error_1.APIError({
                status: http_status_1.default.BAD_REQUEST,
                message: "Incorrect Credentials",
                errors: "Incorrect Credentials",
            });
        }
    }
    catch (error) {
        console.error(error);
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
exports.loginAdmin = loginAdmin;
async function sendResetPasswordTokenViaEmail(email) {
    /*
        gen token
        sensd token in mail body
      */
    try {
        const [adminData] = await (0, queries_1.getAdminByEmailQuery)(email);
        const id = adminData.id;
        // const token = uuid.v4();
        // const emailKey = `${REDIS_PREFIX}-${token}`;
        const mainurl = `${process.env.BASE_URL}/auth/resetpassword/${id}`;
        // redis.set(emailKey, email);
        const tokenurl = `<p>Please <a href="${mainurl}", target="_blank">click here</a> to reset your password.</p>`;
        (0, mailer_1.sendmailRef)(email, tokenurl);
        // tokenVerification(email)
    }
    catch (error) {
        console.error(error);
        throw new error_1.APIError({
            status: error.status || http_status_1.default.INTERNAL_SERVER_ERROR,
            errors: error,
            message: error.message || error,
        });
    }
}
exports.sendResetPasswordTokenViaEmail = sendResetPasswordTokenViaEmail;
//# sourceMappingURL=auth.js.map