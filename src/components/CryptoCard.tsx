import { Card, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { CoinData } from "../services/cryptoService";
import { loadSparkline } from "../store/slices/coinSlice";
import type { RootState, AppDispatch } from "../store";
import LineChart from "./LineChart";

export default function CryptoCard({ coin }: { coin: CoinData }) {
  const dispatch = useDispatch<AppDispatch>();
  const chartData = useSelector((state: RootState) => state.coins.chartData[coin.id]);

  useEffect(() => {
    if (!chartData) dispatch(loadSparkline(coin.id));
  }, [coin.id]);


  return (
    <Card>
      <Card.Body>
        <Row className="align-items-center mb-3">
          <Col xs="auto">
            <img src={coin.logo} alt={coin.symbol} width={40} />
          </Col>
          <Col>
            <Card.Title>
              {coin.name} ({coin.symbol})
            </Card.Title>
            <Card.Subtitle className="text-muted">Price: ${coin.price.toFixed(2)}</Card.Subtitle>
          </Col>
        </Row>

        <LineChart data={chartData}/>

      </Card.Body>
    </Card>
  );
}
