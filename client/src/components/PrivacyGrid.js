import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Paper, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// About page styles and grid //
import brisbanecityPhoto from '../resources/BrisbaneCity1.jpg';
import FittedImage from 'react-fitted-image';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    landingImage: {
      height: 625,
    },
    landingText: {
      width: '100%',
      height: 625,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      justify: 'center',
    },
    panelboxtext: {
      width: '100%',
      height: 150,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      justify: 'center',
    },
    panelImage: {
      width: '100%',
      height: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    abouttext: {
      color: '#fff',
    },
    title: {
        width: '100%',
      height: 100,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      justify: 'center',
    },
    headerImage: {
        height: 500,
        display: 'flex',
    },
    cardTheme: {
      width: '100%',
      display: 'flex',
    },
    founderImage: {
      width: '100%',
      height: 400,
      display: 'flex',
      padding: '10px',
    },
  }));

export default function AboutGrid(props) {
    //about page content and styling data
    const classes = useStyles();

    // handel facebook data deletion request
    const handleSubmit = (e) => {
      e.preventDefault();

      // send request to server to delete facebook data
  };

  return (
    <div className={classes.root}>

      <Box mx="auto" width="90%" style={{ paddingTop: '10px' }}>
        <Grid container spacing={0}>

          <Grid item xs={12} sm={12}>
            <Box className={classes.title}>
              <Typography variant="h1" align="center">
                About Entremap
              </Typography>
            </Box>
          </Grid>

          {/* Landing image */}
          <Card className={classes.cardTheme} variant='outlined' style={{
            borderColor: '#3dae81', backgroundColor: '#287154', paddingBottom: '0px',
            paddingLeft: '5px', paddingRight: '5px'
          }}>
            <Grid item xs={12} sm={12}>
              <Box className={classes.headerImage}>
                <FittedImage
                  fit="contain"
                  onLoad={(...args) => console.log(...args)}
                  onError={(...args) => console.log(...args)}
                  src={brisbanecityPhoto}
                />
              </Box>

            </Grid>
          </Card>
          
          <box>
            <Grid item xs={12} sm={12} style={{paddingBottom: '10px'}}/>
          </box>

                  <Card className={classes.cardTheme} variant='outlined' style={{ borderColor: '#3dae81', backgroundColor: '#287154', padding: '5px' }}>
                      <Grid item xs={12} sm={12} className={classes.abouttext}>
                          <Grid container spacing={2} align='center' justify='center' alignItems='center'>
                              <Grid item xs={10}>
                                  <Typography variant="h3" align='center'>Privacy Policy</Typography>
                              </Grid>
                              <Grid item xs={12} >
                                  <Grid container spacing={8} style={{ paddingBottom: '5px' }}>
                                      <Grid item xs="12" lg="12" sm='12' align='center'>
                                          <Grid item xs={10} align='center'>
                                              <Typography variant="h5" style={{ paddingBottom: '5px' }}>1.1 Terms of Use</Typography>
                                          </Grid>
                                          <Typography variant="h6" style={{ paddingBottom: '5px' }}>
                                              By using this service, you consent to providing and submitting to Entremap with the aforementioned data.
                                              Data present on this site - including survey information and user data submitted to us by you, the user, remain property
                                              of Entremap and are not to be replicated, surveilled, distributed, or compromised by external entities or users.
                                              Failure to comply will result in legal action taken against you and the entities you represent.
                                          </Typography>


                                          <Typography variant="h6" style={{ paddingBottom: '20px' }}>
                                              All assets on this site - including logo, images, survey questions are copyrighted property of Entremap.
                                              Unauthorized replication of this site's content is strictly prohibited and legal action will ensure if you fail to comply.
                                          </Typography>



                                          <Typography variant="h5" style={{ paddingBottom: '5px' }}>1.2 Terms & Conditions</Typography>

                                          <Typography variant="h6" style={{ paddingBottom: '5px' }}>
                                              Entremap provides a questionnaire in a likert-scale format to assess individual acclimation to entrepreneurship
                                              or business-related activity. Results are available in a monetized format, and are made personally available through payment.
                                          </Typography>

                                          <Typography variant="h6" style={{ paddingBottom: '5px' }}>
                                              Entremap does not provide this data to any third-party software, company, or institution for monetary use.
                                              Entremap does not liase with external users or third-party companies regarding the data you provide to us.
                                              Entremap does not make individual data available to other users of this service.
                                              As such, Entremap is not to be held liable for the contact or damages related to third-party software usage or other companies.
                                          </Typography>
                                          <Typography variant='h6' style={{ paddingBottom: '5px' }}>
                                              Entremap reserves the right to modify the Terms of Service and Terms & Conditions clauses at any time.
                                          </Typography>

                                          <Typography variant="h5" style={{ paddingBottom: '5px' }}>1.3 Privacy Policy</Typography>
                                          <Typography variant='h6' style={{ paddingBottom: '5px' }}>Your privacy is important to us.</Typography>
                                          <Typography variant="h6" style={{ paddingBottom: '5px' }}>
                                              This privacy policy will help you understand how Entremap uses and protects the data you provide to us.
                                              When using the site, we may collect the following: Your email address and name, any profile data collected from the survey,
                                              information from third-party services such as LinkedIn, including the number of connections and languages.
                                          </Typography>
                                          <Typography variant="h6" style={{ paddingBottom: '5px' }}>
                                              This data is collected with your knowledge and consent. This information is retained for only as long as necessary to provide you with our services.
                                              If you choose to delete your account, this information will be permanently removed.
                                          </Typography>
                                          <Typography variant="h6" style={{ paddingBottom: '5px' }}>
                                              We use this information to provide you with an accurate and comprehensive report on your entreprenurial mindset.
                                              Any personal information will not be shared with any third-parties, except when required to by law.
                                          </Typography>
                                          <Typography variant="h6" style={{ paddingBottom: '5px' }}>
                                              We reserve the right to change this privacy policy at any time.
                                          </Typography>
                                          {/* Facebook data deletion handeler - Not working */}
                                          <Box onSubmit={handleSubmit} align="center" style={{justifyContent: 'center', borderBlockColor: '#45544d'}}>
                                          <Typography variant="h5" align="center" style={{color: '#fff'}}>
                                                    Facebook Userdata Deletion:
                                                </Typography>
                                                <Typography variant="h6" style={{ paddingBottom: '5px' }}>
                                              Due to Meta's guidelines on data collection, we are required to provide a method of deleting your data from our servers if your request so.
                                              Please see the button below to delete any of your Facebook related data from our servers.
                                          </Typography>
                                                <Button
                                                        style={{color: '#fff', justifyContent: 'center', alignItems: 'center'}}
                                                        type="submit"
                                                        align="center"
                                                        autoFocus
                                                        color="primary"
                                                        variant="contained"
                                                    >
                                                        Delete Facebook Userdata
                                                    </Button>
                                          </Box>
                                      </Grid>
                                  </Grid>
                              </Grid>
                          </Grid>
                      </Grid>

                  </Card>

          {/* body of page below */}
          <Grid item xs={12} sm={12}>
            <Box height={50}></Box>
          </Grid>



          <Grid item xs={12} sm={12}>
            <Box height={75}></Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}