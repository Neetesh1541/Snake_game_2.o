import React, { useState, useEffect, useCallback } from 'react';
import { GameBoard } from './GameBoard';
import { GameUI } from './GameUI';
import { DeveloperInfo } from './DeveloperInfo';
import { HelpSection } from './HelpSection';
import { Leaderboard } from './Leaderboard';
import { useSnakeGame } from '../hooks/useSnakeGame';
import { useAudio } from '../hooks/useAudio';
import { Direction, Difficulty } from '../types/game';
import { saveToLeaderboard } from '../utils/gameUtils';

export const SnakeGame: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeTab, setActiveTab] = useState<'game' | 'help' | 'leaderboard' | 'developer'>('game');
  
  const { playBackgroundMusic, stopBackgroundMusic, playFoodSound, playGameOverSound } = useAudio(audioEnabled);
  
  const handleFoodEaten = useCallback(() => {
    playFoodSound();
  }, [playFoodSound]);
  
  const handleGameOver = useCallback(() => {
    playGameOverSound();
    stopBackgroundMusic();
  }, [playGameOverSound, stopBackgroundMusic]);
  
  const { gameState, startGame, pauseGame, resetGame, changeDirection } = useSnakeGame(
    difficulty,
    handleFoodEaten,
    handleGameOver
  );
  
  useEffect(() => {
    if (gameState.gameStarted && !gameState.paused && !gameState.gameOver) {
      playBackgroundMusic();
    }
  }, [gameState.gameStarted, gameState.paused, gameState.gameOver, playBackgroundMusic]);
  
  useEffect(() => {
    if (gameState.gameOver && gameState.score > 0) {
      saveToLeaderboard(gameState.score, gameState.level, difficulty);
    }
  }, [gameState.gameOver, gameState.score, gameState.level, difficulty]);
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameState.gameStarted || gameState.gameOver) return;
      
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          changeDirection('UP');
          break;
        case 'ArrowDown':
          e.preventDefault();
          changeDirection('DOWN');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          changeDirection('LEFT');
          break;
        case 'ArrowRight':
          e.preventDefault();
          changeDirection('RIGHT');
          break;
        case ' ':
          e.preventDefault();
          pauseGame();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.gameStarted, gameState.gameOver, changeDirection, pauseGame]);
  
  const handleStartGame = () => {
    startGame();
    if (audioEnabled) {
      playBackgroundMusic();
    }
  };
  
  const tabClass = (tab: string) => `
    px-4 py-2 rounded-lg font-medium transition-all duration-200
    ${activeTab === tab 
      ? theme === 'dark' 
        ? 'bg-green-600 text-white' 
        : 'bg-green-500 text-white'
      : theme === 'dark' 
        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
        : 'bg-white text-gray-700 hover:bg-gray-100'
    }
  `;
  
  return (
    <div className={`
      min-h-screen transition-all duration-500 relative overflow-hidden
      ${theme === 'dark' 
        ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900' 
        : 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100'
      }
    `}>
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Wavy Background Layers */}
        <div className="absolute inset-0">
          {/* Layer 1 - Large waves */}
          <div 
            className={`
              absolute inset-0 opacity-30
              ${theme === 'dark' 
                ? 'bg-gradient-to-r from-purple-600/40 via-blue-600/40 to-green-600/40' 
                : 'bg-gradient-to-r from-purple-400/40 via-blue-400/40 to-green-400/40'
              }
            `}
            style={{
              background: `
                radial-gradient(ellipse at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(ellipse at 40% 80%, rgba(119, 198, 255, 0.3) 0%, transparent 50%)
              `,
              animation: 'wave 20s ease-in-out infinite'
            }}
          />
          
          {/* Layer 2 - Medium waves */}
          <div 
            className={`
              absolute inset-0 opacity-20
              ${theme === 'dark' 
                ? 'bg-gradient-to-l from-cyan-600/30 via-teal-600/30 to-emerald-600/30' 
                : 'bg-gradient-to-l from-cyan-400/30 via-teal-400/30 to-emerald-400/30'
              }
            `}
            style={{
              background: `
                radial-gradient(ellipse at 60% 30%, rgba(34, 197, 94, 0.2) 0%, transparent 50%),
                radial-gradient(ellipse at 30% 70%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 60%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)
              `,
              animation: 'wave 15s ease-in-out infinite reverse'
            }}
          />
          
          {/* Layer 3 - Small waves */}
          <div 
            className={`
              absolute inset-0 opacity-15
              ${theme === 'dark' 
                ? 'bg-gradient-to-tr from-rose-600/20 via-orange-600/20 to-yellow-600/20' 
                : 'bg-gradient-to-tr from-rose-400/20 via-orange-400/20 to-yellow-400/20'
              }
            `}
            style={{
              background: `
                radial-gradient(ellipse at 90% 10%, rgba(251, 146, 60, 0.15) 0%, transparent 50%),
                radial-gradient(ellipse at 10% 90%, rgba(244, 63, 94, 0.15) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)
              `,
              animation: 'wave 25s ease-in-out infinite'
            }}
          />
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-2 h-2 rounded-full opacity-20
                ${theme === 'dark' ? 'bg-white' : 'bg-gray-800'}
              `}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        
        {/* Geometric Shapes */}
        <div className="absolute inset-0">
          <div 
            className={`
              absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-2xl opacity-10
              ${theme === 'dark' ? 'bg-purple-500' : 'bg-purple-400'}
            `}
            style={{ animation: 'pulse 4s ease-in-out infinite' }}
          />
          <div 
            className={`
              absolute top-3/4 right-1/4 w-24 h-24 rounded-full blur-2xl opacity-10
              ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-400'}
            `}
            style={{ animation: 'pulse 6s ease-in-out infinite reverse' }}
          />
          <div 
            className={`
              absolute bottom-1/4 left-1/2 w-28 h-28 rounded-full blur-2xl opacity-10
              ${theme === 'dark' ? 'bg-green-500' : 'bg-green-400'}
            `}
            style={{ animation: 'pulse 5s ease-in-out infinite' }}
          />
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            Snake Game
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            A modern twist on the classic game
          </p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className={`
            flex gap-2 p-2 rounded-xl backdrop-blur-sm border
            ${theme === 'dark' 
              ? 'bg-gray-900/40 border-gray-700/50' 
              : 'bg-white/40 border-gray-300/50'
            }
          `}>
            <button onClick={() => setActiveTab('game')} className={tabClass('game')}>
              Game
            </button>
            <button onClick={() => setActiveTab('help')} className={tabClass('help')}>
              Help
            </button>
            <button onClick={() => setActiveTab('leaderboard')} className={tabClass('leaderboard')}>
              Leaderboard
            </button>
            <button onClick={() => setActiveTab('developer')} className={tabClass('developer')}>
              Developer
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'game' && (
            <div className="grid xl:grid-cols-3 gap-8 items-start">
              <div className="xl:col-span-2 flex justify-center">
                <GameBoard gameState={gameState} theme={theme} />
              </div>
              <div className="space-y-6">
                <GameUI
                  gameState={gameState}
                  difficulty={difficulty}
                  audioEnabled={audioEnabled}
                  theme={theme}
                  onStartGame={handleStartGame}
                  onPauseGame={pauseGame}
                  onResetGame={resetGame}
                  onDifficultyChange={setDifficulty}
                  onAudioToggle={() => setAudioEnabled(!audioEnabled)}
                  onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                />
              </div>
            </div>
          )}
          
          {activeTab === 'help' && (
            <div className="max-w-2xl mx-auto">
              <HelpSection theme={theme} />
            </div>
          )}
          
          {activeTab === 'leaderboard' && (
            <div className="max-w-2xl mx-auto">
              <Leaderboard theme={theme} />
            </div>
          )}
          
          {activeTab === 'developer' && (
            <div className="max-w-2xl mx-auto">
              <DeveloperInfo theme={theme} />
            </div>
          )}
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          25% { transform: translateX(5px) translateY(-5px) rotate(1deg); }
          50% { transform: translateX(-3px) translateY(3px) rotate(-1deg); }
          75% { transform: translateX(-5px) translateY(-3px) rotate(0.5deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
};