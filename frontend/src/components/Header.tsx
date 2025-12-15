import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="sticky-top bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-success text-white py-1 small">
          <Container className="d-flex justify-content-end">
             <span className="me-3"><i className="bi bi-telephone-fill me-1"></i>031-752-6000</span>
             <span><i className="bi bi-person-circle me-1"></i>로그인</span>
          </Container>
      </div>
      
      {/* Main Nav */}
      <Navbar expand="lg" className="py-3">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-success d-flex align-items-center">
             <i className="bi bi-tree-fill me-2"></i>
             느티나무병원협동조합
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto fw-bold">
              <Nav.Link as={Link} to="/" active={location.pathname === '/'} className="mx-2 text-dark">Home</Nav.Link>
              <Nav.Link as={Link} to="/intro" active={location.pathname === '/intro'} className="mx-2 text-dark">회사소개</Nav.Link>
              <Nav.Link as={Link} to="/business" active={location.pathname === '/business'} className="mx-2 text-dark">주요사업</Nav.Link>
              <Nav.Link as={Link} to="/trees" active={location.pathname === '/trees'} className="mx-2 text-dark">나무병원</Nav.Link>
              <Nav.Link as={Link} to="/landscapes" active={location.pathname === '/landscapes'} className="mx-2 text-dark">조경식재</Nav.Link>
              <Nav.Link as={Link} to="/notices" active={location.pathname === '/notices'} className="mx-2 text-dark">공지사항</Nav.Link>
              <Nav.Link as={Link} to="/inquiries" active={location.pathname === '/inquiries'} className="mx-2 text-dark">시공/견적문의</Nav.Link>
            </Nav>
            <Link to="/diagnosis">
                <Button variant="success" className="ms-3 rounded-pill px-4">수목진단신청</Button>
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;