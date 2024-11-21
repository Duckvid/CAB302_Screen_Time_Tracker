import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import { StarOutlined } from '@material-ui/icons';
import { isMobile } from '../utils/util';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    width: isMobile ? '100vw' : '800px',
    marginTop: isMobile ? 0 : 50,
    padding: isMobile ? 24 : 0,
    boxSizing: 'border-box',
  },
  tip1: {
    color: '#47525e',
    fontFamily: 'Lato',
    marginTop: 12,
    fontWeight: 'bold',
  },
  tip2: {
    color: '#fff',
    marginTop: 6,
    fontFamily: 'Open Sans',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 24,
  },
  typeTile: {
    color: '#fff',
    fontFamily: 'Karia',
    marginBottom: 24,
    fontWeight: '900',
  },
  box1: {
    height: isMobile ? 'auto' : 400,
    minHeight: isMobile ? 320 : 'unset',
    padding: '36px 24px 24px 24px',
    border: '2px solid #eee',
    marginBottom: isMobile ? 24 : 0,
    borderRadius: 18,
    display: 'flex',
    background: '#c7e6d9',
    flexDirection: 'column',
    boxSizing: 'border-box',
  },
  box2: {
    height: isMobile ? 'auto' : 400,
    minHeight: isMobile ? 320 : 'unset',
    padding: '36px 24px 24px 24px',
    border: '2px dashed #eee',
    borderRadius: 18,
    display: 'flex',
    background: '#c7e6d9',
    flexDirection: 'column',
    boxSizing: 'border-box',
  },
  text1: {
    color: '#969faa',
    fontFamily: 'Karia',
    marginBottom: 20,
  },
  text2: {
    color: '#fff',
    fontFamily: 'Karia',
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
  },
  amount: {
    display: 'inline-block',
    fontSize: 36,
    position: 'relative',
    fontWeight: '900',
  },
  unit: {
    fontSize: 14,
    position: 'absolute',
    top: -12,
    left: -24,
  },
  currentButton: {
    color: '#79808c',
    background: '#dfe5e3',
    minWidth: 110,
    borderRadius: '100px',
  },
  upgradeButton: {
    color: '#fff',
    minWidth: 110,
    borderRadius: '100px',
  },
}));

export default function Stripe() {
  const classes = useStyles();

  const handleUpgradeClick = () => {};

  const render = () => {
    return (
      <Box mx="auto" className={classes.container}>
        <Typography variant="h5" align="left" className={classes.tip1}>
          Upgrade and unlock more content
        </Typography>
        <Typography variant="h6" align="left" className={classes.tip2}>
          <StarOutlined
            color="primary"
            fontSize="small"
            style={{ marginRight: 12 }}
          />
          Limited time discount!
        </Typography>
        <Grid container spacing={8}>
          <Grid item xs={isMobile ? 12 : 6} justifyContent="center">
            <Typography
              variant="h4"
              align="center"
              className={classes.typeTile}
            >
              Free
            </Typography>
            <Box className={classes.box1}>
              <Box style={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  align="center"
                  className={classes.text1}
                >
                  Limited reading!
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  align="center"
                  style={{ color: '#fff' }}
                >
                  <span className={classes.amount}>
                    <span className={classes.unit}>A$</span>0
                  </span>
                </Typography>
              </Box>
            </Box>

            <Container align="center" style={{ marginTop: 24 }}>
              <Button
                variant="outlined"
                className={classes.currentButton}
                disabled
              >
                Current
              </Button>
            </Container>
          </Grid>
          <Grid item xs={isMobile ? 12 : 6} justifyContent="center">
            <Typography
              variant="h4"
              align="center"
              className={classes.typeTile}
            >
              Pro
            </Typography>
            <Box className={classes.box2}>
              <Box style={{ flex: 1 }}>
                <Typography variant="h6" align="left" className={classes.text2}>
                  Reading all reports
                  <StarOutlined color="primary" fontSize="small" />
                </Typography>
                <Typography variant="h6" align="left" className={classes.text2}>
                  Email Notification
                  <StarOutlined color="primary" fontSize="small" />
                </Typography>
                <Typography variant="h6" align="left" className={classes.text2}>
                  Download
                  <StarOutlined color="primary" fontSize="small" />
                </Typography>
                <Typography variant="h6" align="left" className={classes.text2}>
                  Pdf export
                  <StarOutlined color="primary" fontSize="small" />
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  align="center"
                  style={{ color: '#fff' }}
                >
                  <span className={classes.amount}>
                    <span className={classes.unit}>A$</span>0
                  </span>
                </Typography>
              </Box>
            </Box>
            <Container align="center" style={{ marginTop: 24 }}>
              <Button
                variant="contained"
                color="primary"
                className={classes.upgradeButton}
                onClick={handleUpgradeClick}
              >
                Upgrade
              </Button>
            </Container>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <div className={classes.root}>
      <div
        style={{
          background: '#39AC7E',
          minHeight: 'calc(100vh - 80px)',
          paddingBottom: 24,
        }}
      >
        <NavBar isLoggedIn={true} />
        {render()}
      </div>
      <Footer />
    </div>
  );
}
