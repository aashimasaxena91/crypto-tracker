import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CryptoConverter from "./pages/CryptoConverter";
import NavigationBar from "./components/NavigationBar";

export default function App() {
  return (
    <>
      <NavigationBar />
      <Container fluid className="py-4 w-75 mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/convert" element={<CryptoConverter />} />
        </Routes>
      </Container>
    </>
  );
}
