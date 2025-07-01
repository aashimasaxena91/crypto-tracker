import { Container, Navbar, Nav } from "react-bootstrap";
import {  Link } from "react-router-dom";
import cryptoLogo from '../../public/crypto-logo.png';
export default function NavigationBar() {

  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg" fixed="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img alt="" src={cryptoLogo} width="30" height="30" className="d-inline-block align-top"/> Crypto Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto" style={{ maxHeight: '100px' }} navbarScroll >
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/convert">Converter</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}
