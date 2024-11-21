import React, { useState, useEffect } from 'react';
import Home from './pages/Home.js';
import Profile from './pages/Profile.js';
import { CircularProgress } from '@material-ui/core';
import Login from './pages/Login.js';
import Questions from './pages/Questions';
import ResultDetails from './pages/ResultDetails';
import Results from './pages/Results';
import SurveyLanding from './pages/SurveyLanding';
import SurveyComplete from './pages/SurveyComplete';
import ResultExtended from './pages/ResultExtended';
import ErrorPage from './pages/Error';
import NotFound from './pages/404';
import { isLoggedIn } from './utils/isLoggedIn';
import About from './pages/About.js';
import Contact from './pages/Contact.js';
import PrivacyPolicy from './pages/PrivacyPolicy.js';
// import BasicDocument from './components/PDFExporter.js';
// import StripeModal from './components/StripeModal.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import AppContext from './AppContext.js';
import Stripe from './pages/Stripe.js';
import { getIsProUser } from './utils/isProUser.js';

const ignoreUrl = ['api/user/icon', 'api/auth/verify'];
const errStatus = [400, 401, 403, 404];

// Request Interceptor
try {
  const _fetch = window.fetch;
  window.fetch = (...args) => {
    return _fetch(...args).then((res) => {
      if (res) {
        const { url, status } = res.clone();
        const shouldIgnore = ignoreUrl.find((it) => url.includes(it));
        if (errStatus.includes(status) && !shouldIgnore) {
          window.location.href = `/error?errCode=${status}`;
        }
      }
      return res;
    });
  };
} catch (e) {}

function App() {
  const [status, setStatus] = useState('loading');
  const [isProUser, setIsProUser] = useState(false);

  const requestIsProUser = () => {
    return getIsProUser().then((_isProUser) => {
      setIsProUser(_isProUser);
      return _isProUser;
    });
  };

  useEffect(() => {
    isLoggedIn()
      .then((success) => {
        setStatus(success ? true : false);
        return success;
      })
      .then((success) => {
        if (success) {
          requestIsProUser();
        }
      });
  }, []);

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => {
          if (status === 'loading') {
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
          } else if (status === true) {
            return <Component {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
    );
  };
  const HomeRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => {
          if (status === 'loading') {
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
          } else {
            return <Component {...props} isLoggedIn={status} />;
          }
        }}
      />
    );
  };
  return (
    <AppContext.Provider
      value={{ isLoggedIn: status, isProUser, requestIsProUser }}
    >
      <Router>
        <Switch>
          <HomeRoute Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          {/* need to convert to private route on production */}
          <Route path="/questions" component={Questions} />
          <Route path="/results" component={Results} />
          <Route path="/resultdetails" component={ResultDetails} />
          <Route path="/surveyComplete" component={SurveyComplete} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/surveylanding" component={SurveyLanding} />
          <Route path="/resultExtended" component={ResultExtended} />
          {/*PDF PAGE BELOW*/}
          {/* <Route path="/PDF" component={StripeModal} /> */}
          {/*<Route path="/PDF" component={BasicDocument} />*/}
          {/* About page (UNDER DEVELOPMENT) not linked via a button due to clinet request */}
          <Route path='/about' component={About} />
          <Route path='/contact' component={Contact} />
          <Route path="/stripe" component={Stripe} />
          <Route path="/error" component={ErrorPage} />
          <Route path="/PrivacyPolicy" component={PrivacyPolicy} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
