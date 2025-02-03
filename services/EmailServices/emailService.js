const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email) => {
  return new Promise((resolve, reject) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "mouafekhedfi@gmail.com", //"1388e7461f6fd3", "mouafekhedfi@gmail.com"
          pass: "lwzd fdcr sclt cwfo", //"76988076dd94e1"; "lwzd fdcr sclt cwfo"
        },
      });

      // Set up email data
      const mailOptions = {
        from: {
          name: "ENI Smart University",
          address: "mouafekhedfi@gmail.com",
        },
        to: email.to, //email.to, "fourati.oussama9@gmail.com"
        subject: email.subject,
        html: email.body,
        // attachments: [
        //   {
        //     filename: "logo.jpg",
        //     path: path.join(__dirname, "../../files/logo/", "logo.png"), // Adjust the file path based on your actual image location
        //     cid: "unique-image-id", // Unique ID for referencing the image in the HTML content
        //   },
        // ],
      };

      // Send email
      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.error(error.message);
          reject(error);
        }
        console.log("Email sent !!");
        resolve(info.response);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });
};

module.exports = {
  sendEmail,
};
