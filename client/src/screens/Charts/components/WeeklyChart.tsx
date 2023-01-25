import { LineChart } from '@/components/LineChart'
import { api } from '@/api'
import { useState } from 'react';
import { getWeeklyLabelConfig } from '@client/utils';




export function WeeklyChart() {
  const [weeklyRange, setWeeklyRange] = useState({start: new Date('12/6/2022'), end: new Date('12/31/2022')})
  const { data: weeklyCpuHours } = api.cpuHours.useListWeeklyHoursByRange({dateStart: weeklyRange.start, dateEnd: weeklyRange.end})

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
    <LineChart dataValues={getWeeklyValues()} dataLabel='CPU Hours' labelConfig={getWeeklyConfig()} title={"Weekly Usage"} />
  )
}