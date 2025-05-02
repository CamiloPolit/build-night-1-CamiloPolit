'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getUserById } from '@/data/mockData';
import { UserProfile, Achievement } from '@/types';
import Link from 'next/link';

const REACTION_EMOJIS = {
  LIKE: '👍',
  DISLIKE: '👎',
  MOAI: '🗿',
  BRAIN: '🧠',
  FUNNY: '😂'
};

const ProfilePage = () => {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      // Fetch user data
      const userId = Array.isArray(params.id) ? params.id[0] : params.id;
      const userData = getUserById(userId);
      setUser(userData);
      setLoading(false);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-gray-200 rounded-lg w-full"></div>
            <div className="h-20 bg-gray-200 rounded-lg w-full"></div>
            <div className="h-40 bg-gray-200 rounded-lg w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Usuario no encontrado</h1>
            <p className="text-gray-600 mb-6">Lo sentimos, no pudimos encontrar el perfil que estás buscando.</p>
            <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate karma level text and color
  const getKarmaLevel = (karma: number) => {
    if (karma >= 80) return { text: 'Extraordinario', color: 'text-indigo-700 bg-indigo-100' };
    if (karma >= 60) return { text: 'Sobresaliente', color: 'text-blue-700 bg-blue-100' };
    if (karma >= 40) return { text: 'Notable', color: 'text-green-700 bg-green-100' };
    if (karma >= 20) return { text: 'Satisfactorio', color: 'text-yellow-700 bg-yellow-100' };
    return { text: 'Iniciando', color: 'text-gray-700 bg-gray-100' };
  };

  const karmaInfo = getKarmaLevel(user.karma);

  const renderReactionChart = () => {
    if (!user.reactionDetails) return null;

    const reactions = Object.entries(user.reactionDetails)
      .map(([type, count]) => ({
        type,
        emoji: REACTION_EMOJIS[type as keyof typeof REACTION_EMOJIS],
        count
      }))
      .sort((a, b) => b.count - a.count);

    const total = reactions.reduce((sum, item) => sum + item.count, 0);

    return (
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Reacciones recibidas</h3>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {reactions.map((reaction) => (
              <div key={reaction.type} className="flex flex-col items-center">
                <div className="text-2xl mb-2">{reaction.emoji}</div>
                <div className="font-medium text-lg">{reaction.count}</div>
                <div className="text-sm text-gray-500">{((reaction.count / total) * 100).toFixed(0)}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAchievements = () => {
    if (!user.achievements || user.achievements.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">Este usuario aún no ha obtenido logros.</p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {user.achievements.map((achievement: Achievement) => (
            <li key={achievement.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="flex-shrink-0 text-2xl mr-4">{achievement.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{achievement.name}</p>
                  <p className="text-sm text-gray-500">{achievement.description}</p>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(achievement.earnedDate).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </button>
        </div>

        {/* Header card with user info */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white">
                <div className="text-sm">Miembro desde</div>
                <div>{new Date(user.memberSince).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long'
                })}</div>
              </div>
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="flex flex-wrap gap-6">
              {/* Karma indicator */}
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center mb-2">
                  <div className="text-xl mr-2">✨</div>
                  <h2 className="text-lg font-semibold text-gray-800">Karma</h2>
                </div>
                <div className="flex items-center">
                  <div className="text-3xl font-bold text-blue-600 mr-4">{user.karma}</div>
                  <span className={`text-sm px-3 py-1 rounded-full ${karmaInfo.color}`}>
                    {karmaInfo.text}
                  </span>
                </div>
                {user.department && (
                  <div className="mt-3 text-sm text-gray-600">
                    Departamento: {user.department}
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center mb-2">
                  <div className="text-xl mr-2">📊</div>
                  <h2 className="text-lg font-semibold text-gray-800">Estadísticas</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-xs text-blue-600 uppercase font-medium">Reseñas</div>
                    <div className="text-2xl font-bold text-blue-800">{user.reviewCount}</div>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-3">
                    <div className="text-xs text-indigo-600 uppercase font-medium">Reacciones</div>
                    <div className="text-2xl font-bold text-indigo-800">{user.reactionsReceived}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio section */}
            {user.bio && (
              <div className="mt-6 text-gray-700 border-t border-gray-100 pt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Bio</h3>
                <p>{user.bio}</p>
              </div>
            )}
          </div>
        </div>

        {/* Reactions section */}
        {renderReactionChart()}

        {/* Achievements section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Logros</h3>
          {renderAchievements()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 