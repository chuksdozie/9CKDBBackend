"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendmailRef = void 0;
const nodemailer = require("nodemailer");
function sendmailRef(to, html) {
    const mailTransporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });
    let mailDetails = {
        from: process.env.EMAIL,
        to,
        subject: "Test mail",
        html,
    };
    // const mailTransporter = nodemailer.createTransport({
    //   host: 'smtp.ethereal.email',
    //   port: 587,
    //   auth: {
    //     user: 'josh.jenkins32@ethereal.email',
    //     pass: 'PmH6yRmWNHw6e3zMY9'
    //   }
    // });
    // let mailDetails = {
    //   from: 'josh.jenkins32@ethereal.email',
    //   to,
    //   subject: 'Test mail',
    //   html,
    // };
    mailTransporter.sendMail(mailDetails, function (err, _data) {
        if (err) {
            console.log("Error Occurs");
            console.error(err);
        }
        else {
            console.log("Email sent successfully");
        }
    });
}
exports.sendmailRef = sendmailRef;
//# sourceMappingURL=mailer.js.map