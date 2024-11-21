import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ContactForm from '../components/ContactForm.js';
import Footer from '../components/Footer.js';
import NavBar from '../components/NavBar';
import { isMobile } from '../utils/util';
import { Box, Card, CardContent, CardHeader, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FittedImage from 'react-fitted-image';


//This is the contact page where a form that will be emailed
// to the entremap email will be available

// Import images:
import ContactUS2 from '../resources/ContactUs2.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    landingText: {
      width: '100%',
      height: 225,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    title: {
      color: '#fff',
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
    contactTitle: {
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ContactForm: {
        height: 625,
    },
  }));

//const Contactpage = isMobile ? ContactFormMobile : ContactForm;
const ContactpageForm = ContactForm;



function Contact(props) {
    
    const classes = useStyles();
    
    return (
        <div style={{ background: '#3dae81' }}>
            <NavBar page="about" isLoggedIn={props.isLoggedIn} />
            <Box>
                <FittedImage
                    fit="contain"
                    onLoad={(...args) => console.log(...args)}
                    onError={(...args) => console.log(...args)}
                    src={ContactUS2}
                />
            </Box>
            {/* Hight was 750px */}
            <div style={{ maxWidth: isMobile ? '100vw' : '1584px', margin: 'auto' }}>
                <Box mx="auto" width="80%" paddingBottom='10px' paddingTop='10px'>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={6}>
                            {/* Contact details */}
                                    <Typography variant="h4" align="left" className={classes.contactTitle}>
                                        Get in touch with us
                                    </Typography>
                                
                            <CardContent>
                            <Box className={classes.landingText}>
                                <Grid container spacing={1} direction='column' justifyContent='center'>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Box>
                                        <Typography variant='h6' align='center'>
                                            Contact us on:
                                        </Typography>
                                        {/* <Typography variant='h6' align='center'>
                                            Phone: 0123456789
                                        </Typography> */}
                                        <Typography variant='h6' align='center'>
                                            Email: entremapco@gmail.com
                                        </Typography>
                                        </Box>
                                        
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Typography variant='h6' align='center'>
                                            Find us on:
                                        </Typography>
                                        <Typography variant='h6' align='center'>
                                            Linkedin - https://www.linkedin.com/company/entremap/
                                        </Typography>
                                        <Typography variant='h6' align='center'>
                                            Twitter - https://twitter.com/entremap1
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            </CardContent>
                        </Grid>
                        {/* Content form */}
                        
                            <Grid item xs={12} sm={12} md={6}>
                            <Card style={{backgroundColor: '#287154', padding: '5px'}}>
                                <Box className={classes.ContactForm}>
                                    <ContactpageForm isLoggedIn={props.isLoggedIn} />
                                </Box>
                                </Card>                     
                            </Grid>
                        
                    </Grid>
                </Box>
                
            </div>
            <Footer />
        </div>
    );
}

export default Contact;