const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
admin.initializeApp();

// TODO: edit your no-reply sender details
const noreplyName = "noreply WaterTop";
const noreplyEmail = "Insert_Your_FROM_Email@gmail.com";
const noreplyPassword = "Insert_Your_FROM_Email_Password";
const domain = "gmail";

// TODO: edit your email subject and template
const emailSubject = "Welcome to WaterTop";
const emailTemplate = `<p>Dear Student,</p> <br/>
                       <p>Welcome to School of WaterTop! Thank you for 
                       choosing WaterTop as one of your choices and 
                       we are pleased to have you here.</p> <br />
                       <br/>
                       <p>Best Regards,</p>
                       <p>WaterTop</p>
                      `;

// TODO: edit your database and cloud function region
const region = "asia-east1";

const transporter = nodemailer.createTransport({
  service: domain,
  auth: {
    user: noreplyEmail,
    pass: noreplyPassword,
  },
});

/**
Export sendNoReplyEmail as a HTTP function.
 */
exports.sendNoreplyEmail = functions
    .region(region)
    .firestore.document("students/{docId}")
    .onCreate((snapshot) => {
      // Obtain destination email from http request query
      const student = snapshot.data();
      if (student) {
        const destination = student.email;
        const mailOptions = {
          from: `${noreplyName} <${noreplyEmail}>`,
          to: destination,
          subject: emailSubject,
          html: emailTemplate, // email content in HTML
        };
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log(err.toString());
          }
        });
      }
    });
