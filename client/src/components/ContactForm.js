import React, { useState } from 'react';
import { Box, Button, Card } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Description:
//This is the contact form file which contains the form component 
// used to send emails to the entremap email

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    landingText: {
      width: '100%',
      height: 615,
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
  }));

// Email handler component:
const nodemailer = require('nodemailer');





const ContactForm = () => {
    //contact page content and styling data
    const classes = useStyles();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    // set the completion state of the email send:
    const [completed, setCompleted] = useState(false);
    const [altertOpen, setAlertOpen] = useState(false);

    //Alert popup with result of email send:
    function displayContactEmailAlert(isEmailSent) {
        console.log('Test display contact email alert');
        const message = isEmailSent ? 'Email was sent' : 'Email was not sent';
        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.textContent = message;
        document.body.appendChild(popup);
        setCompleted(message);
        // setCompleted(true);
        setTimeout(() => {
            // document.body.removeChild(popup);
            if (isEmailSent) {
                window.location.reload();
            }
        }, 30000);
    };

    //handler for email api call to send form data to email on the express server side
    // see under /plugins/ContactComponents/sendContact-email.js
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            fullName,
            email,
            phoneNumber,
            subject,
            message,
        };
        contactEmailHandler(data);
    };

    //handler for email api call:
    const contactEmailHandler = (data) => {
        fetch('/api/sendContactEmail/MailContact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((data) => {
                displayContactEmailAlert(true);
            })
            .catch((err) => {
                console.log(err);
                displayContactEmailAlert(false);
            });
    };

    const handleSent = () => {
        window.location.reload();
        setCompleted(false);
    };

    

// Contact form display component:

    if (completed === false) {

    return (
        //Form component
        <div className={classes.root} >
            <Box>
                <Card style={{height: '625px', backgroundColor: '#3dae81'}}>
                    {/* Title */}
                    <Typography variant="h4" align="center" style={{color: '#fff'}}>
                        Contact Us
                    </Typography>
                    
                    {/* Form */}
                    <Box align="center" component="form" onSubmit={handleSubmit} sx={{display: 'flex', flexDirection: 'column', '& .MuiTextField-root': { width: '500px', maxWidth: '100%', },}} autoComplete="off">
                        <div>
                            {/* <Typography>
                                Full Name:
                            </Typography> */}
                            <TextField
                                id='fullName'
                                type='text'
                                placeholder='e.g Jack smith'
                                label='Full Name'
                                variant='standard'
                                margin='normal'
                                style={{ backgroundColor: '#fff', borderStyle: 'groove', borderWidth: '1px' }}
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            {/* <Typography>
                                Email Address:
                            </Typography> */}
                            <TextField
                                id='email'
                                type='email'
                                placeholder='e.g JackSmith@gmail.com'
                                label='Email Address'
                                variant='standard'
                                margin='normal'
                                style={{ backgroundColor: '#fff' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                id='phoneNumber'
                                type='tel'
                                placeholder='e.g +6101234012'
                                label='Phone Number'
                                variant='standard'
                                margin='normal'
                                style={{ backgroundColor: '#fff' }}
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                
                            />
                            <TextField
                                id='subject'
                                type='text'
                                placeholder='e.g. questions about survey or problems encountered'
                                label='Subject or Topic'
                                variant='standard'
                                margin='normal'
                                style={{ backgroundColor: '#fff' }}
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                            <TextField
                                id='message'
                                type='text'
                                placeholder='Please write your message here and we will try get back to you as soon a possible'
                                label='Message'
                                variant='standard'
                                margin='normal'
                                multiline
                                minRows={9}
                                maxRows={9}
                                style={{ backgroundColor: '#fff' }}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <div>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                style={{ width: '500px' }}
                            >
                                Submit
                            </Button>
                        </div>
                    </Box>
                    {/* </div> */}
                </Card>
            </Box>
        </div>
    );
                        } else {
                            //if email was sent successfully, display the following:
                            return(
                                <div className={classes.root} >

                                    <Box>
                                        <Card style={{ height: '625px', backgroundColor: '#072c1d', padding:'10px'}}>
                                            <Card alignItems="center" style={{padding: '5px', borderColor: '#fff',
                                             backgroundColor: '#3dae81', height: '615'}}>
                                                <Box align="center" style={{justifyContent: 'center', borderBlockColor: '#45544d'}}>
                                                    <div>
                                                    <Typography variant="h4" align="center" style={{color: '#fff'}}>
                                                    Alert!!
                                                </Typography>
                                                <Typography variant="h6" align="center" style={{color: '#fff'}}>
                                                    {completed}
                                                </Typography>
                                                    <Button
                                                        style={{color: '#fff', justifyContent: 'center', alignItems: 'center'}}
                                                        align="center"
                                                        onClick={handleSent}
                                                        autoFocus
                                                        color="primary"
                                                        variant="contained"
                                                    >
                                                        Okay
                                                    </Button>
                                                    </div>
                                                </Box>
                                            </Card>
                                        </Card>
                                    </Box>
                                </div>
                            );
    }
};

export default ContactForm;