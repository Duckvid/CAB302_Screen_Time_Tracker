const schedule = require('node-schedule');
const dayjs = require('dayjs');
const db = require('../db');
const {
  sendEmail,
  createContinueMySurvey,
  createTakeTheSurvey,
} = require('./plugin-email');

async function toSendEmail(surverys) {
  const sendContinueSurverys = [];
  const sendTakeNewSurverys = [];
  surverys.forEach((survery) => {
    if (survery.submitted) {
      // more than 6 months since the last submission
      if (dayjs().diff(dayjs(survery.date), 'month') >= 6) {
        sendTakeNewSurverys.push(survery);
      }
    } else {
      // The last survery was not completed
      sendContinueSurverys.push(survery);
    }
  });

  console.log('SEND EMAIL', sendTakeNewSurverys);
  console.log('SEND EMAIL', sendContinueSurverys);

  // Send Email
  await Promise.all([
    ...sendContinueSurverys.map((survery) =>
      sendEmail(survery.email, createContinueMySurvey())
    ),
    ...sendTakeNewSurverys.map((survery) =>
      sendEmail(survery.email, createTakeTheSurvey())
    ),
  ]);
  // Batch Updates
  return db.transaction((trx) => {
    const queries = [];
    [...sendContinueSurverys, ...sendTakeNewSurverys]
      .map((survery) => survery.userID)
      .forEach((userID) => {
        const query = db
          .from('SurveyResults')
          .where('userID', userID)
          .update({ emailed: true })
          .transacting(trx);
        queries.push(query);
      });
    return Promise.all(queries).then(trx.commit).catch(trx.rollback);
  });
}

function checkSurveyExpriedDate() {
  return db
    .from('SurveyResults')
    .select([
      'SurveyResults.userID',
      'SurveyResults.ID',
      'SurveyResults.submitted',
      'SurveyResults.date',
      'users.email',
    ])
    .leftJoin('users', 'SurveyResults.userID', 'users.userID')
    .orderBy('date', 'desc')
    .where({ emailed: false })
    .then((results) => {
      const userLastestSurvey = results.reduce((pre, cur) => {
        if (!pre[cur.userID]) {
          pre[cur.userID] = cur;
        } else {
          if (dayjs(cur.date).isAfter(dayjs[pre[cur.userID]])) {
            pre[cur.userID] = cur;
          }
        }
        return pre;
      }, {});
      const surverys = Object.values(userLastestSurvey);
      return surverys;
    })
    .then((surveys) => toSendEmail(surveys));
}

function scheduleRun() {
  // run on every day at 12:00
  schedule.scheduleJob('00 12 1 * * *', function () {
    checkSurveyExpriedDate();
  });
}

module.exports = { scheduleRun };
