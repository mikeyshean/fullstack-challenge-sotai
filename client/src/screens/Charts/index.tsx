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
import { useState } from 'react';
import { DateType, LabelConfig } from '@client/types';
import { getMonthlyLabelConfig, getWeekdayLabelConfig, getWeeklyLabelConfig, getYearlyLabelConfig } from '@client/utils';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



export function ChartsPage() {
  const [yearRange, setYearRange] = useState({start: 2017, end: 2022})
  const [weeklyRange, setWeeklyRange] = useState({start: new Date('12/6/2022'), end: new Date('12/31/2022')})
  const { data: monthlyCpuHours } = api.cpuHours.useListMonthlyHoursByYear({year: 2017})
  const { data: yearlyCpuHours } = api.cpuHours.useListYearlyHoursByRange({yearStart: yearRange.start, yearEnd: yearRange.end})
  const { data: weekdayCpuHours } = api.cpuHours.useListWeekdayHoursByRange({yearStart: yearRange.start, yearEnd: yearRange.end})
  const { data: weeklyCpuHours } = api.cpuHours.useListWeeklyHoursByRange({dateStart: weeklyRange.start, dateEnd: weeklyRange.end})
  const MONTHS_IN_YEAR = 12

  const getMonthlyValues = () => {
    const monthlyValues = new Array(MONTHS_IN_YEAR).fill(0)
  
    monthlyCpuHours?.forEach(({ total, groupedDate }) => {
      const fullDate = new Date(groupedDate)
      const monthNumber = fullDate.getMonth()
      monthlyValues[monthNumber] = total
    })
    return monthlyValues
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
  
  const getWeekdayValues = () => {
    const IDX_OFFSET = 1
    const yearStart = yearRange.start
    const yearEnd = yearRange.end
    const yearlyValues = new Array(yearEnd-yearStart).fill(0)
  
    weekdayCpuHours?.forEach(({ total, groupedWeekday }) => {
      yearlyValues[groupedWeekday-IDX_OFFSET] = total
    })
    return yearlyValues
  }

  const getWeeklyValues = () => {
    const weeklyValues = new Array(weeklyCpuHours?.length).fill(0)
  
    const firstWeek = weeklyCpuHours && weeklyCpuHours[0] && weeklyCpuHours[0].groupedWeek
    if (firstWeek) {
      weeklyCpuHours?.forEach(({ total, groupedWeek }) => {
        weeklyValues[groupedWeek-firstWeek] = total
      })
    }
    return weeklyValues
  }

  const getWeeklyConfig = () => {
    const start  = weeklyCpuHours && 
                   weeklyCpuHours[0] && 
                   weeklyCpuHours[0].groupedWeek
    const end  = weeklyCpuHours && 
                 weeklyCpuHours[weeklyCpuHours.length-1] && 
                 weeklyCpuHours[weeklyCpuHours.length-1].groupedWeek
    
    return getWeeklyLabelConfig(start, end)
  }

  return (
    <div className='flex w-full flex-col h-screen py-10 px-5'>
      
      <div className='flex flex-col lg:flex-row p-10 px-0 md:px-40 h-full justify-between'>
        <div className='w-full pb-5 lg:pb-0 lg:w-2/5 h-full'>
          <LineChart dataValues={getMonthlyValues()} dataLabel={"2017"} labelConfig={getMonthlyLabelConfig()} title={"Monthly Usage"} />
        </div>
        <div className='w-full lg:w-2/5 h-full'>
          <BarChart dataValues={getYearlyValues()} labelConfig={getYearlyLabelConfig(yearRange.start, yearRange.end)} dataLabel={"CPU Hours"} title={"Yearly Usage"} />
        </div>
      </div>

      <div className='flex flex-col lg:flex-row p-10 px-0 md:px-40 h-full justify-between'>
        <div className='w-full pb-5 lg:pb-0 lg:w-2/5 h-full'>
          <LineChart dataValues={getWeeklyValues()} dataLabel='CPU Hours' labelConfig={getWeeklyConfig()} title={"Weekly Usage"} />
        </div>
        <div className='w-full lg:w-2/5 h-full'>
          <BarChart dataValues={getWeekdayValues()} labelConfig={getWeekdayLabelConfig()} dataLabel={"CPU Hours"} title={"Usage by Day of the Week"} />
        </div>
      </div>
    </div>
  )
}