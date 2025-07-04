import React from 'react';
import { Github, Mail, Phone } from 'lucide-react';

export type Theme = 'dark' | 'light' | 'neon' | 'ocean' | 'sunset' | 'forest';

interface DeveloperInfoProps {
  theme: Theme;
}

export const DeveloperInfo: React.FC<DeveloperInfoProps> = ({ theme }) => {
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
      textPrimary: isDark ? 'text-gray-200' : 'text-gray-800',
      textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
      linkClass: `
        flex items-center gap-2 p-2 rounded-lg transition-all duration-200
        ${isDark
          ? 'text-gray-300 hover:text-green-400 hover:bg-gray-800/50' 
          : 'text-gray-600 hover:text-green-600 hover:bg-gray-100/50'
        }
      `,
      accentColor: currentTheme === 'neon' ? 'text-lime-400' :
                   currentTheme === 'ocean' ? 'text-cyan-400' :
                   currentTheme === 'sunset' ? 'text-yellow-400' :
                   currentTheme === 'forest' ? 'text-lime-400' :
                   'text-green-500'
    };
  };
  
  const styles = getThemeStyles(theme);
  
  return (
    <div className={styles.cardClass}>
      <h3 className={`text-xl font-bold mb-4 ${styles.textPrimary}`}>
        Developer Info
      </h3>
      
      <div className="space-y-2">
        <div className={`font-medium ${styles.textPrimary}`}>
          Developed by <span className={styles.accentColor}>Neetesh Sharma</span>
        </div>
        
        <a 
          href="mailto:neeteshk1104@gmail.com" 
          className={styles.linkClass}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail size={16} />
          neeteshk1104@gmail.com
        </a>
        
        <a 
          href="tel:+918218828273" 
          className={styles.linkClass}
        >
          <Phone size={16} />
          +91 8218828273
        </a>
        
        <a 
          href="https://github.com/neetesh1541" 
          className={styles.linkClass}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={16} />
          github.com/neetesh1541
        </a>
      </div>
    </div>
  );
};