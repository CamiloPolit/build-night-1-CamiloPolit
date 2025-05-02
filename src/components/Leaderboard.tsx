import React, { useEffect, useState } from 'react';
import { reviews } from '@/data/mockData';

type ReactionCounts = {
  LIKE: number;    // 👍
  DISLIKE: number; // 👎
  MOAI: number;    // 🗿
  BRAIN: number;   // 🧠
  FUNNY: number;   // 😂
};

type UserStats = {
  email: string;
  name: string;
  reviewCount: number;
  reactionsReceived?: number;
  reactionDetails?: ReactionCounts;
};

type TabType = 'reviews' | 'reactions';

// Mock reaction data for consistent display
const MOCK_REACTION_DATA: Record<string, ReactionCounts> = {
  'miguel@usach.cl': {
    LIKE: 23,
    DISLIKE: 5,
    MOAI: 12,
    BRAIN: 18,
    FUNNY: 28
  },
  'laura@usach.cl': {
    LIKE: 15,
    DISLIKE: 2,
    MOAI: 25,
    BRAIN: 10,
    FUNNY: 19
  },
  'javier@usach.cl': {
    LIKE: 10,
    DISLIKE: 8,
    MOAI: 5,
    BRAIN: 30,
    FUNNY: 12
  },
  'carolina@usach.cl': {
    LIKE: 19,
    DISLIKE: 3,
    MOAI: 9,
    BRAIN: 15,
    FUNNY: 22
  },
  'pedro@usach.cl': {
    LIKE: 20,
    DISLIKE: 4,
    MOAI: 18,
    BRAIN: 7,
    FUNNY: 15
  }
};

const REACTION_EMOJIS = {
  LIKE: '👍',
  DISLIKE: '👎',
  MOAI: '🗿',
  BRAIN: '🧠',
  FUNNY: '😂'
};

const Leaderboard: React.FC = () => {
  const [topReviewers, setTopReviewers] = useState<UserStats[]>([]);
  const [topReacted, setTopReacted] = useState<UserStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('reviews');

  const toggleLeaderboard = () => {
    setIsOpen(!isOpen);
    // Add class to body for content shifting when sidebar opens
    if (!isOpen) {
      document.body.classList.add('leaderboard-open');
    } else {
      document.body.classList.remove('leaderboard-open');
    }
  };

  const closeLeaderboard = () => {
    setIsOpen(false);
    document.body.classList.remove('leaderboard-open');
  };

  useEffect(() => {
    // Simulate loading for a better UX
    const timer = setTimeout(() => {
      // Group reviews by email and count them
      const userReviewCounts = reviews.reduce<Record<string, UserStats>>((acc, review) => {
        const { email, studentName } = review;

        if (!acc[email]) {
          // Get predefined reaction data or generate fallback
          const reactionDetails = MOCK_REACTION_DATA[email] || {
            LIKE: Math.floor(Math.random() * 25),
            DISLIKE: Math.floor(Math.random() * 10),
            MOAI: Math.floor(Math.random() * 15),
            BRAIN: Math.floor(Math.random() * 20),
            FUNNY: Math.floor(Math.random() * 30),
          };

          const totalReactions = Object.values(reactionDetails).reduce((sum, count) => sum + count, 0);

          acc[email] = {
            email,
            name: studentName || 'Usuario anónimo',
            reviewCount: 0,
            reactionsReceived: totalReactions,
            reactionDetails
          };
        }

        acc[email].reviewCount += 1;
        return acc;
      }, {});

      // Convert to array
      const usersArray = Object.values(userReviewCounts);

      // Top reviewers sorted by number of reviews
      const sortedByReviews = [...usersArray]
        .sort((a, b) => b.reviewCount - a.reviewCount)
        .slice(0, 3); // Top 3 users

      // Top reacted users sorted by reactions received
      const sortedByReactions = [...usersArray]
        .sort((a, b) => (b.reactionsReceived || 0) - (a.reactionsReceived || 0))
        .slice(0, 3); // Top 3 users

      setTopReviewers(sortedByReviews);
      setTopReacted(sortedByReactions);
      setIsLoading(false);
    }, 600);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      document.body.classList.remove('leaderboard-open');
    };
  }, []);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const renderUserItem = (user: UserStats, index: number, showReviews: boolean) => (
    <div
      key={user.email + (showReviews ? 'review' : 'reaction')}
      className="flex items-center justify-between p-4 rounded-lg hover:bg-blue-50 transition-colors animate-fadeIn"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center">
        <div className={`w-9 h-9 flex items-center justify-center rounded-full 
          ${index === 0 ? 'bg-yellow-100 text-yellow-600 ring-2 ring-yellow-300' :
            index === 1 ? 'bg-gray-100 text-gray-600 ring-1 ring-gray-300' :
              index === 2 ? 'bg-amber-100 text-amber-700 ring-1 ring-amber-300' :
                'bg-blue-50 text-blue-600'} 
          font-bold mr-4 shadow-sm`}>
          {index + 1}
        </div>
        <div>
          <span className="font-medium text-gray-700 truncate max-w-[150px] block">{user.name}</span>
          <span className="text-xs text-gray-500">Usuario activo</span>
        </div>
      </div>
      <div className="flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-3 py-2 rounded-full">
        {showReviews ?
          `${user.reviewCount} reseña${user.reviewCount !== 1 ? 's' : ''}` :
          `${user.reactionsReceived} reacción${user.reactionsReceived !== 1 ? 'es' : ''}`
        }
      </div>
    </div>
  );

  const renderTop3Reactions = (user: UserStats) => {
    if (!user.reactionDetails) return null;

    // Convert reaction details to array and sort by count
    const reactionItems = Object.entries(user.reactionDetails)
      .map(([type, count]) => ({
        type,
        emoji: REACTION_EMOJIS[type as keyof typeof REACTION_EMOJIS],
        count
      }))
      .filter(item => item.count > 0)
      .sort((a, b) => b.count - a.count);

    const top3Reactions = reactionItems.slice(0, 3);
    const hasMoreReactions = reactionItems.length > 3;
    const totalTypes = reactionItems.length;
    const totalCount = user.reactionsReceived || 0;

    return (
      <div className="p-4 bg-white">
        {/* Top 3 reaction badges */}
        <div className="flex flex-wrap gap-3 mb-3">
          {top3Reactions.map(reaction => (
            <div
              key={reaction.type}
              className="flex items-center bg-indigo-50 rounded-full px-3 py-1.5 text-indigo-700"
            >
              <span className="text-base mr-2">{reaction.emoji}</span>
              <span className="font-medium">{reaction.count}</span>
            </div>
          ))}
        </div>

        {/* More reactions indicator + total */}
        <div className="flex justify-between items-center text-sm">
          {hasMoreReactions ? (
            <span className="text-gray-500 text-xs">
              +{totalTypes - 3} tipos más
            </span>
          ) : (
            <span></span>
          )}
          <div className="font-medium text-indigo-800">
            Total: {totalCount}
          </div>
        </div>
      </div>
    );
  };

  const renderReviewsContent = () => (
    <>
      {isLoading ? (
        <div className="space-y-4 py-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-lg animate-pulse">
              <div className="flex items-center">
                <div className="w-9 h-9 bg-gray-200 rounded-full mr-4"></div>
                <div className="h-4 bg-gray-200 rounded w-28"></div>
              </div>
              <div className="h-5 bg-gray-200 rounded-full w-20"></div>
            </div>
          ))}
        </div>
      ) : topReviewers.length > 0 ? (
        <div className="space-y-4">
          {topReviewers.map((user, index) => renderUserItem(user, index, true))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <p>No hay datos disponibles</p>
        </div>
      )}

      <div className="mt-5 text-center">
        <a
          href="#"
          className="text-sm text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
          aria-label="Ver ranking completo de reseñas"
          tabIndex={0}
        >
          Ver ranking completo
          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </>
  );

  const renderReactionsContent = () => (
    <>
      {isLoading ? (
        <div className="space-y-4 py-3">
          {[...Array(3)].map((_, i) => (
            <div key={i + 'reaction'} className="flex items-center justify-between p-4 rounded-lg animate-pulse">
              <div className="flex items-center">
                <div className="w-9 h-9 bg-gray-200 rounded-full mr-4"></div>
                <div className="h-4 bg-gray-200 rounded w-28"></div>
              </div>
              <div className="h-5 bg-gray-200 rounded-full w-20"></div>
            </div>
          ))}
        </div>
      ) : topReacted.length > 0 ? (
        <div className="space-y-6">
          {topReacted.map((user, index) => (
            <div
              key={user.email + 'reaction'}
              className="rounded-xl border border-indigo-100 overflow-hidden shadow-sm animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-white">
                <div className="flex items-center">
                  <div className={`w-9 h-9 flex items-center justify-center rounded-full 
                    ${index === 0 ? 'bg-yellow-100 text-yellow-600 ring-2 ring-yellow-300' :
                      index === 1 ? 'bg-gray-100 text-gray-600 ring-1 ring-gray-300' :
                        index === 2 ? 'bg-amber-100 text-amber-700 ring-1 ring-amber-300' :
                          'bg-blue-50 text-blue-600'} 
                    font-bold mr-4 shadow-sm`}>
                    {index + 1}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 truncate max-w-[200px] block">{user.name}</span>
                  </div>
                </div>
              </div>
              {renderTop3Reactions(user)}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <p>No hay datos disponibles</p>
        </div>
      )}

      <div className="mt-6 text-center">
        <a
          href="#"
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center"
          aria-label="Ver ranking completo de reacciones"
          tabIndex={0}
        >
          Ver ranking completo
          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </>
  );

  return (
    <>
      {/* Floating trophy button - only shown when leaderboard is closed */}
      {!isOpen && (
        <button
          onClick={toggleLeaderboard}
          className="fixed right-6 bottom-6 z-50 w-14 h-14 rounded-full trophy-btn flex items-center justify-center
            animate-subtle-bounce
            bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          aria-label="Toggle leaderboard"
          tabIndex={0}
        >
          <span className="text-2xl text-white">🏆</span>
        </button>
      )}

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[100] lg:hidden"
          onClick={closeLeaderboard}
          aria-hidden="true"
        />
      )}

      {/* Leaderboard Panel */}
      <div className={`fixed inset-y-0 right-0 h-screen bg-white z-[101] shadow-2xl overflow-y-auto transition-transform duration-300 ease-in-out transform w-[350px] rounded-l-lg ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header with close button */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex items-center justify-between rounded-tl-lg">
          <div className="flex items-center">
            <span className="text-2xl mr-3" aria-hidden="true">🏆</span>
            <h2 className="text-xl font-bold">Leaderboard</h2>
          </div>
          <button
            onClick={closeLeaderboard}
            className="text-white hover:text-white/80 transition-colors bg-white/20 hover:bg-white/30 rounded-full p-2"
            aria-label="Cerrar leaderboard"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50">
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
              <span>Reseñas</span>
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
              <span>Reacciones</span>
            </div>
            {activeTab === 'reactions' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'reviews' ? (
            <div className="animate-fadeIn">
              <h3 className="text-lg font-semibold text-blue-800 mb-5 text-center">
                Más reseñas enviadas
              </h3>
              {renderReviewsContent()}
            </div>
          ) : (
            <div className="animate-fadeIn">
              <h3 className="text-lg font-semibold text-indigo-800 mb-5 text-center">
                Más reacciones recibidas
              </h3>
              {renderReactionsContent()}
            </div>
          )}
        </div>

        <div className="p-6 text-center border-t border-gray-100">
          <button
            onClick={closeLeaderboard}
            className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </>
  );
};

export default Leaderboard; 