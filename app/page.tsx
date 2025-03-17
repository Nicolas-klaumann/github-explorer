'use client';

import { SearchBar } from '@/components/search-bar';
import { Tabs } from '@/components/tabs';
import { RepositoryList } from '@/components/repository-list';
import { Github, Search } from 'lucide-react';
import { User } from '@/components/user';
import { useGithubStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';

/**
 * Função principal da aplicação (Executada pelo router)
 * @returns 
 */
export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const username = inputValue.trim();
    if (username) {
      router.push(`/repository/${username}`);
    }
  };

  return (
    <main className="min-h-screen bg-background overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">

      {/* Header fixo no topo */}
      <header className="w-full bg-black py-4 fixed top-0 left-0 mb-8 flex items-center shadow-md z-50">
        <Github className="text-white ml-[15%]" size={32} />
        <p className='text-white text-3xl font-bold' >GitHub</p>
      </header>

      {/* Ajuste de padding para não sobrepor o conteúdo */}
      <div className="mt-8 pt-16 container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <form onSubmit={handleSubmit} className="relative mb-8 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Usuário do GitHub"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="pl-10"
            />
        </form>
      </div>
    </main>
  );
}
