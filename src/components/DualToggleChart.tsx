import { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import LineChart from "./LineChart";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  chart24h: [string, number][];
  chart7d: [string, number][];
  toggleGroupName: string;
}

export default function DualToggleChart({
  chart24h,
  chart7d,
  toggleGroupName,
}: Props) {
  const [view, setView] = useState<"24h" | "7d">("24h");

  const chartData = view === "24h" ? chart24h : chart7d;

  return (
    <div className="p-3 rounded bg-light shadow-sm text-center">
      <ButtonGroup className="mb-3">
        <ToggleButton
          id={`radio-24h-${toggleGroupName}`}
          type="radio"
          variant={view === "24h" ? "primary" : "outline-primary"}
          name={toggleGroupName}
          value="24h"
          checked={view === "24h"}
          onChange={() => setView("24h")}
        >
          24H
        </ToggleButton>
        <ToggleButton
          id={`radio-7d-${toggleGroupName}`}
          type="radio"
          variant={view === "7d" ? "primary" : "outline-primary"}
          name={toggleGroupName}
          value="7d"
          checked={view === "7d"}
          onChange={() => setView("7d")}
        >
          7D
        </ToggleButton>
      </ButtonGroup>

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <LineChart data={chartData} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
