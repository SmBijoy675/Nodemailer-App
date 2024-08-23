const express = require("express");
const app = express();
const path = require("path");
const sendEmail = require("./utils/sendEmail");
const port = process.env.port || 9000;

// set engine
app.set("view engine", "ejs");

// static
app.use(express.static(path.join(__dirname, "public")));

// pass the data for the form
app.use(express.urlencoded({ extended: false }));

// create the route to render the form
app.get("/", (req, res) => {
  res.render("email-form");
});

// route to send the email
app.post("/send-email", async (req, res) => {
  const { email, message } = req.body;
  try {
    sendEmail(email, message);
    res.render("email-form", {
      status: "Success",
      message: "Email sent successfully",
    });
  } catch (error) {
    console.log(error);
    res.render("email-form", {
      status: "error",
      message: "Email cannot be sent",
    });
  }
});

// start the sevrer
app.listen(port, console.log(`Server is running on port: ${port}`));
