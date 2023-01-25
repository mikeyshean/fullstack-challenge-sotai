export type DateType = 'MONTHLY' | 'YEAR' | 'WEEKDAY' | 'WEEKLY'

export type LabelConfig = {
  dateType: DateType
  count?: number
  start?: number
  end?: number
}
