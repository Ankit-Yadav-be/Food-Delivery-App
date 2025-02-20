import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsFileText, BsShieldLock, BsClipboardData, BsInfoCircle } from 'react-icons/bs';
import "../components/policy.css" // Import the CSS file for custom styles

const Policy = () => {
  return (
    <Container className="terms-policy-page">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="animated fadeInUp delay-1s">
            <BsFileText className="policy-icon" />
            <h2 className="terms-policy-title">Terms and Policy</h2>
            <p className="terms-policy-description">Welcome to Pizza Shop! Below are the terms and policies that govern your use of our services. Please read them carefully.</p>
          </div>
          <div className="policy-section animated fadeInUp delay-2s">
            <BsShieldLock className="section-icon" />
            <h3 className="section-title">1. Privacy Policy</h3>
            <p className="section-content">We respect your privacy. Our Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
          </div>
          <div className="policy-section animated fadeInUp delay-3s">
            <BsClipboardData className="section-icon" />
            <h3 className="section-title">2. Terms of Service</h3>
            <p className="section-content">By accessing or using our services, you agree to abide by our Terms of Service. These terms govern your use of our website and services provided by Pizza Shop.</p>
          </div>
          <div className="policy-section animated fadeInUp delay-4s">
            <BsInfoCircle className="section-icon" />
            <h3 className="section-title">3. Refund Policy</h3>
            <p className="section-content">We strive to provide exceptional service and products. Our Refund Policy details the terms and conditions under which refunds are provided for purchases made through Pizza Shop.</p>
          </div>
          <div className="policy-section animated fadeInUp delay-5s">
            <BsInfoCircle className="section-icon" />
            <h3 className="section-title">4. Cookie Policy</h3>
            <p className="section-content">Cookies are used on our website to improve user experience. Our Cookie Policy explains how we use cookies and your choices regarding their use.</p>
            <p className="section-content">For any questions regarding our terms and policies, please contact us at info@pizzashop.com.</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Policy;
