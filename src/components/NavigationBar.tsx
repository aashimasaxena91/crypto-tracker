import { useState, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import cryptoLogo from "../../public/crypto-logo.png";
import "./NavigationBar.css";

export default function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        fixed="top"
        className="shadow"
        expanded={menuOpen}
      >
        <Container fluid className="px-5">
          <Navbar.Brand as={Link} to="/">
            <img
              alt="Crypto Logo"
              src={cryptoLogo}
              width="30"
              height="30"
              className="d-inline-block align-top me-2"
            />
            <span className="fw-bold">Crypto Tracker</span>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setMenuOpen((prev) => !prev)}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                as={Link}
                to="/"
                className={location.pathname === "/" ? "active-nav-link" : ""}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/convert"
                className={
                  location.pathname === "/convert" ? "active-nav-link" : ""
                }
              >
                Converter
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {menuOpen && (
        <div className="navbar-overlay" onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
}
