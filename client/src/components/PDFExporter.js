import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Rect, Image, Svg } from '@react-pdf/renderer';
import EntremapLogo from "../resources/EntremapLogo.png"
// import html2canvas from 'html2canvas';

// Create styles
const styles = StyleSheet.create({
  viewer: {
    //Set viewer to be full webpage
    width: window.innerWidth,
    height: window.innerHeight,
  },
  page: { 
    backgroundColor: '#39AC7E',
  },

  title: { 
    backgroundColor: 'white',

    margin: 10,

  },

  banner:{
    margin:20,
  },

  whitebackground:{
    position: "absolute",
    left: 0,
    top: 0,
  },

  logo: {
    width: "150",
    position: "absolute",
    left: 25,
    top: 22

  },
  h1:{
    left: 200,
    top: 20,
    color: "#d96230",
    fontSize: 40,
    position: "absolute",
  },
  footerCopyright:{
    fontSize: 12,
    left: 18,
    top: 815,
    color:"white",
    position:"absolute",

  },
  footerContact:{
    fontSize: 12,
    left: 210,
    top: 815,
    color:"white",
    position:"absolute",
  },
  footerPageNo:{
    fontSize: 12,
    left: 550,
    top: 815,
    color:"white",
    position:"absolute",
  }
});

// Create Document Component
function PDFExport() {
  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        {/*Page 1*/}
        <Page size="A4" style={styles.page}>
          {/*White background block*/}
          <View style={styles.whitebackground}>
            <Svg viewBox="0 0 95 130">
              <Rect
                x="1.0"
                y="1.5"
                rx="5"
                ry="5"
                width="93"
                height="130"
                fill="white"  
              />
            </Svg>
          </View>
          {/*Entremap Logo*/}
          <View style={styles.logo}>
            <Image src = {EntremapLogo} />
          </View>
          {/*Orange lower pane*/}
          <View>
            <Svg viewBox="0 0 128 181">
              <Rect
                y="173"
                width="128"
                height="181"
                fill="#d96230"
              />
            </Svg>
              {/*Document Title */}
              <Text style={styles.h1}>
                Your Mindset Report
              </Text>
              {/*Footer Copyright*/}
              <Text style={styles.footerCopyright}>
              © Copyright 2023       
              </Text>
              {/*Footer Contact*/}
              <Text style={styles.footerContact}>
              Contact: entremapco@gmail.com
              </Text>
              <Text style={styles.footerPageNo}>
              1
              </Text>
          </View>
        </Page>
        {/*Page 2*/}
        <Page size="A4" style={styles.page}>
        <View style={styles.whitebackground}>
            <Svg viewBox="0 0 95 130">
              <Rect
                x="1.0"
                y="1.5"
                rx="5"
                ry="5"
                width="93"
                height="130"
                fill="white"  
              />
            </Svg>
          </View>
          {/*Orange lower pane*/}
          <View>
            <Svg viewBox="0 0 128 181">
              <Rect
                y="173"
                width="128"
                height="181"
                fill="#d96230"
              />
              </Svg>
              {/*Document Title */}
              <Text style={styles.h1}>
                Your Report
              </Text>
              {/*Footer Copyright*/}
              <Text style={styles.footerCopyright}>
              © Copyright 2023       
              </Text>
              {/*Footer Contact*/}
              <Text style={styles.footerContact}>
              Contact: entremapco@gmail.com
              </Text>
              <Text style={styles.footerPageNo}>
              2
              </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default PDFExport;