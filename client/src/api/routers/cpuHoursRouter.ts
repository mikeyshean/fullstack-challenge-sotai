import { fetcher } from "./fetcher";
import { useQuery } from '@tanstack/react-query'
import { ListHoursByDateSchema, ListHoursByWeekdaySchema, ListHoursByWeekSchema, YearsSchema } from '@/api/schemas'


export const cpuHoursRouter =  {
  useListMonthlyHoursByYear: ({year, ...args}: { year?: string, [key: string]: any}) => {
    const queryFn = async () => { 
      try {
        let path = '/cpuhours/monthly-hours-by-year'
        if (year) {
          const data = { year: year }
          path += "?" + new URLSearchParams(data)
        }
        const response = await fetcher(path)
        return ListHoursByDateSchema.parse(response)
      } catch (err) {
        throw new Error("List Monthly CPU Hours API Error")
      }
    }
    return useQuery({ queryKey: [ 'monthly-hours-by-year', year ], queryFn: queryFn, ...args })
  },
  
  useListYearlyHoursByRange: ({yearStart = new Date().getFullYear(), yearEnd = new Date().getFullYear(), ...args}: { yearStart: number, yearEnd: number, [key: string]: any}) => {
    const queryFn = async () => { 
      try {
        let path = '/cpuhours/yearly-hours-by-range'
        if (yearStart && yearEnd) {
          const data = { year_start: String(yearStart), year_end: String(yearEnd) }
          path += "?" + new URLSearchParams(data)
        }
        const response = await fetcher(path)
        return ListHoursByDateSchema.parse(response)
      } catch (err) {
        throw new Error("List Yearly CPU Hours API Error")
      }
    }
    return useQuery({ queryKey: [ 'yearly-hours-by-range', yearStart, yearEnd ], queryFn: queryFn, ...args })
  },
  
  useListWeekdayHoursByRange: ({yearStart = new Date().getFullYear(), yearEnd = new Date().getFullYear(), ...args}: { yearStart: number, yearEnd: number, [key: string]: any}) => {
    const queryFn = async () => { 
      try {
        let path = '/cpuhours/weekday-hours-by-range'
        if (yearStart && yearEnd) {
          const data = { year_start: String(yearStart), year_end: String(yearEnd) }
          path += "?" + new URLSearchParams(data)
        }
        const response = await fetcher(path)
        return ListHoursByWeekdaySchema.parse(response)
      } catch (err) {
        throw new Error("List Weekday CPU Hours API Error")
      }
    }
    return useQuery({ queryKey: [ 'weekday-hours-by-range', yearStart, yearEnd ], queryFn: queryFn, ...args })
  },
  
  useListWeeklyHoursByRange: ({dateStart = new Date(), dateEnd = new Date(), ...args}: { dateStart: Date, dateEnd: Date, [key: string]: any}) => {
    const queryFn = async () => { 
      try {
        let path = '/cpuhours/weekly-hours-by-range'
        if (dateStart && dateEnd) {
          const data = { date_start: dateStart.toLocaleDateString('en-us'), date_end: dateEnd.toLocaleDateString('en-us') }
          path += "?" + new URLSearchParams(data)
        }
        const response = await fetcher(path)
        return ListHoursByWeekSchema.parse(response)
      } catch (err) {
        throw new Error("List Weekly CPU Hours API Error")
      }
    }
    return useQuery({ queryKey: [ 'weekly-hours-by-range', dateStart, dateEnd ], queryFn: queryFn, ...args })
  },
  
  useListYears: () => {
    const queryFn = async () => { 
      try {
        const path = '/cpuhours/years'
        const response = await fetcher(path)
        return YearsSchema.parse(response)
      } catch (err) {
        throw new Error("List Years API Error")
      }
    }
    return useQuery({ queryKey: [ 'years' ], queryFn: queryFn })
  }
}


