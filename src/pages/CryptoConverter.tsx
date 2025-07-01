import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadCoins } from "../store/slices/coinSlice";
import { cryptoConvertorAPI, type CoinData } from "../services/cryptoService";
import type { RootState, AppDispatch } from "../store";
import { FaExchangeAlt } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import {
  Card,
  Form,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
  Container,
  InputGroup,
} from "react-bootstrap";

export default function CryptoConverter() {
  const dispatch = useDispatch<AppDispatch>();
  const coins = useSelector((state: RootState) => state.coins.list);
  const loading = useSelector((state: RootState) => state.coins.loading);

  const [from, setFrom] = useState<CoinData | null>(null);
  const [to, setTo] = useState<CoinData | null>(null);
  const [amount, setAmount] = useState(1);

  const [lastConversion, setLastConversion] = useState<{
    from: CoinData;
    to: CoinData;
    amount: number;
    result: number;
  } | null>(null);

  useEffect(() => {
    if (coins.length === 0) {
      dispatch(loadCoins());
    } else {
      if (!from) setFrom(coins[0]);
      if (!to) setTo(coins[1]);
    }
  }, [coins]);

  const handleConvert = async () => {
    if (from && to) {
      const result = await cryptoConvertorAPI(from, to, amount);
      setLastConversion({ from, to, amount, result });
    }
  };

  const handleSwap = () => {
    if (from && to) {
      setFrom(to);
      setTo(from);
    }
  };

  const dropdownVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">Cryptocurrency Converter</h2>
        <p className="text-muted">Easily convert between cryptocurrencies with live rates.</p>
      </div>

      <Card className="p-4 shadow-sm mx-auto" style={{ maxWidth: "720px" }}>
        <Form>
          <Row className="align-items-end g-2 mb-3">
            <Col md={5}>
              <Form.Label>From</Form.Label>
              <AnimatePresence mode="wait">
                <motion.div
                  key={from?.id}
                  variants={dropdownVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                >
                  <Form.Select
                    value={from?.id || ""}
                    onChange={(e) => {
                      const selected = coins.find((c) => c.id === e.target.value);
                      if (selected) setFrom(selected);
                    }}
                  >
                    {coins.map((coin) => (
                      <option key={coin.id} value={coin.id}>
                        {coin.name} ({coin.symbol.toUpperCase()})
                      </option>
                    ))}
                  </Form.Select>
                </motion.div>
              </AnimatePresence>
            </Col>

            <Col md={2} xs="auto" className="d-flex justify-content-center align-items-center">
              <Button
                variant="outline-secondary"
                onClick={handleSwap}
                title="Swap"
                style={{ height: "38px", marginTop: "1rem", border: "1px solid #dee2e6" }}
                className="mb-3 mb-md-0"
              >
                <FaExchangeAlt />
              </Button>
            </Col>

            <Col md={5}>
              <Form.Label>To</Form.Label>
              <AnimatePresence mode="wait">
                <motion.div
                  key={to?.id}
                  variants={dropdownVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                >
                  <Form.Select
                    value={to?.id || ""}
                    onChange={(e) => {
                      const selected = coins.find((c) => c.id === e.target.value);
                      if (selected) setTo(selected);
                    }}
                  >
                    {coins.map((coin) => (
                      <option key={coin.id} value={coin.id}>
                        {coin.name} ({coin.symbol.toUpperCase()})
                      </option>
                    ))}
                  </Form.Select>
                </motion.div>
              </AnimatePresence>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                min={0}
                step={0.0001}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <InputGroup.Text>{from?.symbol.toUpperCase() || ""}</InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <div className="d-grid">
            <Button
              variant="primary"
              onClick={handleConvert}
              disabled={loading || !from || !to}
            >
              {loading ? <Spinner size="sm" animation="border" /> : "Convert"}
            </Button>
          </div>
        </Form>

        {lastConversion && (
          <Alert
            variant={
              lastConversion.result < 0 ? "danger" : "success"
            }
            className="mt-4 text-center fs-5"
          >
            {lastConversion.result === -2 ? (
              <>
                <strong>⚠️ Internal server error:</strong> Please try again later.
              </>
            ) : lastConversion.result === -1 ? (
              <>
                <strong>⚠️ Conversion unavailable:</strong> Data is missing from the API side.
              </>
            ) : (
              <>
                <strong>{lastConversion.amount}</strong> {lastConversion.from.name} ={" "}
                <strong>{lastConversion.result.toFixed(4)}</strong> {lastConversion.to.name}
              </>
            )}
          </Alert>
        )}

      </Card>
    </Container>
  );
}
