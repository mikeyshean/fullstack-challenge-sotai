import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartProvider } from './context';
import { ChartOverview } from './ChartOverview';
import { SelectedChart } from './SelectedChart';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function ChartsPage() {
  return (
    <ChartProvider>
      <ChartOverview />
      <SelectedChart />
    </ChartProvider>
  )
}