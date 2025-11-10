import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer style={{height:'20vh', padding: '2rem', textAlign: 'center', color: 'white', marginTop: '2rem' }}>
      <div>
        &copy; {currentYear} Farm Konnect. All rights reserved.
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        <a href="/privacy" style={{ color: '#d4fad3ff', margin: '0 0.5rem', textDecoration: 'none' }} aria-label="Privacy Policy">Privacy Policy</a>
        <a href="/terms" style={{ color: '#d4fad3ff', margin: '0 0.5rem', textDecoration: 'none' }} aria-label="Terms of Service">Terms of Service</a>
        <a href="/contact" style={{ color: '#d4fad3ff', margin: '0 0.5rem', textDecoration: 'none' }} aria-label="Contact">Contact</a>
      </div>
    </footer>
  )};



export default Footer; 