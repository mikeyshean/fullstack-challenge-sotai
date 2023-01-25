import { EmptySelectItem, SelectItem } from '@/components/Forms/Select';
import { ChartType } from '@client/types';
import { createContext, useContext, useState } from 'react';


type ChartContextValues = {
  ctxMonthlyYear: SelectItem,
  setCtxMonthlyYear: (item: SelectItem) => void,
  selectedChart: ChartType|null,
  setSelectedChart: (item: ChartType|null) => void
}

const ChartContext = createContext({} as ChartContextValues);

export function ChartProvider({ children }: { children: React.ReactNode }) {
  const [ ctxMonthlyYear, setCtxMonthlyYear ] = useState<SelectItem>(EmptySelectItem)
  const [selectedChart, setSelectedChart] = useState<ChartType|null>(null)

  return (
    <ChartContext.Provider value={{ 
      ctxMonthlyYear,
      setCtxMonthlyYear,
      selectedChart,
      setSelectedChart
    }}>
      {children}
    </ChartContext.Provider>
  );
}

export function useChartContext() {
  return useContext(ChartContext);
}