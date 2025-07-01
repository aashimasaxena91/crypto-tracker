import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import cryptoLogo from "../../public/crypto-logo.png";

export default function NavigationBar() {
  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg" fixed="top" className="shadow">
      <Container fluid className="px-5">
        <Navbar.Brand as={Link} to="/">
          <img
            alt=""
            src={cryptoLogo}
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          <span className="fw-bold">Crypto Tracker</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/convert">Converter</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
