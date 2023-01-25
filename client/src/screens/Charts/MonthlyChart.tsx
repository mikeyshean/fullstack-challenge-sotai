import { LineChart } from '@/components/LineChart'
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline'

import { api } from '@/api'
import { getMonthlyLabelConfig } from '@client/utils';


export function MonthlyChart() {
  const { data: monthlyCpuHours } = api.cpuHours.useListMonthlyHoursByYear({year: 2017})
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

  return (
    <LineChart dataValues={getMonthlyValues()} dataLabel={"2017"} labelConfig={getMonthlyLabelConfig()} title={"Monthly Usage"} />
  )
}