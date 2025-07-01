import Chart from "react-google-charts";

interface LineChartProps {
  data: [string, number][];
}

export default function LineChart({ data }: LineChartProps) {
  if (!data || data.length === 0) return <div>No data available</div>;

  // Google Chart expects header row as first element
  const formattedData: (string | number)[][] = [["Time", "Price"], ...data];

  for (let i = 1; i < formattedData.length; i++) {
    const row = formattedData[i];
    if (
      !Array.isArray(row) ||
      typeof row[0] !== "string" ||
      typeof row[1] !== "number"
    ) {
      console.error("Invalid data row:", row);
      return <div>Error: Malformed chart data</div>;
    }
  }

  const firstPrice = formattedData[1][1] as number;
  const lastPrice = formattedData[formattedData.length - 1][1] as number;
  const isGrowing = lastPrice >= firstPrice;
  const changePercent = (((lastPrice - firstPrice) / firstPrice) * 100).toFixed(2);

  const options = {
    legend: { position: "none" },
    colors: [isGrowing ? "#00c853" : "#d50000"],
    lineWidth: 2,
    chartArea: { width: "85%", height: "70%" },
    hAxis: {
      title: "Time",
      textStyle: { color: "#555" },
      gridlines: { color: "#eee" },
    },
    vAxis: {
      title: "Price",
      textStyle: { color: "#555" },
      gridlines: { color: "#eee" },
    },
    tooltip: { isHtml: true },
    animation: {
      startup: true,
      easing: "out",
    },
  };

  return (
    <div>
      <div
        style={{
          fontSize: "0.9rem",
          fontWeight: 600,
          color: isGrowing ? "#00c853" : "#d50000",
          marginBottom: "0.5rem",
        }}
      >
        {isGrowing ? "▲" : "▼"} {Math.abs(Number(changePercent)).toFixed(2)}% over time
      </div>

      <Chart
        chartType="LineChart"
        data={formattedData}
        options={options}
        height="300px"
        width="100%"
        loader={<div>Loading Chart...</div>}
      />
    </div>
  );
}
