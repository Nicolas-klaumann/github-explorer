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
// "use client";

// import { useState } from 'react';
// import { useGithubStore } from '@/lib/store';
// import { Input } from '@/components/ui/input';
// import { Search } from 'lucide-react';

// export function SearchBar() {
//   const [inputValue, setInputValue] = useState('');
//   const setUsername = useGithubStore((state) => state.setUsername);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setUsername(inputValue.trim());
//   };

//   return (
//     <form onSubmit={handleSubmit} className="relative mb-8 w-full max-w-md mx-auto">
//       <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 transition-colors duration-300 group-focus-within:text-primary" />
//       <Input
//         type="text"
//         placeholder="Buscar usuário no GitHub..."
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         className="pl-12 py-3 rounded-full border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary transition-all shadow-sm"
//       />
//     </form>
//   );
// }
