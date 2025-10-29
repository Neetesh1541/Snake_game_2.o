import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { Direction } from '../types/game';

export type Theme = 'dark' | 'light' | 'neon' | 'ocean' | 'sunset' | 'forest';

interface MobileControlsProps {
  theme: Theme;
  onDirectionChange: (direction: Direction) => void;
  gameStarted: boolean;
  gameOver: boolean;
}

export const MobileControls: React.FC<MobileControlsProps> = ({
  theme,
  onDirectionChange,
  gameStarted,
  gameOver
}) => {
  const getThemeStyles = (currentTheme: Theme) => {
    const isDark = ['dark', 'neon', 'ocean', 'forest'].includes(currentTheme);
    
    return {
      isDark,
      buttonClass: `
        w-16 h-16 rounded-xl font-medium transition-all duration-200 
        flex items-center justify-center hover:scale-105 active:scale-95
        ${isDark
          ? 'bg-gray-800/70 text-gray-200 hover:bg-gray-700/70 border border-gray-600/50 backdrop-blur-sm shadow-lg' 
          : 'bg-white/70 text-gray-800 hover:bg-white/90 border border-gray-200/50 backdrop-blur-sm shadow-lg'
        }
        ${!gameStarted || gameOver ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `
    };
  };
  
  const styles = getThemeStyles(theme);
  
  const handleDirectionClick = (direction: Direction) => {
    if (!gameStarted || gameOver) return;
    onDirectionChange(direction);
  };
  
  return (
    <div className="flex flex-col items-center gap-2 md:hidden">
      <div className="text-center mb-2">
        <div className={`text-sm font-medium ${styles.isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Touch Controls
        </div>
      </div>
      
      {/* Up button */}
      <button
        onClick={() => handleDirectionClick('UP')}
        className={styles.buttonClass}
        disabled={!gameStarted || gameOver}
      >
        <ArrowUp size={24} />
      </button>
      
      {/* Left, Down, Right buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => handleDirectionClick('LEFT')}
          className={styles.buttonClass}
          disabled={!gameStarted || gameOver}
        >
          <ArrowLeft size={24} />
        </button>
        
        <button
          onClick={() => handleDirectionClick('DOWN')}
          className={styles.buttonClass}
          disabled={!gameStarted || gameOver}
        >
          <ArrowDown size={24} />
        </button>
        
        <button
          onClick={() => handleDirectionClick('RIGHT')}
          className={styles.buttonClass}
          disabled={!gameStarted || gameOver}
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};