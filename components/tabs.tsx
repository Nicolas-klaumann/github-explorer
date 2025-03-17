"use client";

import { useState, useEffect } from "react";
import { Tabs as TabsComponent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGithubStore } from '@/lib/store';
import { Book, Star } from 'lucide-react';
import { cn } from "@/lib/utils"; // Helper para classes condicionais

export function Tabs() {
  const { activeTab, setActiveTab } = useGithubStore();
  
  // Estado para armazenar a largura da tela
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Definir estado inicial e adicionar evento de resize
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <TabsComponent 
      value={activeTab} 
      onValueChange={(value) => setActiveTab(value as 'repositories' | 'starred')} 
      className={cn("mb-8", isMobile && "justify-center w-full")}
    >
      <TabsList className={cn("flex", isMobile && "justify-center")}>
        <TabsTrigger 
          value="repositories" 
          className={cn(
            "flex items-center gap-3 px-6 py-3 text-lg text-gray-600 hover:text-black transition", // ⬅ Aumentado padding e fonte
            activeTab === "repositories" ? "border-b-4 border-red-500 text-black font-semibold" : ""
          )}
        >
          <Book size={18} /> {/* ⬅ Ícone um pouco maior */}
          Repositories
        </TabsTrigger>
        <TabsTrigger 
          value="starred" 
          className={cn(
            "flex items-center gap-3 px-6 py-3 text-lg text-gray-600 hover:text-black transition", // ⬅ Aumentado padding e fonte
            activeTab === "starred" ? "border-b-4 border-red-500 text-black font-semibold" : ""
          )}
        >
          <Star size={18}/>
          Starred
        </TabsTrigger>
      </TabsList>
    </TabsComponent>
  );
}
