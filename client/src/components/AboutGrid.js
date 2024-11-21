import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// About page styles and grid //
import brisbanecityPhoto from '../resources/BrisbaneCity1.jpg';
import founder1Photo from '../resources/GrahamPic.png'
import founder2Photo from '../resources/VibhorPic.png'
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
              <Grid container spacing={2} direction="column" justify='center' alignItems='center'>
                <Grid item xs={10}>
                  <Typography variant="h3">About us</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={8} style={{ paddingBottom: '5px'}}>
                    <Grid item xs="12" lg="6">
                      {/* Our mission */}
                      <Grid item xs={10}>
                        <Typography variant="h5" style={{ paddingBottom: '5px' }}>What do we do</Typography>
                      </Grid>
                      {/* Temp text change later */}
                      <Typography variant="h6" style={{ paddingBottom: '20px' }}>
                        Entremap is a company dedicated to assisting individuals in various stages of their entrepreneurial journey, whether you're an established business owner,
                        an aspiring entrepreneur, or an agent of change within an organization focused on value creation.
                        We offer a unique solution - an assessment of your entrepreneurial mindset profile.
                        This evaluation helps you gain insights into your current position and offers guidance on enhancing your personal and professional development.
                        Cultivating an entrepreneurial mindset is crucial for fostering innovation, approaching entrepreneurship with discipline, achieving successful value creation,
                        and advancing in today's fast-paced professional landscape.
                      </Typography>
                    </Grid>

                    <Grid item xs="12" lg="6">
                      {/* What do we do */}
                      <Grid item xs={10}>
                        <Typography variant="h5" style={{ paddingBottom: '5px' }}>How can we help you</Typography>
                      </Grid>
                      <Typography variant="h6" style={{ paddingBottom: '20px' }}>
                        Entremap helps you in industry, university and startup
                        projects to evaluate the degree to which you are utilizing
                        an entrepreneurial mindset and provides the context in
                        which you might develop it further.
                      </Typography>
                      {/* What can you do */}
                      <Grid item xs={10}>
                        <Typography variant="h5" style={{ paddingBottom: '5px' }}>Who are we</Typography>
                      </Grid>
                      <Typography variant="h6">
                      The team at Entremap is composed of dedicated experts who specialize in entrepreneurial mindset, strategy and innovation.
                      Our team is passionate about helping you foster innovation, approach entrepreneurship with discipline, achieve successful value creation, and navigate the dynamic world of modern business.
                      </Typography>
                    </Grid>
                    {/* Founder images */}
                    <Grid item xs="12" lg="6" align='center'>
                      <Typography variant='h6'>
                        Graham Fellows
                      </Typography>
                      <Box className={classes.founderImage}>
                        <FittedImage
                          fit="contain"
                          onLoad={(...args) => console.log(...args)}
                          onError={(...args) => console.log(...args)}
                          src={founder1Photo}
                        />
                      </Box>
                      <Typography variant="h6" >
                      Entrepreneurial mindset subject matter expert. Grahams research focuses on entrepreneurial mindset, strategy and frameworks across the world. He has extensive experience in program design, development and facilitation, framework choices and program outcomes, with a focus on how participants experience the content and how they might best apply the experience to their professional and personal lives.
                      </Typography>
                    </Grid>
                    <Grid item xs="12" lg="6" align='center' >
                      <Typography variant='h6'>
                        Vibhor Pandey
                      </Typography>
                      <Box className={classes.founderImage}>
                        <FittedImage
                          fit="contain"
                          onLoad={(...args) => console.log(...args)}
                          onError={(...args) => console.log(...args)}
                          src={founder2Photo}
                        />
                      </Box>
                      <Typography variant="h6" >
                      Vibhor Pandey, Data Culturist Vibhors work and research focuses on economic analysis, product development, entrepreneurship, and innovation. He has extensive experience in program design, development and facilitation, and program outcomes.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

          </Card>

          {/* body of page below */}
          <Grid item xs={12} sm={12} md={4}>
            <Grid item xs={12} sm={12}>
              <Box className={classes.panelImage}>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Box className={classes.panelboxtext}>
                <Grid
                  container
                  spacing={0}
                  alignItems="center"
                  justify="center"
                  direction="column"
                >
                  <Grid item xs={12}>
                    <Typography variant="h4" align="center">
                      Researched{' '}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="body1" align="center">
                      Entremap was designed utilising years of peer-reviewed
                      research and scale development.
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Grid item xs={12}>
              <Box className={classes.panelImage}>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} style={{ padding: '5px', backgroundColor: '#1a4c38' }}>
              <Box className={classes.panelboxtext}>
                <Grid
                  container
                  spacing={0}
                  alignItems="center"
                  justify="center"
                  direction="column"
                >
                  <Grid item xs={10}>
                    <Typography variant="h4" align="center">
                      Iterative
                    </Typography>
                  </Grid>

                  <Grid item xs={10}>
                    <Typography variant="body1" align="center">
                      Designed to encourage education, benchmarking,
                      self-reflection and continual personal and professional
                      improvement.
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Grid item xs={12}>
              <Box className={classes.panelImage}>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box className={classes.panelboxtext}>
                <Grid
                  container
                  spacing={0}
                  alignItems="center"
                  justify="center"
                  direction="column"
                >
                  <Grid item xs={10}>
                    <Typography variant="h4" align="center">
                      Secure
                    </Typography>
                  </Grid>

                  <Grid item xs={10}>
                    <Typography variant="body1" align="center">
                      User information is kept secure and private. Any personal
                      details that are provided will not be shared in any way.
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>

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