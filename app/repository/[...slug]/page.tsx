'use client';

import { useQuery } from '@tanstack/react-query';
import { getRepositoryDetails } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Star,
  GitFork,
  AlertCircle,
  Globe,
  Clock,
  Book,
  ArrowLeft,
  Github,
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

/**
 * Função responsavel por renderizar a pagina de detalhes do repositorio
 * @param param
 * @returns 
 */
export default function RepositoryPage({
  params,
}: {
  params: { slug: string[] };
}) {
  // busca os parametros da rota
  const [owner, repo] = params.slug;

  // busca os detalhes do repositorio
  const { data: repository, isLoading, error } = useQuery({
    queryKey: ['repository', owner, repo],
    queryFn: () => getRepositoryDetails(owner, repo),
  });

  if (isLoading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='animate-pulse'>
          <div className='h-8 bg-muted rounded w-1/3 mb-4'></div>
          <div className='h-4 bg-muted rounded w-2/3 mb-2'></div>
          <div className='h-4 bg-muted rounded w-1/2 mb-4'></div>
          <div className='grid grid-cols-3 gap-4'>
            <div className='h-20 bg-muted rounded'></div>
            <div className='h-20 bg-muted rounded'></div>
            <div className='h-20 bg-muted rounded'></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <Card className='p-6 text-center text-destructive'>
          <AlertCircle className='mx-auto h-12 w-12 mb-4' />
          <h2 className='text-xl font-semibold mb-2'>
            Erro ao carregar repositório
          </h2>
          <p>Falha ao carregar os detalhes do repositório. Tente novamente mais tarde.</p>
          <Link href='/'>
            <Button variant='outline' className='mt-4'>
              <ArrowLeft className='mr-2 h-4 w-4' /> Voltar para a pesquisa
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (!repository) return null;

  return (
    <div className='container mx-auto px-4 py-8'>
      <header className="w-full bg-black py-4 fixed top-0 left-0 mb-8 flex items-center shadow-md z-50">
        <a href='/' className='flex ml-[15%]'>
            <Github className="text-white" size={32} />
            <p className='text-white text-3xl font-bold' >GitHub</p>
        </a>
        <p className='text-white text-xl ml-5'>/</p>
        <a href={`/repository/${owner}`} className='text-white ml-5'>{owner}</a>
        <p className='text-white text-xl ml-5'>/</p>
        <p className='text-white ml-5'>{repo}</p>
      </header>

      <div className='grid gap-6 md:grid-cols-3 mt-[5%]'>
        <Card className='md:col-span-2 p-6 shadow-md'>
          <div className='flex items-start justify-between mb-4'>
            <div>
              <h1 className='text-3xl font-bold mb-2'>{repository.name}</h1>
              <p className='text-muted-foreground'>{repository.description}</p>
            </div>
            <a
              href={repository.html_url}
              target='_blank'
              rel='noopener noreferrer'
              className='shrink-0'
            >
              <Button>Visualizar no GitHub</Button>
            </a>
          </div>

          <div className='flex flex-wrap gap-2 mb-6'>
            {repository.topics.map((topic) => (
              <Badge key={topic} variant='secondary'>
                {topic}
              </Badge>
            ))}
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            <Card className='p-4'>
              <div className='flex items-center gap-2'>
                <Star className='h-5 w-5 text-yellow-500' />
                <div>
                  <div className='text-sm font-medium'>Stars</div>
                  <div className='text-2xl font-bold'>
                    {repository.stargazers_count}
                  </div>
                </div>
              </div>
            </Card>

            <Card className='p-4'>
              <div className='flex items-center gap-2'>
                <GitFork className='h-5 w-5 text-blue-500' />
                <div>
                  <div className='text-sm font-medium'>Forks</div>
                  <div className='text-2xl font-bold'>
                    {repository.forks_count}
                  </div>
                </div>
              </div>
            </Card>

            <Card className='p-4'>
              <div className='flex items-center gap-2'>
                <AlertCircle className='h-5 w-5 text-red-500' />
                <div>
                  <div className='text-sm font-medium'>Issues</div>
                  <div className='text-2xl font-bold'>
                    {repository.open_issues_count}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Card>

        <Card className='p-6 shadow-md'>
          <h2 className='text-xl font-semibold mb-4'>Detalhes</h2>

          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <Globe className='h-5 w-5 text-muted-foreground' />
              <div>
                <div className='text-sm text-muted-foreground'>Linguagem</div>
                <div className='font-medium'>
                  {repository.language || 'Not specified'}
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Clock className='h-5 w-5 text-muted-foreground' />
              <div>
                <div className='text-sm text-muted-foreground'>
                  Última Atualização
                </div>
                <div className='font-medium'>
                  {format(new Date(repository.updated_at), 'MMM d, yyyy')}
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Book className='h-5 w-5 text-muted-foreground' />
              <div>
                <div className='text-sm text-muted-foreground'>Licença</div>
                <div className='font-medium'>
                  {repository.license?.name || 'Not specified'}
                </div>
              </div>
            </div>

            {repository.homepage && (
              <div>
                <a
                  href={repository.homepage}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary hover:underline'
                >
                  Visite a Página
                </a>
              </div>
            )}
          </div>
        </Card>
      </div>

      <Card className='shadow-md mt-4 md:col-span-2 p-6'>
        <h1 className='text-3xl font-bold mb-2'>Commits do Repositório</h1>
        {repository?.commits.map((objCommit: any) => (
          <Card className='mb-4 p-4 shadow-md' key={objCommit.sha}>
            <div className='mb-4 flex items-center gap-3'>
              <img
                src={objCommit.author.avatar_url}
                alt='Avatar do autor'
                className='w-10 h-10 rounded-full'
              />
              <h3 className='text-2xl font-bold'>{objCommit.author.login}</h3>
            </div>
            <a
              href={objCommit.html_url}
              target='_blank'
              className='font-semibold mt-2  hover:underline'
            >
              {objCommit.commit.message}
            </a>
            <p>{format(new Date(objCommit.commit.author.date), 'MMM d, yyyy')}</p>
          </Card>
        ))}
      </Card>
    </div>
  );
}
