'use client';

import { SearchBar } from '@/components/search-bar';
import { Tabs } from '@/components/tabs';
import { RepositoryList } from '@/components/repository-list';
import { Github } from 'lucide-react';
import { User } from '@/components/user';
import { useGithubStore } from '@/lib/store';
import { useEffect, useState } from 'react';

/**
 * Função principal da aplicação (Executada pelo router)
 * @returns 
 */
export default function RepositoryPage({ params }: { params: { username: string } }) {
  const setUsername = useGithubStore((state) => state.setUsername);

  useEffect(() => {
    setUsername(params.username);
  }, [params.username, setUsername]);

  // state para armazenar a largura da tela de forma reativa.
  const [screenWidth, setScreenWidth] = useState<number>(1024);

  useEffect(() => {
    // função para atualizar a largura da tela
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // adiciona o listener para o evento de redimensionamento da tela
    window.addEventListener('resize', handleResize);

    // Chama a função para definir a largura inicial
    setScreenWidth(window.innerWidth);

    // remove o listener quando o componente for desmontado
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);  

  return (
    <main className="min-h-screen bg-background overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">

      <header className="w-full bg-black py-4 fixed top-0 left-0 mb-8 flex items-center shadow-md z-50">
        <a href='/' className='flex ml-[15%]'>
            <Github className="text-white" size={32} />
            <p className='text-white text-3xl font-bold' >GitHub</p>
        </a>
        <p className='text-white text-xl ml-5'>/</p>
        <p className='text-white ml-5'>{params.username}</p>
      </header>

      {/* Ajuste de padding para não sobrepor o conteúdo */}
      <div className="mt-8 pt-16 container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        
        {params.username && (screenWidth >= 1024) && (
          <aside className="w-full lg:w-1/5 flex justify-center lg:justify-start">
            <User />
          </aside>
        )}        

        <section className="flex-1 flex flex-col">
          {/* Barra de pesquisa */}
          {params.username && (window.innerWidth < 1024) && (
            <User />
          )}   

          {/* Tabs de navegação */}
          <Tabs />

          {/* Lista de repositórios */}
          <RepositoryList />
        </section>
        
      </div>
    </main>
  );
}
