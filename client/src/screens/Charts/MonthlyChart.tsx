import { LineChart } from '@/components/LineChart'
import { api } from '@/api'
import { getMonthlyLabelConfig } from '@client/utils';
import { useEffect, useState } from 'react';
import { useChartContext } from './context';


export function MonthlyChart() {
  const [monthlyValues, setMonthlyValues] = useState<number[]>([])
  const { ctxMonthlyYear } = useChartContext()
  const { data: monthlyCpuHours } = api.cpuHours.useListMonthlyHoursByYear({ year: ctxMonthlyYear.value })
  const MONTHS_IN_YEAR = 12

  const formatMonthlyValues = () => {
    const monthlyValues = new Array(MONTHS_IN_YEAR).fill(0)
  
    monthlyCpuHours?.forEach(({ total, groupedDate }) => {
      const fullDate = new Date(groupedDate)
      const monthNumber = fullDate.getMonth()
      monthlyValues[monthNumber] = total
    })
    return setMonthlyValues(monthlyValues)
  }

  useEffect(() => {
    formatMonthlyValues()
  }, [monthlyCpuHours])

  return (
    <LineChart dataValues={monthlyValues} dataLabel={ctxMonthlyYear?.value || ''} labelConfig={getMonthlyLabelConfig()} title={"Monthly Usage"} />
  )
}