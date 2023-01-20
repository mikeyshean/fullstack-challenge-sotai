import './styles/globals.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { BarChart } from './components/BarChart'
const queryClient = new QueryClient()

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className='flex w-full flex-col h-screen p-10'>
        
        <div className='flex flex-row p-10 px-40 h-1/2 justify-between'>
          <div className='w-2/5'>
            <BarChart />
          </div>
          <div className='w-2/5'>
            <BarChart />
          </div>
        </div>

        <div className='flex flex-row p-10 px-40 h-1/2 justify-between'>
          <div className='w-2/5'>
            <BarChart />
          </div>
          <div className='w-2/5'>
            <BarChart />
          </div>
        </div>
      </div>

    </QueryClientProvider>
  )
}