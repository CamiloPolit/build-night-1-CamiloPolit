'use client';

import React, { useState, useEffect } from 'react';
import { userProfiles } from '@/data/mockData';
import Link from 'next/link';
import ProfileLink from '@/components/ProfileLink';

// Tipos de pestañas disponibles
type TabType = 'reviews' | 'reactions' | 'karma';

const REACTION_EMOJIS = {
  LIKE: '👍',
  DISLIKE: '👎',
  MOAI: '🗿',
  BRAIN: '🧠',
  FUNNY: '😂'
};

const LeaderboardsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('reviews');
  const [isLoading, setIsLoading] = useState(true);

  // Simular carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Función para cambiar entre pestañas
  const handleTabChange = (tab: TabType) => {
    setIsLoading(true);
    setActiveTab(tab);

    // Simular carga al cambiar de tab
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Organizar usuarios según la pestaña activa
  const getSortedUsers = () => {
    if (activeTab === 'reviews') {
      return [...userProfiles].sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (activeTab === 'reactions') {
      return [...userProfiles].sort((a, b) => b.reactionsReceived - a.reactionsReceived);
    } else {
      return [...userProfiles].sort((a, b) => b.karma - a.karma);
    }
  };

  const sortedUsers = getSortedUsers();

  // Renderizar las reacciones más populares de un usuario
  const renderUserReactions = (user: typeof userProfiles[0]) => {
    if (!user.reactionDetails) return null;

    const reactionItems = Object.entries(user.reactionDetails)
      .map(([type, count]) => ({
        type,
        emoji: REACTION_EMOJIS[type as keyof typeof REACTION_EMOJIS],
        count
      }))
      .filter(item => item.count > 0)
      .sort((a, b) => b.count - a.count);

    const top3Reactions = reactionItems.slice(0, 3);

    return (
      <div className="flex flex-wrap gap-2">
        {top3Reactions.map(reaction => (
          <div
            key={reaction.type}
            className="flex items-center bg-indigo-50 rounded-full px-2 py-1 text-indigo-700 text-xs"
          >
            <span className="mr-1">{reaction.emoji}</span>
            <span className="font-medium">{reaction.count}</span>
          </div>
        ))}
      </div>
    );
  };

  // Obtener color de badge según el nivel de karma
  const getKarmaBadgeColor = (karma: number) => {
    if (karma >= 80) return 'bg-indigo-100 text-indigo-800';
    if (karma >= 60) return 'bg-blue-100 text-blue-800';
    if (karma >= 40) return 'bg-green-100 text-green-800';
    if (karma >= 20) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  // Obtener nivel de karma como texto
  const getKarmaLevel = (karma: number) => {
    if (karma >= 80) return 'Extraordinario';
    if (karma >= 60) return 'Sobresaliente';
    if (karma >= 40) return 'Notable';
    if (karma >= 20) return 'Satisfactorio';
    return 'Iniciando';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Clasificación Global</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre quiénes son los estudiantes más activos en la comunidad y sus contribuciones
          </p>
        </div>

        {/* Navegación por pestañas */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => handleTabChange('reviews')}
              className={`flex-1 py-4 px-6 text-center transition-colors relative ${activeTab === 'reviews'
                ? 'text-blue-600 font-medium'
                : 'text-gray-600 hover:text-gray-800'
                }`}
              aria-selected={activeTab === 'reviews'}
              role="tab"
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">✍️</span>
                <span>Por Reseñas</span>
              </div>
              {activeTab === 'reviews' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>

            <button
              onClick={() => handleTabChange('reactions')}
              className={`flex-1 py-4 px-6 text-center transition-colors relative ${activeTab === 'reactions'
                ? 'text-indigo-600 font-medium'
                : 'text-gray-600 hover:text-gray-800'
                }`}
              aria-selected={activeTab === 'reactions'}
              role="tab"
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">😛</span>
                <span>Por Reacciones</span>
              </div>
              {activeTab === 'reactions' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
              )}
            </button>

            <button
              onClick={() => handleTabChange('karma')}
              className={`flex-1 py-4 px-6 text-center transition-colors relative ${activeTab === 'karma'
                ? 'text-purple-600 font-medium'
                : 'text-gray-600 hover:text-gray-800'
                }`}
              aria-selected={activeTab === 'karma'}
              role="tab"
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">✨</span>
                <span>Por Karma</span>
              </div>
              {activeTab === 'karma' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
              )}
            </button>
          </div>
        </div>

        {/* Estado de carga */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm animate-pulse">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded-full w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedUsers.map((user, index) => (
              <div
                key={user.id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden animate-fadeIn"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Posición y usuario */}
                  <div className="flex items-center flex-1">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full font-bold mr-4 shadow-sm ${index === 0
                        ? 'bg-yellow-100 text-yellow-700 ring-2 ring-yellow-300'
                        : index === 1
                          ? 'bg-gray-100 text-gray-700 ring-1 ring-gray-300'
                          : index === 2
                            ? 'bg-amber-100 text-amber-700 ring-1 ring-amber-300'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                    >
                      {index + 1}
                    </div>
                    <div className="min-w-0">
                      <ProfileLink
                        userId={user.id}
                        userName={user.name}
                        showIcon={true}
                        className="font-medium text-gray-900 text-lg"
                      />
                      <p className="text-sm text-gray-500 truncate">{user.department}</p>
                    </div>
                  </div>

                  {/* Detalles según pestaña */}
                  <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
                    {activeTab === 'reviews' && (
                      <>
                        <div className="flex flex-col items-center justify-center px-4 py-2 bg-blue-50 rounded-lg">
                          <span className="text-sm text-blue-600 font-medium">Reseñas</span>
                          <span className="text-xl font-bold text-blue-700">{user.reviewCount}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          Miembro desde {new Date(user.memberSince).toLocaleDateString('es-ES', { year: 'numeric', month: 'short' })}
                        </span>
                      </>
                    )}

                    {activeTab === 'reactions' && (
                      <>
                        <div className="flex flex-col items-center justify-center px-4 py-2 bg-indigo-50 rounded-lg">
                          <span className="text-sm text-indigo-600 font-medium">Reacciones</span>
                          <span className="text-xl font-bold text-indigo-700">{user.reactionsReceived}</span>
                        </div>
                        {renderUserReactions(user)}
                      </>
                    )}

                    {activeTab === 'karma' && (
                      <>
                        <div className="flex flex-col items-center justify-center px-4 py-2 bg-purple-50 rounded-lg">
                          <span className="text-sm text-purple-600 font-medium">Karma</span>
                          <span className="text-xl font-bold text-purple-700">{user.karma}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${getKarmaBadgeColor(user.karma)}`}>
                          {getKarmaLevel(user.karma)}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Flecha para ver perfil */}
                  <Link
                    href={`/profile/${user.id}`}
                    className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={`Ver perfil de ${user.name}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Botón de volver al inicio */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardsPage; 