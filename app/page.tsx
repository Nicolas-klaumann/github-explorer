import { SearchBar } from '@/components/search-bar';
import { Tabs } from '@/components/tabs';
import { RepositoryList } from '@/components/repository-list';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">GitHub Explorer</h1>
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
