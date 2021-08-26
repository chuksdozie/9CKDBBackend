"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendmail = exports.getUserFromToken = exports.signAdminToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../config/error");
const nodemailer = require('nodemailer');
/**
 * A function to encode user details in a token
 * @param payload User object to sign
 */
function signToken(payload) {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new error_1.APIError({
            status: 400,
            message: 'Token secret not found',
            errors: 'No token secret',
        });
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '1d' });
}
exports.signToken = signToken;
/**
 * A function to encode user details in a token
 * @param payload User object to sign
 */
function signAdminToken(payload) {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new error_1.APIError({
            status: 400,
            message: 'Token secret not found',
            errors: 'No token secret',
        });
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '1d' });
}
exports.signAdminToken = signAdminToken;
/**
 * A fn to decode token into user ID or object
 * @param token Token to decode
 */
function getUserFromToken(token) {
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret)
            throw new error_1.APIError({
                status: 400,
                message: 'Token secret not found',
                errors: 'No token secret',
            });
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return decoded;
    }
    catch (error) {
        console.error(error);
        throw new error_1.APIError({
            message: error.message,
            status: 500,
        });
    }
}
exports.getUserFromToken = getUserFromToken;
function sendmail(res) {
    const mailTransporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'orval.jacobi67@ethereal.email',
            pass: 'Ttn5RN9BJRT4CJ7zws'
        }
    });
    let mailDetails = {
        from: 'orval.jacobi67@ethereal.email',
        to: 'chuksdozie48@gmail.com',
        subject: 'Test mail',
        html: `<p>Thanks for registering, please <a href="http://localhost:4500/">click here</a> to verify your email.</p>`,
    };
    mailTransporter.sendMail(mailDetails, function (err, _data) {
        if (err) {
            console.log('Error Occurs');
        }
        else {
            console.log('Email sent successfully');
            res.send(`Verification mail has been sent to ${mailDetails.to}`);
        }
    });
}
exports.sendmail = sendmail;
//# sourceMappingURL=tokenUtils.js.map