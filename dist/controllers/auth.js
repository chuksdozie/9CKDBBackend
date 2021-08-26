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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendmailRef = exports.sendTokenViaEmail = void 0;
var uuid = require('uuid');
const nodemailer = require('nodemailer');
const redis_1 = __importStar(require("../config/redis"));
async function sendTokenViaEmail(email) {
    /*
      gen token
      sensd token in mail body
    */
    const token = uuid.v4();
    const tokenurl = `<p>Thanks for registering, please <a href="http://localhost:4500/verify/${token}">click here</a> to verify your email.</p>`;
    redis_1.default.set(`${redis_1.REDIS_PREFIX}-${token}`, `${token}`);
    sendmailRef(email, tokenurl);
}
exports.sendTokenViaEmail = sendTokenViaEmail;
function sendmailRef(to, html) {
    let mailTransporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'leo.jerde@ethereal.email',
            pass: 'RVjVA4vDSPpUZ5DZQv'
        }
    });
    let mailDetails = {
        from: 'leo.jerde@ethereal.email',
        to,
        subject: 'Test mail',
        html,
    };
    mailTransporter.sendMail(mailDetails, function (err, _data) {
        if (err) {
            console.log('Error Occurs');
            console.error(err);
        }
        else {
            console.log('Email sent successfully');
        }
    });
}
exports.sendmailRef = sendmailRef;
//# sourceMappingURL=auth.js.map