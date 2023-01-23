import './styles/globals.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ChartsPage } from '@/screens/Charts'
const queryClient = new QueryClient()


export function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ChartsPage />
    </QueryClientProvider>
  )
}