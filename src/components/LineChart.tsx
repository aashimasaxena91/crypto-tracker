
import Chart from 'react-google-charts';

export default function LineChart({ data }: { data: (string | Date | number)[][]}) {

  return (
    <Chart chartType='LineChart' data={data} height="100%" legendToggle />
  );
}
