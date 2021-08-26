const nodemailer = require("nodemailer");

export function sendmailRef(to: string, html: string) {
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

  mailTransporter.sendMail(mailDetails, function (err: any, _data: string) {
    if (err) {
      console.log("Error Occurs");
      console.error(err);
    } else {
      console.log("Email sent successfully");
    }
  });
}
