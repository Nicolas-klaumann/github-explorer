"use client";

import { Tabs as TabsComponent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGithubStore } from '@/lib/store';

export function Tabs() {
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
