import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadCoins } from "../store/slices/coinSlice";
import { cryptoConvertorAPI, type CoinData } from "../services/cryptoService";
import type { RootState, AppDispatch } from "../store/index";
import {
  Card,
  Form,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";

export default function CryptoConverter() {
  const dispatch = useDispatch<AppDispatch>();
  const coins = useSelector((state: RootState) => state.coins.list);
  const loading = useSelector((state: RootState) => state.coins.loading);

  const [from, setFrom] = useState<CoinData>(coins[0]);
  const [to, setTo] = useState<CoinData>(coins[1]);
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState<number | null>(null);

  useEffect(() => {
    if (coins.length === 0) dispatch(loadCoins());
  }, []);

  const handleConvert = async () => {
    if (from && to) {
      const result = await cryptoConvertorAPI(from, to, amount);
      setConverted(result);
    }
  };

  return (
    <Card className="p-4">
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Label>From</Form.Label>
            <Form.Select
              value={from?.id || ''}
              onChange={(e) => {
                const selected = coins.find((c) => c.id === e.target.value);
                if (selected) setFrom(selected);
              }}
            >
              {coins.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.symbol}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col>
            <Form.Label>To</Form.Label>
           <Form.Select
              value={to?.id || ''}
              onChange={(e) => {
                const selected = coins.find((c) => c.id === e.target.value);
                if (selected) setTo(selected);
              }}
            >
              {coins.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.symbol}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleConvert} disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : "Convert"}
        </Button>
      </Form>

      {converted !== null && (
        <Alert variant="info" className="mt-3">
          {amount} {from?.symbol.toUpperCase()} = {converted.toFixed(4)} {to?.symbol.toUpperCase()}
        </Alert>
      )}
    </Card>
  );
}
