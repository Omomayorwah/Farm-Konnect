import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='bg-gray-200' style={{height:'20vh', padding: '2rem', textAlign: 'center', color: '#374e36ff' , marginTop: '2rem', }}>
      <div>
        &copy; {currentYear} Farm Konnect. All rights reserved.
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        <a href="/privacy" className='text-green-600 hover:text-green-700' style={{ margin: '0 0.5rem', textDecoration: 'none', fontWeight:'bold' }} aria-label="Privacy Policy">Privacy Policy</a>
        <a href="/terms" className='text-green-600 hover:text-green-700' style={{  margin: '0 0.5rem', textDecoration: 'none', fontWeight:'bold' }} aria-label="Terms of Service">Terms of Service</a>
        <a href="/contact" className='text-green-600 hover:text-green-700' style={{ margin: '0 0.5rem', textDecoration: 'none', fontWeight:'bold' }} aria-label="Contact">Contact</a>
      </div>
    </footer>
  )};



export default Footer; 