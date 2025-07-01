import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCoins } from "../store/slices/coinSlice";
import CryptoCard from "../components/CryptoCard";
import type { RootState, AppDispatch } from "../store";
import { Row, Col, Spinner } from "react-bootstrap";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const coins = useSelector((state: RootState) => state.coins.list);
  const loading = useSelector((state: RootState) => state.coins.loading);

  useEffect(() => {
    dispatch(loadCoins());
  }, []);

  return loading ? (
    <div className="text-center">
      <Spinner animation="border" variant="primary" />
    </div>
  ) : (
    <Row xs={1} md={2} className="g-4">
      {coins.map((coin) => (
        <Col key={coin.id}>
          <CryptoCard coin={coin} />
        </Col>
      ))}
    </Row>
  );
}