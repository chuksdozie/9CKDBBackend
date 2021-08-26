"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmation = void 0;
const nodemailer = require("nodemailer");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import httpStatus from 'http-status';
// import { APIError } from '../config/error';
// let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: 'leo.jerde@ethereal.email',
//         pass: 'RVjVA4vDSPpUZ5DZQv'
//     },
//   });
//     // send mail with defined transport object
//     let info = transporter.sendMail({
//         from: '"Fred Foo 👻" <foo@example.com>', // sender address
//         to: "bar@example.com, baz@example.com", // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>", // html body
//       });
//       console.log("Message sent: %s", info.messageId);
//       // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
const confirmation = (req, res) => {
    let token = req.query.id;
    if (token) {
        try {
            jsonwebtoken_1.default.verify(token, config.jwt_secret_mail, (e, decoded) => {
                if (e) {
                    console.log(e);
                    return res.sendStatus(403);
                }
                else {
                    id = decoded.id;
                    //Update your database here with whatever the verification flag you are using 
                }
            });
        }
        catch (err) {
            console.log(err);
            return res.sendStatus(403);
        }
    }
    else {
        return res.sendStatus(403);
    }
};
exports.confirmation = confirmation;
//# sourceMappingURL=confirmation.js.map