import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CryptoConverter from "./pages/CryptoConverter";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import FullPageLoader from "./components/FullPageLoader";
import ErrorPage from "./components/ErrorPage";
import type { RootState } from "./store";

export default function App() {
  const { loading, error } = useSelector((state: RootState) => state.coins);

  if (loading) return <FullPageLoader />;
  if (error) return <ErrorPage message={error} />;

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavigationBar />
      <Container fluid className="flex-grow-1 py-4 w-75 mt-5 pt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/convert" element={<CryptoConverter />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}
