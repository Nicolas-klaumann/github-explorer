import { create } from 'zustand';

interface GithubStore {
  username: string;
  setUsername: (username: string) => void;
  activeTab: 'repositories' | 'starred';
  setActiveTab: (tab: 'repositories' | 'starred') => void;
}

export const useGithubStore = create<GithubStore>((set) => ({
  username: '',
  setUsername: (username) => set({ username }),
  activeTab: 'repositories',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
