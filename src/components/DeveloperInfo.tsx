import React from 'react';
import { Github, Mail, Phone } from 'lucide-react';

interface DeveloperInfoProps {
  theme: 'light' | 'dark';
}

export const DeveloperInfo: React.FC<DeveloperInfoProps> = ({ theme }) => {
  const linkClass = `
    flex items-center gap-2 p-2 rounded-lg transition-all duration-200
    ${theme === 'dark' 
      ? 'text-gray-300 hover:text-green-400 hover:bg-gray-800/50' 
      : 'text-gray-600 hover:text-green-600 hover:bg-gray-100/50'
    }
  `;
  
  return (
    <div className={`
      p-6 rounded-xl backdrop-blur-sm border
      ${theme === 'dark' 
        ? 'bg-gray-900/40 border-gray-700/50' 
        : 'bg-white/40 border-gray-300/50'
      }
    `}>
      <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
        Developer Info
      </h3>
      
      <div className="space-y-2">
        <div className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
          Developed by <span className="text-green-500">Neetesh Sharma</span>
        </div>
        
        <a 
          href="mailto:neeteshk1104@gmail.com" 
          className={linkClass}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail size={16} />
          neeteshk1104@gmail.com
        </a>
        
        <a 
          href="tel:+918218828273" 
          className={linkClass}
        >
          <Phone size={16} />
          +91 8218828273
        </a>
        
        <a 
          href="https://github.com/neetesh1541" 
          className={linkClass}
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