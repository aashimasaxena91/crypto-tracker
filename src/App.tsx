import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CryptoConverter from "./pages/CryptoConverter";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavigationBar />
      <Container fluid className="flex-grow-1 py-4 w-75 mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/convert" element={<CryptoConverter />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}
