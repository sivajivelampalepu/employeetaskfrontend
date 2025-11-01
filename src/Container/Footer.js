import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => (
   <footer className="dashboard-footer">

    <Container>
      <small>🔧 Developed by <strong>Sivaji Velampalepu</strong> | © {new Date().getFullYear()}</small>
    </Container>
  </footer>
);

export default Footer;
