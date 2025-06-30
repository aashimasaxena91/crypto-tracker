import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CryptoConverter from "./pages/CryptoConverter";

export default function App() {
  return (
    <div className="container py-4">
      <nav className="d-flex justify-content-between align-items-center mb-4">
        <h2>Crypto Tracker</h2>
        <div className="nav gap-3">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/convert">Converter</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/convert" element={<CryptoConverter />} />
      </Routes>
    </div>
  );
}
