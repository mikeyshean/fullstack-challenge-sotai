import { z } from 'zod'

export const MonthlyHoursByYearSchema = z.object({
  total: z.string(),
  month: z.string()
}).array()

export const YearlyHoursByYearSchema = z.object({
  total: z.string(),
  year: z.string()
}).array()