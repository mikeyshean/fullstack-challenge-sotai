
import { BACKGROUND_COLORS, BORDER_COLORS, range } from '@client/utils'
import { Bar } from 'react-chartjs-2'

export type DateType = 'MONTH' | 'YEAR'

type LabelConfig = {
  dateType: DateType
  count?: number
  start?: number
  end?: number
}

function getYearlyLabels(start: number, end: number) {
  return range(end-start, start).map(item => String(item))
}

function getLabels(config: LabelConfig) {
  if (config.dateType == 'MONTH') {
    // TODO
  }

  if (config.dateType == 'YEAR' && config.start && config.end) {
    return getYearlyLabels(config.start, config.end)
  }
}


export function BarChart({
   dataValues, 
   labelConfig, 
   title, 
   dataLabel 
  }: { 
    dataValues: number[],
    labelConfig: LabelConfig,
    title: string,
    dataLabel: string
  }) {
  const xLabels = getLabels(labelConfig)
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const data = {
    labels: xLabels,
    datasets: [
      {
        label: dataLabel,
        data: dataValues,
        backgroundColor: BACKGROUND_COLORS.slice(0, dataValues.length),
        borderColor: BORDER_COLORS.slice(0, dataValues.length),
        borderWidth: 1
      },
    ],
  };

  return (
    <Bar options={options} data={data} />
  )
}