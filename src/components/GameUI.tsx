import React from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sun, Moon } from 'lucide-react';
import { GameState, Difficulty } from '../types/game';
import { formatScore } from '../utils/gameUtils';

interface GameUIProps {
  gameState: GameState;
  difficulty: Difficulty;
  audioEnabled: boolean;
  theme: 'light' | 'dark';
  onStartGame: () => void;
  onPauseGame: () => void;
  onResetGame: () => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onAudioToggle: () => void;
  onThemeToggle: () => void;
}

export const GameUI: React.FC<GameUIProps> = ({
  gameState,
  difficulty,
  audioEnabled,
  theme,
  onStartGame,
  onPauseGame,
  onResetGame,
  onDifficultyChange,
  onAudioToggle,
  onThemeToggle
}) => {
  const { score, level, gameOver, paused, gameStarted } = gameState;
  
  const buttonClass = `
    px-4 py-2 rounded-lg font-medium transition-all duration-200 
    flex items-center gap-2 hover:scale-105 active:scale-95
    ${theme === 'dark' 
      ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-600' 
      : 'bg-white text-gray-800 hover:bg-gray-50 border border-gray-200'
    }
  `;
  
  const primaryButtonClass = `
    px-6 py-3 rounded-lg font-semibold transition-all duration-200 
    flex items-center gap-2 hover:scale-105 active:scale-95
    ${theme === 'dark' 
      ? 'bg-green-600 text-white hover:bg-green-700' 
      : 'bg-green-500 text-white hover:bg-green-600'
    }
  `;
  
  return (
    <div className="space-y-6">
      {/* Game Stats */}
      <div className={`
        grid grid-cols-2 gap-4 p-4 rounded-xl backdrop-blur-sm border
        ${theme === 'dark' 
          ? 'bg-gray-900/40 border-gray-700/50' 
          : 'bg-white/40 border-gray-300/50'
        }
      `}>
        <div className="text-center">
          <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
            {formatScore(score)}
          </div>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Score
          </div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
            {level}
          </div>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Level
          </div>
        </div>
      </div>
      
      {/* Game Controls */}
      <div className="flex flex-wrap gap-3 justify-center">
        {!gameStarted ? (
          <button onClick={onStartGame} className={primaryButtonClass}>
            <Play size={18} />
            Start Game
          </button>
        ) : (
          <>
            <button onClick={onPauseGame} className={buttonClass}>
              {paused ? <Play size={18} /> : <Pause size={18} />}
              {paused ? 'Resume' : 'Pause'}
            </button>
            <button onClick={onResetGame} className={buttonClass}>
              <RotateCcw size={18} />
              Reset
            </button>
          </>
        )}
      </div>
      
      {/* Settings */}
      <div className={`
        p-4 rounded-xl backdrop-blur-sm border space-y-4
        ${theme === 'dark' 
          ? 'bg-gray-900/40 border-gray-700/50' 
          : 'bg-white/40 border-gray-300/50'
        }
      `}>
        <div className="flex items-center justify-between">
          <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            Difficulty
          </span>
          <select
            value={difficulty}
            onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
            className={`
              px-3 py-1 rounded-lg border text-sm
              ${theme === 'dark' 
                ? 'bg-gray-800 text-gray-200 border-gray-600' 
                : 'bg-white text-gray-800 border-gray-300'
              }
            `}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            Audio
          </span>
          <button onClick={onAudioToggle} className={buttonClass}>
            {audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            Theme
          </span>
          <button onClick={onThemeToggle} className={buttonClass}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
      
      {gameOver && (
        <div className={`
          p-4 rounded-xl backdrop-blur-sm border text-center space-y-3
          ${theme === 'dark' 
            ? 'bg-red-900/40 border-red-700/50' 
            : 'bg-red-50/80 border-red-200/50'
          }
        `}>
          <div className={`text-xl font-bold ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
            Game Over!
          </div>
          <div className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Thank you for playing!
          </div>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Developed by <strong>Neetesh Sharma</strong>
          </div>
        </div>
      )}
    </div>
  );
};