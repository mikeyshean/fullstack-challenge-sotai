import { DateType, LabelConfig } from "./types";



export function range(size: number, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
}

// Label Configuration

export const getYearlyLabelConfig = (start: number, end: number) => {
  return {
    dateType: 'YEAR' as DateType,
    start: start,
    end: end
  }
}

export const getWeeklyLabelConfig = (start?: number, end?: number) => {
  if (start && end) {
    return {
      dateType: 'WEEKLY' as DateType,
      start: start,
      end: end
    }
  }

  return { dateType: 'WEEKLY' as DateType }
}

export const getMonthlyLabelConfig = () => {
  return {
    dateType: 'MONTHLY' as DateType,
  }
}

export const getWeekdayLabelConfig = () => {
  return {
    dateType: 'WEEKDAY' as DateType,
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
  if (config.dateType == 'MONTHLY') {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  }

  if (config.dateType == 'YEAR' && config.start && config.end) {
    return getYearlyLabels(config.start, config.end)
  }

  if (config.dateType == 'WEEKDAY') {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  }

  if (config.dateType == 'WEEKLY' && config.start && config.end) {
    return getWeeklyLabels(config.start, config.end)
  }
}




