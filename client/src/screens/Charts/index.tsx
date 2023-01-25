import { ArrowsPointingOutIcon, ArrowsPointingInIcon } from '@heroicons/react/24/outline'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useState } from 'react';
import { classNames } from '@client/utils';
import { MonthlyChart } from './MonthlyChart';
import { ChartType } from '@client/types';
import { YearlyChart } from './YearlyChart';
import { WeeklyChart } from './WeeklyChart';
import { WeekdayChart } from './WeekdayChart';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartComponents = {
  [ChartType.MONTHLY]: <MonthlyChart />,
  [ChartType.YEARLY]: <YearlyChart />,
  [ChartType.WEEKLY]: <MonthlyChart />,
  [ChartType.WEEKDAY]: <MonthlyChart />
}



export function ChartsPage() {
  const [selectedChart, setSelectedChart] = useState<ChartType|null>(null)

  return (
    <div className='flex w-full flex-col h-screen py-10 px-5'>
      
      <div className={classNames(
        selectedChart ? 'hidden' : '',
        'flex flex-col lg:flex-row p-10 px-0 md:px-10 h-full justify-evenly'
        )}>
        <div className='w-full p-5 lg:w-2/5 h-full relative border-gray-400 border'>
          <MonthlyChart />
          <button className='absolute right-2 top-2' onClick={(() => setSelectedChart(ChartType.MONTHLY))}>
            <ArrowsPointingOutIcon
              className='text-gray-400 hover:text-gray-500 h-6 w-6'
              aria-hidden="true"
            />
          </button>
        </div>
        <div className='w-full p-5 lg:w-2/5 h-full relative border-gray-400 border'>
          <YearlyChart />
          <button className='absolute right-2 top-2' onClick={(() => setSelectedChart(ChartType.YEARLY))}>
            <ArrowsPointingOutIcon
              className='text-gray-400 hover:text-gray-500 h-6 w-6'
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <div className={classNames(
        selectedChart ? 'hidden' : '',
        'flex flex-col lg:flex-row p-10 px-0 md:px-10 h-full justify-evenly'
        )}>
        <div className='w-full p-5 lg:w-2/5 h-full relative border-gray-400 border'>
          <WeeklyChart />
          <button className='absolute right-2 top-2' onClick={(() => setSelectedChart(ChartType.WEEKLY))}>
            <ArrowsPointingOutIcon
              className='text-gray-400 hover:text-gray-500 h-6 w-6'
              aria-hidden="true"
            />
          </button>
        </div>
        <div className='w-full p-5 lg:w-2/5 h-full relative border-gray-400 border'>
          <WeekdayChart />
          <button className='absolute right-2 top-2' onClick={(() => setSelectedChart(ChartType.WEEKDAY))}>
            <ArrowsPointingOutIcon
              className='text-gray-400 hover:text-gray-500 h-6 w-6'
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
      <button className={classNames(
        selectedChart ? '' : 'hidden',
        'absolute right-10 top-5'
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