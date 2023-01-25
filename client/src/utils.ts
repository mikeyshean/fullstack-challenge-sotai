import { ChartType, LabelConfig } from "./types";

export function range(size: number, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

// Label Configuration

export const getYearlyLabelConfig = (start: number, end: number) => {
  return {
    chartType: ChartType.YEARLY,
    start: start,
    end: end
  }
}

export const getWeeklyLabelConfig = (start?: number, end?: number) => {
  if (start && end) {
    return {
      chartType: ChartType.WEEKLY,
      start: start,
      end: end
    }
  }

  return { chartType: ChartType.WEEKLY }
}

export const getMonthlyLabelConfig = () => {
  return {
    chartType: ChartType.MONTHLY,
  }
}

export const getWeekdayLabelConfig = () => {
  return {
    chartType: ChartType.WEEKDAY,
  }
}


// Helpers for Label Text

function getYearlyLabels(start: number, end: number) {
  return range(end-start, start).map(item => String(item))
}

function getWeeklyLabels(start: number, end: number) {
  return range(end+1-start, start).map(item => `Week ${item}`)
}

export function getLabels(config: LabelConfig) {
  if (config.chartType == ChartType.MONTHLY) {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  }

  if (config.chartType == ChartType.YEARLY && config.start && config.end) {
    return getYearlyLabels(config.start, config.end)
  }

  if (config.chartType == ChartType.WEEKDAY) {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  }

  if (config.chartType == ChartType.WEEKLY && config.start && config.end) {
    return getWeeklyLabels(config.start, config.end)
  }
}




