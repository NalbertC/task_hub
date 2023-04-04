import * as nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  // service: process.env.MAIL_SERVICE,
  // auth: {
  //   user: process.env.MAIL_USER,
  //   pass: process.env.MAIL_PASS,
  // },
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export { transporter };
