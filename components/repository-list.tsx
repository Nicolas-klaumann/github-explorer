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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function RepositoryList() {
  const { username, activeTab } = useGithubStore();
  const [filter, setFilter] = useState('');
  const [language, setLanguage] = useState('all');

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

  const filteredRepositories = repositories?.filter(repo =>
    repo.name.toLowerCase().includes(filter.toLowerCase()) &&
    (language === 'all' || repo.language === language)
  );

  return (
    <div>
      {/* Filtros */}
      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Filtrar por nome"
            className="pl-10"
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <Select onValueChange={(value) => setLanguage(value)}>
          <SelectTrigger className='w-[20%]'>
            <SelectValue placeholder="Linguagem"/>
          </SelectTrigger>
          <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="JavaScript">JavaScript</SelectItem>
              <SelectItem value="TypeScript">TypeScript</SelectItem>
              <SelectItem value="C++">C++</SelectItem>
              <SelectItem value="Python">Python</SelectItem>
              <SelectItem value="HTML">HTML</SelectItem>
              <SelectItem value="PHP">PHP</SelectItem>
              <SelectItem value="Vue">Vue</SelectItem>
              <SelectItem value="Java">Java</SelectItem>
              <SelectItem value="Rust">Rust</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Listagem de repositórios */}
      {!filteredRepositories?.length ? (
        <NoRepositories />
      ) : (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {filteredRepositories.map((repo) => (
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
      )}
    </div>
  );
}
