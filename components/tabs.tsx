"use client";

import { Tabs as TabsComponent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGithubStore } from '@/lib/store';
import { Book, Star } from 'lucide-react';

/**
 * função responsável por criar as abas de navegação dos repositorios
 * @returns 
 */
export function Tabs() {
  // chama a variavel global de controle das abas
  const { activeTab, setActiveTab } = useGithubStore();

  return (
    <TabsComponent value={activeTab} onValueChange={(value) => setActiveTab(value as 'repositories' | 'starred')} className="mb-8">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="repositories" className='gap-2'><Book size={15} />Respositorios</TabsTrigger>
        <TabsTrigger value="starred" className='gap-2'>
          <Star size={15}/>
          Starred
        </TabsTrigger>
      </TabsList>
    </TabsComponent>
  );
}
