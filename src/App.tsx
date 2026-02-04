import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import DictionaryPage from './features/dictionary/components/DictionaryPage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import DictionaryBackground from './components/DictionaryBackground';
import MainHeader from './components/MainHeader';
import { useStore } from './lib/store';

export default function App() {
  const isShowHeader = useStore(s => s.isShowHeader)
  const hideHeader = useStore(s => s.hideHeader)
  const showHeader = useStore(s => s.showHeader)
  return (
    <QueryClientProvider client={queryClient}>

      {isShowHeader && <MainHeader />}

      <main className='flex flex-col'>
        {isShowHeader ? <button className='absolute top-5 right-5 opacity-30' onClick={hideHeader}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-eye-off-icon lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" /><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" /><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" /><path d="m2 2 20 20" /></svg>
        </button>
          : <button className='absolute top-5 right-5 opacity-30' onClick={showHeader}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>
          </button>}
        <DictionaryBackground />


        <article className=''>
          <DictionaryPage />
        </article>
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
