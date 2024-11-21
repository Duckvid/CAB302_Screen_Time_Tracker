const nodemailer = require('nodemailer');
const axios = require('axios');
const dayjs = require('dayjs');
// require('dotenv').config();
const {
  createContinueMySurvey,
} = require('./email-templates/continueMySurvey');
const { createTakeTheSurvey } = require('./email-templates/takeTheSurvey');

const oauth2_api = 'https://oauth2.googleapis.com/token';
const gmailConfig = {
  gmailUser: process.env.GmailUser,
  clientId: process.env.GmailClientId,
  clientSecret: process.env.GmailSecret,
  refreshToken: process.env.GmailRefreshToken,
};


let accessToken = '';
let expiresIn = 0;
let tokenTime = dayjs();
let refreshingPromise = null;

function refreshAccessToken() {
  console.log('[gmail] refresh access token');
  refreshingPromise = axios
    .post(oauth2_api, {
      client_id: gmailConfig.clientId,
      client_secret: gmailConfig.clientSecret,
      refreshToken: gmailConfig.refreshToken,
      grant_type: 'refresh_token',
    })
    .then((res) => {
      console.log('[gmail] get token success');
      if (res.data.access_token) {
        accessToken = res.data.access_token;
        expiresIn = res.data.expires_in;
        tokenTime = dayjs();
      } else {
        console.log('[gmail] get token failed', res.data);
      }
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      refreshingPromise = null;
    });
  return refreshingPromise;
}

async function getAccessToken() {
  if (refreshingPromise) {
    await refreshingPromise;
    return accessToken;
  }
  if (dayjs().diff(tokenTime, 's') >= expiresIn) {
    await refreshAccessToken();
  }
  return accessToken;
}

/**
 *
 * @param {target} target receiver
 * @param {emailContent} { subject and html }
 * @returns
 */
async function sendEmail(target, { subject, html }) {
  const transporter = nodemailer.createTransport({
    // Gmail
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,

    auth: {
      type: 'OAuth2',
      user: gmailConfig.gmailUser,
      clientId: gmailConfig.clientId,
      clientSecret: gmailConfig.clientSecret,
      refreshToken: gmailConfig.refreshToken,
      accessToken: await getAccessToken(),
    },
  });

  transporter.sendMail(
    {
      from: gmailConfig.gmailUser,
      to: target,
      subject: subject,
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

module.exports = { sendEmail, createContinueMySurvey, createTakeTheSurvey };
