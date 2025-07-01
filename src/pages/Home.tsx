import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCoins } from "../store/slices/coinSlice";
import CryptoCard from "../components/CryptoCard";
import type { RootState, AppDispatch } from "../store";
import { Row, Col, Spinner, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { list: coins, loading } = useSelector(
    (state: RootState) => state.coins,
  );

  useEffect(() => {
    if (coins.length === 0) dispatch(loadCoins());
  }, []);

  return (
    <Container className="mt-3">
      <div className="py-5 text-center text-white bg-primary rounded mb-4">
        <h1 className="fw-bold">Welcome to Crypto Tracker</h1>
        <p className="lead mb-3">
          Stay updated with the latest cryptocurrency prices and trends in
          real-time.
        </p>
        <Button
          as={Link as any}
          to="/convert"
          variant="light"
          size="lg"
          className="fw-semibold px-4 m-3"
        >
          Try Crypto Convertor
        </Button>
      </div>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row xs={1} md={2} lg={2} className="g-4">
          {coins.map((coin, index) => (
            <Col key={coin.id}>
              <CryptoCard coin={coin} index={index} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
