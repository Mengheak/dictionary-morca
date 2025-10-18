import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import DictionaryPage from './features/dictionary/components/DictionaryPage';
// optional
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import DictionaryBackground from './components/DictionaryBackground';
import MainHeader from './components/MainHeader';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainHeader />
      <main>
        <DictionaryBackground />
        <article className='sm:p-2 md:p-5'>
          <DictionaryPage />
        </article>
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
