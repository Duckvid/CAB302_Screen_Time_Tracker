import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function PrivacyModal(props) {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const { isLoggedIn } = props;
  const history = useHistory();

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setOpen(false);
    if (isLoggedIn) {
      history.push('/profile');
    } else {
      history.push('/login');
    }
  };

  const handleChange = (e) => {
    setChecked(!checked);
  };

  return (
    <div>
      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={handleClickOpen('paper')}
      >
        Begin
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">PRIVACY POLICY & TERMS OF SERVICE</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            <b>1.1 Terms of Use</b>
            <br></br><br></br>
            By using this service, you consent to providing and submitting to Entremap with the aforementioned data.
            Data present on this site - including survey information and user data submitted to us by you, the user, remain property
            of Entremap and are not to be replicated, surveilled, distributed, or compromised by external entities or users.
            Failure to comply will result in legal action taken against you and the entities you represent.
            <br></br><br></br>
            All assets on this site - including logo, images, survey questions are copyrighted property of Entremap.
            Unauthorized replication of this site's content is strictly prohibited and legal action will ensure if you fail to comply.
            <br></br><br></br>
            <b>1.2 Terms & Conditions</b>
            <br></br><br></br>
            Entremap provides a questionnaire in a likert-scale format to assess individual acclimation to entrepreneurship
            or business-related activity. Results are available in a monetized format, and are made personally available through payment.
            <br></br><br></br>           
            Entremap does not provide this data to any third-party software, company, or institution for monetary use.
            Entremap does not liase with external users or third-party companies regarding the data you provide to us.
            Entremap does not make individual data available to other users of this service.
            As such, Entremap is not to be held liable for the contact or damages related to third-party software usage or other companies.
            <br></br><br></br>
            Entremap reserves the right to modify the Terms of Service and Terms & Conditions clauses at any time.
            <br></br><br></br>
            <b>1.3 Privacy Policy</b>
            <br></br><br></br>
            Your privacy is important to us.
            <br></br><br></br>
            This privacy policy will help you understand how Entremap uses and protects the data you provide to us. 
            When using the site, we may collect the following: Your email address and name, any profile data collected from the survey, 
            information from third-party services such as LinkedIn, including the number of connections and languages.
            <br></br><br></br>             
            This data is collected with your knowledge and consent. This information is retained for only as long as necessary to provide you with our services. 
            If you choose to delete your account, this information will be permanently removed.
            <br></br><br></br> 
            We use this information to provide you with an accurate and comprehensive report on your entreprenurial mindset. 
            Any personal information will not be shared with any third-parties, except when required to by law.
            <br></br><br></br>
            We reserve the right to change this privacy policy at any time.
            <br></br>         
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between' }}>
          <FormControlLabel
            control={<Checkbox />}
            label="I have read and understood"
            onChange={handleChange}
          />

          <Button
            onClick={handleAgree}
            autoFocus
            color="primary"
            variant="contained"
            disabled={!checked}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
