var calculateResults = require('../utils/calculatedResults');
var express = require('express');
var router = express.Router();
var db = require('../db');
const formatedResults = require('../utils/formatedResults');

//Getting calculated results from db based on user id
router.get('/', function (req, res) {
  if (req.user) {
    let surveyID = req.query.SurveyResults;
    return db
      .from('SurveyResults')
      .select('*')
      .where({ ID: surveyID })
      .then((results) => {
        if ((req.user[0].userID = results[0].userID)) {
          let calculatedResults = calculateResults(results[0]);
          calculatedResults.resultSet['name'] =
            req.user[0].given_name + ' ' + req.user[0].family_name;
          calculatedResults.resultSet['date'] = new Date().toISOString();
          res.send(calculatedResults);
        } else {
          res.status(401).send('User Unauthorised.');
        }
      });
  } else {
    res.status(401).send('User Unauthorised.');
  }
});

router.get('/all', function (req, res) {
  if (req.user) {
    return db
      .from('SurveyResults')
      .select('*')
      .where({ submitted: true })
      .then((results) => {
        res.send(results);
      });
  } else {
    res.status(401).send('User Unauthorised.');
  }
});

router.post('/', function (req, res) {
  if (req.user) {
    const { ID } = req.body;
    const { resultsArray, calculatedResults } = formatedResults(req);
    return db
      .from('SurveyResults')
      .update({ ...resultsArray, submitted: true })
      .where({ ID })
      .then(() => {
        return db
          .from('users') // New') //NOTE: for production version change usersNew to users
          .where({ userID: req.user[0].userID })
          .update({ lastSurveyCompleted: calculatedResults.resultSet['date'] })
          .then(() => {
            res.send(calculatedResults);
          });
      });
  } else {
    res.status(401).send('User Unauthorised.');
  }
});

//PUT request to update the survey results in the database
//Warnning: this is put action happens everytime the next button
// on the questionnaire is clicked. This means that a entry is created
// and populated before it is finieshed.
router.put('/', function (req, res) {
  if (req.user) {
    const { ID = -1, currentPageNo } = req.body;
    const { resultsArray } = formatedResults(req);
    const newSurvey = { ...resultsArray, submitted: false, currentPageNo };
    return db
      .from('SurveyResults')
      .update(newSurvey)
      .where({ ID })
      .then(() => {
        res.send(newSurvey);
      });
  } else {
    res.status(401).send('User Unauthorised.');
  }
});

router.get('/lastest', function (req, res) {
  if (req.user) {
    return db
      .from('SurveyResults')
      .select('*')
      .where({ userID: req.user[0].userID, submitted: false })
      .then((results) => {
        if (results.length) {
          res.send(results[0]);
        } else {
          const { resultsArray } = formatedResults(req);
          return db
            .from('SurveyResults')
            .insert([resultsArray])
            .returning(['ID'])
            .then(([surveyResult]) => {
              const { ID } = surveyResult;
              return db
                .from('SurveyResults')
                .select('*')
                .where({ ID })
                .then((result) => {
                  res.send(result[0]);
                });
            });
        }
      });
  } else {
    res.status(401).send('User Unauthorised.');
  }
});

module.exports = router;
