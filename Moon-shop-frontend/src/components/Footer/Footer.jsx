import React from 'react'; // Importing React library
import "./Footer.css"; // Importing the associated stylesheet

// Functional component for the Footer
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-social">
          <a href="#" className="footer-social-link">Facebook</a>
          <a href="#" className="footer-social-link">Twitter</a>
          <a href="#" className="footer-social-link">Instagram</a>
        </div>
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} Moon Shop. All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer; // Exporting the Footer component
