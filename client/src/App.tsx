import './styles/globals.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { BarChart } from './components/BarChart'
import { LineChart } from './components/LineChart'
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
      <div className='flex w-full flex-col h-screen py-10 px-5'>
        
        <div className='flex flex-col lg:flex-row p-10 px-0 md:px-40 h-full justify-between'>
          <div className='w-full pb-5 lg:pb-0 lg:w-2/5 h-full'>
            <BarChart />
          </div>
          <div className='w-full lg:w-2/5 h-full'>
            <BarChart />
          </div>
        </div>

        <div className='flex flex-col lg:flex-row p-10 px-0 md:px-40 h-full justify-between'>
          <div className='w-full pb-5 lg:pb-0 lg:w-2/5 h-full'>
            <LineChart />
          </div>
          <div className='w-full lg:w-2/5 h-full'>
            <LineChart />
          </div>
        </div>
      </div>

    </QueryClientProvider>
  )
}