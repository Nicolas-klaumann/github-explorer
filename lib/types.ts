export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface RepositoryDetails extends Repository {
  language: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  commits: any;
  homepage: string | null;
  license: {
    name: string;
  } | null;
}
