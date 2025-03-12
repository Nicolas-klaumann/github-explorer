'use client';

import { useQuery } from '@tanstack/react-query';
import { useGithubStore } from '@/lib/store';
import { getUserRepositories, getUserStarred } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Star, GitFork, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { NoRepositories } from './validations/NoRepositories';
import { Error } from './validations/Error';
import { Loading } from './validations/Loading';

/**
 * Função responsável por listar os repositorios buscados
 * @returns
 */
export function RepositoryList() {
  const { username, activeTab } = useGithubStore();

  // busca os repositorios de acordo com a aba selecionada
  const { data: repositories, isLoading, error } = useQuery({
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

  if (!repositories?.length) {
    return <NoRepositories />;
  }

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {repositories?.map((repo) => (
        // monta o link de acesso para os detalhes do repositorio
        <Link href={`/repository/${repo.full_name}`} key={repo.id}>
          <Card className='p-4 hover:bg-accent transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg'>
            <h3 className='font-semibold mb-2'>{repo.name}</h3>
            <p className='text-sm text-muted-foreground mb-4 line-clamp-2'>
              {repo.description || 'No description available'}
            </p>
            <div className='flex gap-4 text-sm text-muted-foreground'>
              <span className='flex items-center gap-1'>
                <Star className='w-4 h-4' />
                {repo.stargazers_count}
              </span>
              <span className='flex items-center gap-1'>
                <GitFork className='w-4 h-4' />
                {repo.forks_count}
              </span>
              <span className='flex items-center gap-1'>
                <AlertCircle className='w-4 h-4' />
                {repo.open_issues_count}
              </span>
            
              <span className='ml-auto text-sm text-blue-500'>
                {repo.language}
              </span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
