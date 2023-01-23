import { z } from 'zod'

export const MonthlyHoursByYearSchema = z.object({
  total: z.string(),
  month: z.string()
}).array()
