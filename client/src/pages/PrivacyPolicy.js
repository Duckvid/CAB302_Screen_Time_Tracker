import React from 'react';
import PrivacyGrid from '../components/PrivacyGrid.js';
// import AboutGridMobile from '../components/HomeGrid-Mobile.js';
import Footer from '../components/Footer.js';
import NavBar from '../components/NavBar';
import { isMobile } from '../utils/util';

//Mobile version of About page//

const PrivacyPage = PrivacyGrid;

function PrivacyPolicy(props) {

  return (
    <div style={{background: '#3dae81'}}>
      <NavBar page="about" isLoggedIn={props.isLoggedIn}/>
      <div style={{ maxWidth: isMobile ? '100vw' : '1584px', margin: 'auto' }}>
        <PrivacyPage isLoggedIn={props.isLoggedIn} />
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;