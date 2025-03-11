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
  const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}`);
  if (!response.ok) throw new Error('Failed to fetch repository details');
  return response.json();
}
