"use client";

import { useState } from 'react';
import { useGithubStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const setUsername = useGithubStore((state) => state.setUsername);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUsername(inputValue.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-8">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Usuário do GitHub"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="pl-10"
      />
    </form>
  );
}
