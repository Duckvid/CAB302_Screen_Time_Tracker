const express = require('express');
const nodemailer = require('nodemailer');

//Important api routes for express to use:
var router = express.Router();

require('dotenv').config();

const {
    createContactEmail,
} = require('./contactEmail');

//
async function sendContactEmail(fullName, email, phoneNumber, subject, message ) {

  const contactData = {
    fullName: fullName,
    email: email,
    phoneNumber: phoneNumber,
    subject: subject,
    message: message,
  };

    const { html } = createContactEmail(contactData);

    const testsubject = 'Entremap Contact Email with subject - ' + subject;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',  

        auth: {
          user: 'entremapco@gmail.com',
          pass: process.env.EntremapGmailPassword
        }

    });

    transporter.sendMail(
      {
        from: 'entremapco@gmail.com',
        // to: 'entremapco@gmail.com',
        to: 'info@entremap.online',
        subject: testsubject,
        html: html,
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      },
    );
}

router.post('/MailContact', function (data, response) {
  if (data.body) {
    const { fullName, email, phoneNumber, subject, message } = data.body;

    //put async sendContactEmail here:
    sendContactEmail(fullName, email, phoneNumber, subject, message);
    //sent good response
    response.status(200).send('Email sent.');
  } else {
    //log no data was sent to the header
    console.log('no data');
    response.status(204).send('No content. ');
  }
  
});

module.exports = router;