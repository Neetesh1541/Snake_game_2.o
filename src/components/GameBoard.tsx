import React from 'react';
import { GameState } from '../types/game';
import { GRID_SIZE } from '../utils/gameUtils';

export type Theme = 'dark' | 'light' | 'neon' | 'ocean' | 'sunset' | 'forest';

interface GameBoardProps {
  gameState: GameState;
  theme: Theme;
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameState, theme }) => {
  const { snake, food } = gameState;
  
  const getThemeStyles = (currentTheme: Theme) => {
    switch (currentTheme) {
      case 'dark':
        return {
          board: 'bg-gray-900/30 border-gray-700/30',
          snakeHead: 'bg-green-400 shadow-green-400/50',
          snakeBody: 'bg-green-300',
          food: 'bg-red-400 shadow-red-400/70',
          grid: 'bg-gray-800/10 border-gray-700/10'
        };
      case 'light':
        return {
          board: 'bg-white/30 border-gray-300/30',
          snakeHead: 'bg-green-600 shadow-green-600/50',
          snakeBody: 'bg-green-500',
          food: 'bg-red-500 shadow-red-500/70',
          grid: 'bg-gray-100/20 border-gray-200/20'
        };
      case 'neon':
        return {
          board: 'bg-black/50 border-cyan-500/30',
          snakeHead: 'bg-lime-400 shadow-lime-400/70',
          snakeBody: 'bg-lime-300',
          food: 'bg-pink-400 shadow-pink-400/70',
          grid: 'bg-gray-900/20 border-cyan-500/10'
        };
      case 'ocean':
        return {
          board: 'bg-blue-900/30 border-cyan-400/30',
          snakeHead: 'bg-teal-400 shadow-teal-400/50',
          snakeBody: 'bg-teal-300',
          food: 'bg-orange-400 shadow-orange-400/70',
          grid: 'bg-blue-800/10 border-cyan-400/10'
        };
      case 'sunset':
        return {
          board: 'bg-orange-900/30 border-yellow-400/30',
          snakeHead: 'bg-yellow-400 shadow-yellow-400/50',
          snakeBody: 'bg-yellow-300',
          food: 'bg-red-400 shadow-red-400/70',
          grid: 'bg-orange-800/10 border-yellow-400/10'
        };
      case 'forest':
        return {
          board: 'bg-green-900/30 border-lime-400/30',
          snakeHead: 'bg-lime-400 shadow-lime-400/50',
          snakeBody: 'bg-lime-300',
          food: 'bg-red-400 shadow-red-400/70',
          grid: 'bg-green-800/10 border-lime-400/10'
        };
      default:
        return getThemeStyles('dark');
    }
  };
  
  const styles = getThemeStyles(theme);
  
  const renderCell = (x: number, y: number) => {
    const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y;
    const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
    const isFood = food.x === x && food.y === y;
    
    let cellClass = 'w-3 h-3 transition-all duration-100 ';
    
    if (isSnakeHead) {
      cellClass += `${styles.snakeHead} rounded-full shadow-lg animate-pulse`;
    } else if (isSnakeBody) {
      cellClass += `${styles.snakeBody} rounded-md shadow-md`;
    } else if (isFood) {
      cellClass += `${styles.food} rounded-full animate-bounce shadow-lg`;
    } else {
      cellClass += `${styles.grid}`;
    }
    
    return (
      <div
        key={`${x}-${y}`}
        className={cellClass}
        style={{
          gridColumn: x + 1,
          gridRow: y + 1
        }}
      />
    );
  };
  
  const cells = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      cells.push(renderCell(x, y));
    }
  }
  
  return (
    <div className="relative">
      <div 
        className={`
          grid gap-0 p-6 rounded-3xl backdrop-blur-md border-2 transition-all duration-300 shadow-2xl
          ${styles.board}
        `}
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          maxWidth: '600px',
          maxHeight: '600px'
        }}
      >
        {cells}
      </div>
    </div>
  );
};