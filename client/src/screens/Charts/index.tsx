import { BarChart, DateType } from '@/components/BarChart'
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
import { useState } from 'react';


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
  const [yearRange, setYearRange] = useState([2017, 2022])
  const { data: monthlyCpuHours } = api.cpuHours.useListMonthlyHoursByYear({year: 2017})
  const { data: yearlyCpuHours } = api.cpuHours.useListYearlyHoursByRange({yearStart: yearRange[0], yearEnd: yearRange[1]})
  
  const getMonthlyValues = () => {
    const monthlyValues = new Array(MONTHS_IN_YEAR).fill(0)
  
    monthlyCpuHours?.forEach(({ total, month }) => {
      const fullDate = new Date(month)
      const monthNumber = fullDate.getMonth()
      monthlyValues[monthNumber] = total
    })
    return monthlyValues
  }
  

  const getYearlyLabelConfig = () => {
    return {
      dateType: 'YEAR' as DateType,
      start: yearRange[0],
      end: yearRange[1]
    }
  }
  
  const getYearlyValues = () => {
    const yearStart = yearRange[0]
    const yearEnd = yearRange[1]
    const yearlyValues = new Array(yearEnd-yearStart).fill(0)
  
    yearlyCpuHours?.forEach(({ total, year }) => {
      const fullDate = new Date(year)
      const yearNumber = fullDate.getFullYear()
      yearlyValues[yearNumber-yearStart] = total
    })
    return yearlyValues
  }


  return (
    <div className='flex w-full flex-col h-screen py-10 px-5'>
      
      <div className='flex flex-col lg:flex-row p-10 px-0 md:px-40 h-full justify-between'>
        <div className='w-full pb-5 lg:pb-0 lg:w-2/5 h-full'>
          <LineChart dataValues={getMonthlyValues()} dataLabel={"2017"} xLabels={labels} title={"Monthly Usage By Year"} />
        </div>
        <div className='w-full lg:w-2/5 h-full'>
          <BarChart dataValues={getYearlyValues()} labelConfig={getYearlyLabelConfig()} dataLabel={"CPU Hours"} title={"Yearly Usage By Range"} />
        </div>
      </div>

      <div className='flex flex-col lg:flex-row p-10 px-0 md:px-40 h-full justify-between'>
        <div className='w-full pb-5 lg:pb-0 lg:w-2/5 h-full'>
          <LineChart dataValues={getMonthlyValues()} dataLabel={"2017"} xLabels={labels} title={"Monthly Usage By Year"} />
        </div>
        <div className='w-full lg:w-2/5 h-full'>
          <BarChart dataValues={getYearlyValues()} labelConfig={getYearlyLabelConfig()} dataLabel={"CPU Hours"} title={"Yearly Usage By Range"} />
        </div>
      </div>
    </div>
  )
}