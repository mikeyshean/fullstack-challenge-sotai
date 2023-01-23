import { BarChart } from '@/components/BarChart'
import { LineChart } from '@/components/LineChart'


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { api } from '@/api'


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MONTHS_IN_YEAR = 12
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


export function ChartsPage() {
  const { data: annualCpuHours } = api.cpuHours.useListMonthlyHoursByYear({year: 2017})
  
  
  const getMonthlyValues = () => {
    const monthlyValues = new Array(MONTHS_IN_YEAR).fill(0)
  
    annualCpuHours?.forEach(({ total, month }) => {
      const date = new Date(month)
      const monthNumber = date.getMonth()
      monthlyValues[monthNumber] = total
    })
    return monthlyValues
  }


  return (
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
          <LineChart dataValues={getMonthlyValues()} dataLabel={"2017"} xLabels={labels} title={"Monthly Usage By Year"} />
        </div>
        <div className='w-full lg:w-2/5 h-full'>
          <LineChart dataValues={getMonthlyValues()} dataLabel={"2017"} xLabels={labels} title={"Monthly Usage By Year"} />
        </div>
      </div>
    </div>
  )
}