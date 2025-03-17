'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGithubStore } from '@/lib/store';
import { getUserRepositories, getUserStarred } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Star, GitFork, AlertCircle, Search } from 'lucide-react';
import Link from 'next/link';
import { NoRepositories } from './validations/NoRepositories';
import { Error } from './validations/Error';
import { Loading } from './validations/Loading';
import { Input } from '@/components/ui/input';
import Modal from 'react-modal';

export function RepositoryList() {
  const { username, activeTab } = useGithubStore();
  const [filter, setFilter] = useState('');
  const [language, setLanguage] = useState<string[]>(['all']);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: repositories,
    isLoading,
    error,
  } = useQuery({
    queryKey: [activeTab, username],
    queryFn: () =>
      activeTab === 'repositories'
        ? getUserRepositories(username)
        : getUserStarred(username),
    enabled: !!username,
  });

  if (!username) {
    return (
      <div className='text-center text-muted-foreground'>
        Insira um nome de usuário do GitHub para ver seus repositórios
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const filteredRepositories = repositories?.filter(
    (repo) =>
      repo.name.toLowerCase().includes(filter.toLowerCase()) &&
      (language.includes('all') || language.includes(repo.language))
  );

  const toggleLanguage = (lang: string) => {
    setLanguage((prev) => {
      if (prev.includes(lang)) {
        return prev.filter((item) => item !== lang);
      } else {
        return [...prev, lang];
      }
    });
  };

  return (
    <div>
      {/* Filtros */}
      <div className='flex gap-4 mb-8'>
        <div className='relative flex-1'>
          <Search className='absolute  rounded-2xl left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground' />
          <Input
            type='text'
            placeholder='Filtrar por nome'
            className='pl-10 rounded-2xl'
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className='w-[20%] py-2 px-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors duration-300'
        >
          Linguagens
        </button>
      </div>

      {/* Listagem de repositórios */} 
      {!filteredRepositories?.length ? (
        <NoRepositories />
      ) : (
        <div className='grid gap-7 grid-cols-1'>
          {filteredRepositories.map((repo) => (
            <div key={repo.id}>
              <a href={`/repository/${repo.full_name}`} className='hover:underline mb-2 text-xl'>
                {repo.name}
              </a>
              <p className='text-sm text-muted-foreground mb-4 line-clamp-2'>
                {repo.description || 'No description available'}
              </p>
              <div className='flex gap-4 text-sm text-muted-foreground'>
                <span className='flex items-center gap-1'>
                  <Star size={24} color='black' />
                  {repo.stargazers_count}
                </span>
                <span className='flex items-center gap-1'>
                  <GitFork size={24} color='black' />
                  {repo.forks_count}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Seleção de Linguagens */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel='Seleção de Linguagens'
        className='modal' // Aplica a classe modal
        overlayClassName='overlay' // Aplica a classe overlay
      >
        <div className="relative">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-2 right-2 text-xl font-bold text-black text-red-500"
          >
            X
          </button>
          <h2 className='text-xl mb-4 font-bold'>Linguagens</h2>
          <div className='flex flex-col gap-4'>
            {['All', 'JavaScript', 'TypeScript', 'C++', 'Python', 'HTML', 'PHP', 'Vue', 'Java', 'Rust'].map(
              (lang) => (
                <label
                  key={lang}
                  className="flex items-center gap-3 cursor-pointer py-2 px-4 rounded-md"
                >
                  <input
                    type="checkbox"
                    checked={language.includes(lang)}
                    onChange={() => toggleLanguage(lang)}
                    className="form-checkbox border-gray-300 text-primary w-5 h-5"
                  />
                  <span>{lang}</span>
                </label>
              )
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
