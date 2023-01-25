import { z } from 'zod'


export const HoursByDateSchema = z.object({
  total: z.string(),
  grouped_date: z.string()
}).transform((input) => ({
  total: input.total,
  groupedDate: input.grouped_date
}))

export const ListHoursByDateSchema = HoursByDateSchema.array()

export const HoursByWeekdaySchema = z.object({
  total: z.string(),
  grouped_weekday: z.number()
}).transform((input) => ({
  total: input.total,
  groupedWeekday: input.grouped_weekday
}))

export const ListHoursByWeekdaySchema = HoursByWeekdaySchema.array()

export const HoursByWeekSchema = z.object({
  total: z.string(),
  grouped_week: z.number()
}).transform((input) => ({
  total: input.total,
  groupedWeek: input.grouped_week
}))

export const ListHoursByWeekSchema = HoursByWeekSchema.array()
