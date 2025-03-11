import { SearchBar } from '@/components/search-bar';
import { Tabs } from '@/components/tabs';
import { RepositoryList } from '@/components/repository-list';
import { Github } from 'lucide-react';

export default function Home() {
  return (
    <main className='min-h-screen bg-background overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-4xl text-center mb-8 text-gray-900 dark:text-white drop-shadow-lg flex items-center justify-center'>
          GITHUB EXPLORER <Github className='ml-2'/>
        </h1>
        {/* Barra de pesquisa do usuarios */}
        <SearchBar />

        {/* Abas de navegação */}
        <Tabs />

        {/* Listagem de repositorios */}
        <RepositoryList />
      </div>
    </main>
  );
}
