import { Repository, RepositoryDetails } from './types';

const BASE_URL = 'https://api.github.com';

/**
 * Busca todos os repositorios do usuario
 * @param username
 */
export async function getUserRepositories(
  username: string
): Promise<Repository[]> {
  const response = await fetch(
    `${BASE_URL}/users/${username}/repos?sort=updated`
  );
  if (!response.ok) throw new Error('Failed to fetch repositories');
  return response.json();
}

/**
 * Busca os repositorios favoritados do usuario
 * @param username
 */
export async function getUserStarred(username: string): Promise<Repository[]> {
  const response = await fetch(`${BASE_URL}/users/${username}/starred`);
  if (!response.ok) throw new Error('Failed to fetch starred repositories');
  return response.json();
}

/**
 * Busca os detalhes do repositorio
 * @param owner
 * @param repo
 */
export async function getRepositoryDetails(
  owner: string,
  repo: string
): Promise<RepositoryDetails> {
  // busca o repositorio
  const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}`);
  if (!response.ok) throw new Error('Failed to fetch repository details');
  const repository = await response.json();

  // busca os commits do repositorio
  const responseCommits = await fetch(
    `${BASE_URL}/repos/${owner}/${repo}/commits`
  );
  if (!responseCommits.ok) {
    throw new Error('Failed to fetch repository commits');
  }

  const commits = await responseCommits.json();

  return { ...repository, commits: commits };
}

/**
 * Busca o perfil do usuario
 * @param username
 */
export async function getUser(username: string) {
  const response = await fetch(`${BASE_URL}/users/${username}`);
  if (!response.ok) throw new Error('Usuário não encontrado');
  return response.json();
}
