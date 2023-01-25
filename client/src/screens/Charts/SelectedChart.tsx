import { classNames } from '@client/utils';
import { MonthlyChart } from './components/MonthlyChart';
import { ChartType } from '@client/types';
import { YearlyChart } from './components/YearlyChart';
import { useChartContext } from './context';
import { ArrowsPointingInIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

export function SelectedChart() {
  const { selectedChart, setSelectedChart } = useChartContext()

  const chartComponents = {
    [ChartType.MONTHLY]: <MonthlyChart />,
    [ChartType.YEARLY]: <YearlyChart />,
    [ChartType.WEEKLY]: <MonthlyChart />,
    [ChartType.WEEKDAY]: <MonthlyChart />
  }

  useEffect(() => {
    console.log(selectedChart)
  }, [selectedChart])

  return (
    <div className={classNames(
      selectedChart ? '' : 'hidden',
      'flex w-full flex-col h-screen py-10 px-5'
      )}>
        <button className={classNames(
          selectedChart ? '' : 'hidden',
          'absolute right-5 top-5'
          )}
          onClick={() => setSelectedChart(null)}>
          <ArrowsPointingInIcon
            className='text-gray-400 hover:text-gray-500 h-10 w-10'
            aria-hidden="true"
          />
        </button>
      { selectedChart && chartComponents[selectedChart] }
    </div>
  )
}