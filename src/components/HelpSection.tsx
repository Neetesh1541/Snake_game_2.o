import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Target, Shield } from 'lucide-react';

export type Theme = 'dark' | 'light' | 'neon' | 'ocean' | 'sunset' | 'forest';

interface HelpSectionProps {
  theme: Theme;
}

export const HelpSection: React.FC<HelpSectionProps> = ({ theme }) => {
  const getThemeStyles = (currentTheme: Theme) => {
    const isDark = ['dark', 'neon', 'ocean', 'forest'].includes(currentTheme);
    
    return {
      isDark,
      cardClass: `
        p-6 rounded-xl backdrop-blur-sm border
        ${isDark
          ? 'bg-gray-900/40 border-gray-700/50' 
          : 'bg-white/40 border-gray-300/50'
        }
      `,
      instructionClass: `
        flex items-center gap-3 p-3 rounded-lg
        ${isDark
          ? 'bg-gray-800/50 text-gray-300' 
          : 'bg-gray-100/50 text-gray-700'
        }
      `,
      textPrimary: isDark ? 'text-gray-200' : 'text-gray-800'
    };
  };
  
  const styles = getThemeStyles(theme);
  
  return (
    <div className={styles.cardClass}>
      <h3 className={`text-xl font-bold mb-4 ${styles.textPrimary}`}>
        How to Play
      </h3>
      
      <div className="space-y-3">
        <div className={styles.instructionClass}>
          <div className="flex gap-1">
            <ArrowUp size={16} />
            <ArrowDown size={16} />
            <ArrowLeft size={16} />
            <ArrowRight size={16} />
          </div>
          <div>
            <div className="font-medium">Use arrow keys or swipe to control the snake</div>
            <div className="text-sm opacity-80">Move your snake around the game board</div>
          </div>
        </div>
        
        <div className={styles.instructionClass}>
          <Target size={16} className="text-red-500" />
          <div>
            <div className="font-medium">Eat food to grow longer</div>
            <div className="text-sm opacity-80">Each food item increases your score by 10 points</div>
          </div>
        </div>
        
        <div className={styles.instructionClass}>
          <Shield size={16} className="text-yellow-500" />
          <div>
            <div className="font-medium">Avoid hitting walls or your own body</div>
            <div className="text-sm opacity-80">The game ends if you crash into obstacles</div>
          </div>
        </div>
        
        <div className={styles.instructionClass}>
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <div>
            <div className="font-medium">Survive as long as possible</div>
            <div className="text-sm opacity-80">The game gets faster as your level increases</div>
          </div>
        </div>
      </div>
    </div>
  );
};