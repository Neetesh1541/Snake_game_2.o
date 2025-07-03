import React from 'react';
import { Trophy, Calendar, Target } from 'lucide-react';
import { getLeaderboard } from '../utils/gameUtils';

interface LeaderboardProps {
  theme: 'light' | 'dark';
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ theme }) => {
  const leaderboard = getLeaderboard();
  
  if (leaderboard.length === 0) {
    return (
      <div className={`
        p-6 rounded-xl backdrop-blur-sm border text-center
        ${theme === 'dark' 
          ? 'bg-gray-900/40 border-gray-700/50 text-gray-400' 
          : 'bg-white/40 border-gray-300/50 text-gray-600'
        }
      `}>
        <Trophy size={48} className="mx-auto mb-2 opacity-50" />
        <div>No scores yet. Start playing to set a record!</div>
      </div>
    );
  }
  
  return (
    <div className={`
      p-6 rounded-xl backdrop-blur-sm border
      ${theme === 'dark' 
        ? 'bg-gray-900/40 border-gray-700/50' 
        : 'bg-white/40 border-gray-300/50'
      }
    `}>
      <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
        <Trophy size={20} className="text-yellow-500" />
        Leaderboard
      </h3>
      
      <div className="space-y-2">
        {leaderboard.map((entry, index) => (
          <div 
            key={index}
            className={`
              p-3 rounded-lg flex items-center justify-between
              ${theme === 'dark' 
                ? 'bg-gray-800/50 text-gray-300' 
                : 'bg-gray-100/50 text-gray-700'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                ${index === 0 ? 'bg-yellow-500 text-white' : 
                  index === 1 ? 'bg-gray-400 text-white' : 
                  index === 2 ? 'bg-orange-500 text-white' : 
                  theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                }
              `}>
                {index + 1}
              </div>
              <div>
                <div className="font-medium">{entry.score} pts</div>
                <div className="text-xs opacity-80 flex items-center gap-1">
                  <Target size={10} />
                  Level {entry.level} • {entry.difficulty}
                </div>
              </div>
            </div>
            <div className="text-xs opacity-60 flex items-center gap-1">
              <Calendar size={10} />
              {new Date(entry.date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};