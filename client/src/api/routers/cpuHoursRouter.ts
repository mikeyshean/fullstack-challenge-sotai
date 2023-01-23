import { fetcher } from "./fetcher";
import { useQuery } from '@tanstack/react-query'
import { MonthlyHoursByYearSchema } from '@/api/schemas'


export const cpuHoursRouter =  {
  useListMonthlyHoursByYear: ({year = new Date().getFullYear(), ...args}: { year?: number, [key: string]: any}) => {
    const queryFn = async () => { 
      try {
        let path = '/cpuhours/daily-hours-by-year'
        if (year) {
          const data = { year: String(year) }
          path += "?" + new URLSearchParams(data)
        }
        const response = await fetcher(path)
        return MonthlyHoursByYearSchema.parse(response)
      } catch (err) {
        throw new Error("List CPU Hours API Error")
      }
    }
    return useQuery({ queryKey: [ 'cpuHours', year ], queryFn: queryFn, ...args })
  }
}


