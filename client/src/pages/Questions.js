import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import NavBar from '../components/NavBar';
import { useState } from 'react';
import Footer from '../components/Footer.js';
import Paper from '@material-ui/core/Paper';
import { CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';

import surveyComplete from '../resources/surveyComplete.png';
import { isMobile } from '../utils/util';
import SurveyReact from '../components/SurveyReact';

///// Description /////
/*
This file is the main component for the survey page. It contains the survey component and the logic for saving the survey results to the database.
Main functions:
  - initSurveyData: fetches the lastest survey results from the database and sets the state to the results.
  - onPageChanged: saves the survey results to the database when the user changes pages.
  - onCompleteComponent: saves the survey results to the database when the user completes the survey.
  - getSurveyResults: fetches the survey results from the database and sets the state to the results.
  - handleClose: closes the dialog box.
  - if (loading): displays a loading icon while the survey results are being fetched from the database.
  - if (selectedSurvey === false): dispalys survey complete page component. Else sends the user to the results page with the selectedSurvey state passed in.
  - if (completed === false): displays the survey component. Else displays the survey complete page component.
Main files and pages connected to this file include:
  - NavBar.js: The navigation bar component.
  - Footer.js: The footer component.
  - SurveyReact.js: The survey component.
  - Results.js: The results page component.
*/
///// End Description /////

function Questions() {
  const [completed, setCompleted] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [defaultValue, setDefaultValue] = useState({
    ID: undefined,
    currentPageNo: 0,
    data: {},
  });

  //Get survey results state
  const [selectedSurvey, setSelectedSurvey] = useState(false);

  const initSurveyData = () => {
    setLoading(true);
    fetch(`/api/results/lastest`, {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then((response) => response.json())
      .then(
        (data) => {
          if (data) {
            const { currentPageNo, ID, ...rest } = data;
            setDefaultValue({
              ID,
              currentPageNo,
              data: rest,
            });
          }
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    initSurveyData();
  }, []);

  // save temporarily
  const onPageChanged = (res) => {
    if (Object.keys(res.data).length > 0) {
      fetch(`/api/results`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          ID: defaultValue.ID,
          results: res.data,
          currentPageNo: res.currentPageNo,
        }),
      });
    }
  };

  const onCompleteComponent = (res) => {
    setLoading(true);
    fetch('/api/results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({ results: res.data, ID: defaultValue.ID }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCompleted(data);
      })
      .finally(() => setLoading(false));
  };

  //Get survey results from server and feed into view results link
  let getSurveyResults = (ID) => {
    setLoading(true);
    ID = defaultValue.ID;
    console.log(ID);
    let getSurvey = '/api/results?SurveyResults=' + ID;
    fetch(getSurvey, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedSurvey(data);
      })
      .finally(() => setLoading(false));
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return (
      <CircularProgress
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    );
  }

  //Using if statement to see if selectedSurvey is completed and results have been retreived from server
  if (selectedSurvey === false) {

    if (completed === false) {
      return (
        <div
          style={{
            backgroundColor: '#39AC7E',
            minHeight: '100vh',
          }}
        >
          <NavBar isLoggedIn={true} warning={true} />
          <div
            style={{
              margin: 'auto',
              maxWidth: '1440px',
              padding: isMobile ? '0' : '30px 0 50px',
            }}
          >
            <Box
              boxShadow={4}
              color="text.primary"
              className={isMobile ? 'm-survey' : ''}
            >
              <SurveyReact
                onComplete={onCompleteComponent}
                onPageChanged={onPageChanged}
                // TODO
                // onValidatedErrorsOnCurrentPage={() => setOpen(true)}
                defaultValue={defaultValue}
              />
            </Box>
          </div>

          <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Tips</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You havent't done all the question yet! Click the button to go
                back to the questionnarie!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                autoFocus
                color="primary"
                variant="contained"
              >
                Back
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    } else {
      return (
        <div>
          <div
            style={{
              backgroundColor: '#F8F8F8',
              minHeight: '100vh',
            }}
          >
            <NavBar isLoggedIn={true} />
            <Paper
              style={{
                margin: 'auto',
                maxWidth: '850px',
                marginTop: '50px',
                padding: '30px',
              }}
            >
              <Typography variant="h5">Evaluation Completed</Typography>
              <Divider />
              <Grid container spacing={4}>
                <Grid
                  item
                  xs="12"
                  sm="7"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    paragraph
                    style={{ wordWrap: 'break-word' }}
                  >
                    Thank you for completing the Entremap Entrepreneurial Mindset
                    Activity Profile. We suggest returning to Entremap every 6 to
                    12 months to gage progress over time.
                  </Typography>
                </Grid>
                <Grid item xs="12" sm="3">
                  <img
                    src={surveyComplete}
                    width="315px"
                    style={{ paddingTop: '10px' }}
                    alt="Survey Complete"
                  ></img>
                </Grid>
              </Grid>

              <Typography
                variant="h6"
                style={{
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  textAlign: 'center',
                }}
              >
                Click below to view your results.
              </Typography>

              <div style={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    //Get the survey results from the server when the button is clicked:
                    getSurveyResults(defaultValue);
                    //Then redirect to the results page in next if statement below once results have been retrieved and set to state:
                  }}
                >
                  Continue
                </Button>
              </div>
            </Paper>
            <div
              style={
                isMobile
                  ? {}
                  : {
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    left: '50%',
                    transform: 'translate(-50%, 100%)',
                  }
              }
            >
              <Footer />
            </div>
          </div>
        </div>
      );
    }
  } else {
    //Redirect to results page with selectedSurvey state passed in:
    return (
      <Redirect 
      push 
      to={{ pathname: '/results', state: selectedSurvey }}
      ></Redirect>
    );

  }
}

export default Questions;
