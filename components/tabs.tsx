"use client";

import { Tabs as TabsComponent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGithubStore } from '@/lib/store';

/**
 * função responsável por criar as abas de navegação dos repositorios
 * @returns 
 */
export function Tabs() {
  // chama a variavel global de controle das abas
  const { activeTab, setActiveTab } = useGithubStore();

  return (
    <TabsComponent value={activeTab} onValueChange={setActiveTab} className="mb-8">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="repositories">Respositorios</TabsTrigger>
        <TabsTrigger value="starred">Starred</TabsTrigger>
      </TabsList>
    </TabsComponent>
  );
}
