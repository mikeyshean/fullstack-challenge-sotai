import { BarChart } from '@/components/BarChart'
import { api } from '@/api'
import { useState } from 'react';
import { getWeekdayLabelConfig } from '@client/utils';




export function WeekdayChart() {
  const [yearRange, setYearRange] = useState({start: 2017, end: 2022})
  const { data: weekdayCpuHours } = api.cpuHours.useListWeekdayHoursByRange({yearStart: yearRange.start, yearEnd: yearRange.end})
  
  
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

  return (
    <BarChart dataValues={getWeekdayValues()} labelConfig={getWeekdayLabelConfig()} dataLabel={"CPU Hours"} title={"Usage by Day of the Week"} />
  )
}