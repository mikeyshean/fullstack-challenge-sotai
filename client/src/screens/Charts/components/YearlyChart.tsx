import { BarChart } from '@/components/BarChart'
import { api } from '@/api'
import { useState } from 'react';
import { getYearlyLabelConfig } from '@client/utils';




export function YearlyChart() {
  const [yearRange, setYearRange] = useState({start: 2017, end: 2022})
  const { data: yearlyCpuHours } = api.cpuHours.useListYearlyHoursByRange({yearStart: yearRange.start, yearEnd: yearRange.end})
  
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

  return (
    <BarChart dataValues={getYearlyValues()} labelConfig={getYearlyLabelConfig(yearRange.start, yearRange.end)} dataLabel={"CPU Hours"} title={"Yearly Usage"} />
  )
}