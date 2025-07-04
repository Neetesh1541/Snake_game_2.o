import React from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Palette } from 'lucide-react';
import { GameState, Difficulty } from '../types/game';
import { formatScore } from '../utils/gameUtils';

export type Theme = 'dark' | 'light' | 'neon' | 'ocean' | 'sunset' | 'forest';

interface GameUIProps {
  gameState: GameState;
  difficulty: Difficulty;
  audioEnabled: boolean;
  theme: Theme;
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
  
  const getThemeStyles = (currentTheme: Theme) => {
    const isDark = ['dark', 'neon', 'ocean', 'forest'].includes(currentTheme);
    
    return {
      isDark,
      buttonClass: `
        px-4 py-2 rounded-lg font-medium transition-all duration-200 
        flex items-center gap-2 hover:scale-105 active:scale-95
        ${isDark
          ? 'bg-gray-800/50 text-gray-200 hover:bg-gray-700/50 border border-gray-600/50 backdrop-blur-sm' 
          : 'bg-white/50 text-gray-800 hover:bg-white/70 border border-gray-200/50 backdrop-blur-sm'
        }
      `,
      primaryButtonClass: `
        px-6 py-3 rounded-lg font-semibold transition-all duration-200 
        flex items-center gap-2 hover:scale-105 active:scale-95
        bg-green-600 text-white hover:bg-green-700 shadow-lg
      `,
      cardClass: `
        p-4 rounded-xl backdrop-blur-sm border
        ${isDark
          ? 'bg-gray-900/40 border-gray-700/50' 
          : 'bg-white/40 border-gray-300/50'
        }
      `,
      textPrimary: isDark ? 'text-gray-200' : 'text-gray-800',
      textSecondary: isDark ? 'text-gray-400' : 'text-gray-600',
      scoreColor: currentTheme === 'neon' ? 'text-lime-400' : 
                  currentTheme === 'ocean' ? 'text-cyan-400' :
                  currentTheme === 'sunset' ? 'text-yellow-400' :
                  currentTheme === 'forest' ? 'text-lime-400' :
                  isDark ? 'text-green-400' : 'text-green-600',
      levelColor: currentTheme === 'neon' ? 'text-pink-400' :
                  currentTheme === 'ocean' ? 'text-blue-400' :
                  currentTheme === 'sunset' ? 'text-orange-400' :
                  currentTheme === 'forest' ? 'text-emerald-400' :
                  isDark ? 'text-blue-400' : 'text-blue-600'
    };
  };
  
  const styles = getThemeStyles(theme);
  
  const getThemeName = (currentTheme: Theme) => {
    switch (currentTheme) {
      case 'dark': return 'Dark';
      case 'light': return 'Light';
      case 'neon': return 'Neon';
      case 'ocean': return 'Ocean';
      case 'sunset': return 'Sunset';
      case 'forest': return 'Forest';
      default: return 'Dark';
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Game Stats */}
      <div className={`grid grid-cols-2 gap-4 ${styles.cardClass}`}>
        <div className="text-center">
          <div className={`text-2xl font-bold ${styles.scoreColor}`}>
            {formatScore(score)}
          </div>
          <div className={`text-sm ${styles.textSecondary}`}>
            Score
          </div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${styles.levelColor}`}>
            {level}
          </div>
          <div className={`text-sm ${styles.textSecondary}`}>
            Level
          </div>
        </div>
      </div>
      
      {/* Game Controls */}
      <div className="flex flex-wrap gap-3 justify-center">
        {!gameStarted ? (
          <button onClick={onStartGame} className={styles.primaryButtonClass}>
            <Play size={18} />
            Start Game
          </button>
        ) : (
          <>
            <button onClick={onPauseGame} className={styles.buttonClass}>
              {paused ? <Play size={18} /> : <Pause size={18} />}
              {paused ? 'Resume' : 'Pause'}
            </button>
            <button onClick={onResetGame} className={styles.buttonClass}>
              <RotateCcw size={18} />
              Reset
            </button>
          </>
        )}
      </div>
      
      {/* Settings */}
      <div className={`${styles.cardClass} space-y-4`}>
        <div className="flex items-center justify-between">
          <span className={`font-medium ${styles.textPrimary}`}>
            Difficulty
          </span>
          <select
            value={difficulty}
            onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
            className={`
              px-3 py-1 rounded-lg border text-sm backdrop-blur-sm
              ${styles.isDark
                ? 'bg-gray-800/50 text-gray-200 border-gray-600/50' 
                : 'bg-white/50 text-gray-800 border-gray-300/50'
              }
            `}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`font-medium ${styles.textPrimary}`}>
            Audio
          </span>
          <button onClick={onAudioToggle} className={styles.buttonClass}>
            {audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`font-medium ${styles.textPrimary}`}>
            Theme: {getThemeName(theme)}
          </span>
          <button onClick={onThemeToggle} className={styles.buttonClass}>
            <Palette size={18} />
          </button>
        </div>
      </div>
      
      {gameOver && (
        <div className={`
          p-4 rounded-xl backdrop-blur-sm border text-center space-y-3
          ${styles.isDark
            ? 'bg-red-900/40 border-red-700/50' 
            : 'bg-red-50/80 border-red-200/50'
          }
        `}>
          <div className={`text-xl font-bold ${styles.isDark ? 'text-red-400' : 'text-red-600'}`}>
            Game Over!
          </div>
          <div className={`text-lg ${styles.isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Thank you for playing!
          </div>
          <div className={`text-sm ${styles.textSecondary}`}>
            Developed by <strong>Neetesh Sharma</strong>
          </div>
        </div>
      )}
    </div>
  );
};