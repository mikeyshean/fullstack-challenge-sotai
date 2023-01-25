
import { BACKGROUND_COLORS, BORDER_COLORS } from '@client/constants';
import { getLabels } from '@client/utils';
import { Bar } from 'react-chartjs-2'
import { LabelConfig } from '../types'

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
    labels: getLabels(labelConfig),
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