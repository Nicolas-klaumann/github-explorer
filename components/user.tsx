'use client';

import { useState } from 'react';
import { getUser } from '@/lib/api';
import { useGithubStore } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, ChevronUp, Building, Globe, MapPin, Twitter, Calendar } from 'lucide-react';
import { format } from 'date-fns';

/**
 * Componente responsável por exibir os dados do usuário do GitHub
 */
export function User() {
  const { username } = useGithubStore();
  const [showDetails, setShowDetails] = useState(false);

  const { data: user } = useQuery({
    queryKey: [username],
    queryFn: () => getUser(username),
    enabled: !!username,
  });

  return (
    <div className='flex flex-col items-center'>
      {user && (
        <div className="flex flex-col items-center mb-8 p-6 w-auto max-w-md bg-white rounded-lg shadow-md border border-gray-200">
          {/* Foto e Nome */}
          <img
            src={user.avatar_url}
            alt="Foto do usuário"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
          <h2 className="mt-3 text-xl font-bold text-gray-900">{user.name || 'Nome não disponível'}</h2>
          <p className="text-gray-600 text-sm">@{username}</p>

          {/* Biografia */}
          {user.bio && <p className="mt-3 text-center text-gray-700 px-4">{user.bio}</p>}

          {/* Botão de expansão */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 mt-3 text-blue-600 hover:underline"
          >
            {showDetails ? 'Ocultar detalhes' : 'Ver mais detalhes'}
            {showDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {/* Informações adicionais (expansíveis) */}
          {showDetails && (
            <div className="mt-4 w-full text-gray-800 text-sm transition-all duration-300">
              {user.company && (
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-gray-500" />
                  <span>{user.company}</span>
                </div>
              )}

              {user.blog && (
                <div className="flex items-center gap-2 mt-2">
                  <Globe className="w-5 h-5 text-gray-500" />
                  <a href={user.blog} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {user.blog}
                  </a>
                </div>
              )}

              {user.location && (
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span>{user.location}</span>
                </div>
              )}

              {user.twitter_username && (
                <div className="flex items-center gap-2 mt-2">
                  <Twitter className="w-5 h-5 text-gray-500" />
                  <a
                    href={`https://twitter.com/${user.twitter_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    @{user.twitter_username}
                  </a>
                </div>
              )}

              {user.created_at && (
                <div className="flex items-center gap-2 mt-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span>Membro desde {format(new Date(user.created_at), 'dd/MM/yyyy')}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
