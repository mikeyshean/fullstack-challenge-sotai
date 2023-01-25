import { 
  ArrowsPointingOutIcon,
} from '@heroicons/react/24/outline'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { classNames } from '@client/utils';
import { ChartType } from '@client/types';
import { YearlyChart } from './components/YearlyChart';
import { WeeklyChart } from './components/WeeklyChart';
import { WeekdayChart } from './components/WeekdayChart';
import { SmallMonthlyChart } from './SmallMonthlyChart';
import { useChartContext } from './context';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function ChartOverview() {
  const {selectedChart, setSelectedChart} = useChartContext()

  return (
      <div className={classNames(
        selectedChart ? 'hidden' : '',
          'flex w-full flex-col h-screen py-10 px-5'
         )}>
        <div className={classNames(
          selectedChart ? 'hidden' : '',
          'flex flex-col lg:flex-row p-10 px-0 md:px-10 h-full justify-evenly'
          )}>
          {/* I only had time to convert this one to its own compoenent
              With more time, I would have continued converting the remaining to their own.
           */}
          <SmallMonthlyChart />
            
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
      </div>
  )
}