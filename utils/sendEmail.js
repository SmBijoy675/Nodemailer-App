const nodemailer = require("nodemailer");
require("dotenv").config();
const sendEmail = async (to, messageContent) => {
  try {
    // create trasnporter
    const trasnporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "smbijoy.s10@gmail.com",
        pass: process.env.NODE_PASS,
      },
    });
    // message object
    const message = {
      to,
      subject: "",
      html: `
        <h3>You have recieved message from the nodemailer App </h3>
        <p>${messageContent}</p>
        `,
    };
    // send the email
    const info = await trasnporter.sendMail(message);
    console.log("Message sent", info.messageId);
  } catch (error) {
    console.log(error);
    throw new error("Email could not be sent");
  }
};

module.exports = sendEmail;
