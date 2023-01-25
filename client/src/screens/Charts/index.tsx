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
  const [yearRange, setYearRange] = useState({start: 2017, end: 2022})
  const { data: monthlyCpuHours } = api.cpuHours.useListMonthlyHoursByYear({year: 2017})
  const { data: yearlyCpuHours } = api.cpuHours.useListYearlyHoursByRange({yearStart: yearRange.start, yearEnd: yearRange.end})
  const { data: weekdayCpuHours } = api.cpuHours.useListWeekdayHoursByRange({yearStart: yearRange.start, yearEnd: yearRange.end})
  
  const getMonthlyValues = () => {
    const monthlyValues = new Array(MONTHS_IN_YEAR).fill(0)
  
    monthlyCpuHours?.forEach(({ total, groupedDate }) => {
      const fullDate = new Date(groupedDate)
      const monthNumber = fullDate.getMonth()
      monthlyValues[monthNumber] = total
    })
    return monthlyValues
  }
  

  const getYearlyLabelConfig = () => {
    return {
      dateType: 'YEAR' as DateType,
      start: yearRange.start,
      end: yearRange.end
    }
  }
  
  const getYearlyValues = () => {
    const yearStart = yearRange.start
    const yearEnd = yearRange.end
    const yearlyValues = new Array(yearEnd-yearStart).fill(0)
  
    yearlyCpuHours?.forEach(({ total, groupedDate }) => {
      const fullDate = new Date(groupedDate)
      const yearNumber = fullDate.getFullYear()
      yearlyValues[yearNumber-yearStart] = total
    })
    return yearlyValues
  }
  
  const getWeekdayLabelConfig = () => {
    return {
      dateType: 'WEEKDAY' as DateType,
    }
  }
  
  const getWeekdayValues = () => {
    const yearStart = yearRange.start
    const yearEnd = yearRange.end
    const yearlyValues = new Array(yearEnd-yearStart).fill(0)
  
    weekdayCpuHours?.forEach(({ total, groupedWeekday }) => {
      yearlyValues[groupedWeekday-1] = total
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
          <BarChart dataValues={getWeekdayValues()} labelConfig={getWeekdayLabelConfig()} dataLabel={"Day of Week CPU Hours"} title={"Usage by Day of the Week"} />
        </div>
      </div>
    </div>
  )
}