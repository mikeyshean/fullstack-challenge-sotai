import { ArrowsPointingOutIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { api } from '@/api'
import Modal from '@client/components/Forms/Modal';
import { Select, SelectItem } from '@client/components/Forms/Select';
import { useEffect, useState } from 'react';
import { MonthlyChart } from './components/MonthlyChart';
import { useChartContext } from './context';
import { ChartType } from '@client/types';


export function SmallMonthlyChart() {
  const { ctxMonthlyYear, setCtxMonthlyYear, setSelectedChart }= useChartContext()
  const [yearSelectItems, setYearSelectItems] = useState<SelectItem[]>([])
  const [show, setShow] = useState(false)
  const { data: years } = api.cpuHours.useListYears()

  const toggleModal = () => {
    setShow(!show)
  }

  useEffect(() => {
    if (years && years.length > 0) {
      const items = years.map((year, idx) => { 
        return { key: idx, value: new Date(year).getFullYear().toString() }
      })
      setYearSelectItems(items)
    }
  }, [years])

  useEffect(() => {
    if (!ctxMonthlyYear?.value && yearSelectItems.length > 0) {
      setCtxMonthlyYear(yearSelectItems[0])
    }
  }, [yearSelectItems])

  return (
    <div className='w-full p-5 lg:w-2/5 h-full relative border-gray-400 border'>
      <Modal cancelText='' submitText='Done' onSubmit={toggleModal} show={show} toggleModal={toggleModal}>
        <Select name='Year' selected={ctxMonthlyYear} items={yearSelectItems} onChange={setCtxMonthlyYear}></Select>
      </Modal>
      <MonthlyChart />
      <button className='absolute right-10 top-2' onClick={(() => setShow(true))}>
        <PencilSquareIcon
          className='text-gray-400 hover:text-gray-500 h-6 w-6'
          aria-hidden="true"
        />
      </button>
      <button className='absolute right-2 top-2' onClick={(() => setSelectedChart(ChartType.MONTHLY))}>
        <ArrowsPointingOutIcon
          className='text-gray-400 hover:text-gray-500 h-6 w-6'
          aria-hidden="true"
        />
      </button>
    </div>
  )
}