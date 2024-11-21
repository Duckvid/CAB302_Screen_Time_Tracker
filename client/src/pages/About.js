import React from 'react';
import AboutGrid from '../components/AboutGrid.js';
// import AboutGridMobile from '../components/HomeGrid-Mobile.js';
import Footer from '../components/Footer.js';
import NavBar from '../components/NavBar';
import { isMobile } from '../utils/util';

//Mobile version of About page//

const AboutPage = AboutGrid;

function About(props) {

  return (
    <div style={{background: '#3dae81'}}>
      <NavBar page="about" isLoggedIn={props.isLoggedIn}/>
      <div style={{ maxWidth: isMobile ? '100vw' : '1584px', margin: 'auto' }}>
        <AboutPage isLoggedIn={props.isLoggedIn} />
      </div>
      <Footer />
    </div>
  );
}

export default About;