export enum ChartType {
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly',
  WEEKLY = 'Weekly',
  WEEKDAY = 'Weekday'
}

export type LabelConfig = {
  chartType: ChartType
  count?: number
  start?: number
  end?: number
}
