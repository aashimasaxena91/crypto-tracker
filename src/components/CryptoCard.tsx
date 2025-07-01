import { Card, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { CoinData } from "../services/cryptoService";
import { loadChartline } from "../store/slices/coinSlice";
import type { RootState, AppDispatch } from "../store";
import DualToggleChart from "./DualToggleChart";

export default function CryptoCard({ coin, index }: { coin: CoinData, index: any }) {
  const dispatch = useDispatch<AppDispatch>();
  const chartData = useSelector((state: RootState) => state.coins.chartData[coin.id]);

useEffect(() => {
    if (!chartData) {
      setTimeout(() => {
        dispatch(loadChartline(coin.id));
      }, 300 * index);
    }
  }, [coin.id, chartData, dispatch]);

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
        {chartData ? <DualToggleChart chart24h={chartData.chart24h} chart7d={chartData.chart7d} toggleGroupName={`toggle-${coin.id}`} /> : (
          <p>Loading chart...</p>
        )}
      </Card.Body>
    </Card>
  );
}
