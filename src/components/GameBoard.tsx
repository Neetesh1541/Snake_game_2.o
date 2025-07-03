import React from 'react';
import { GameState } from '../types/game';
import { GRID_SIZE } from '../utils/gameUtils';

interface GameBoardProps {
  gameState: GameState;
  theme: 'light' | 'dark';
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameState, theme }) => {
  const { snake, food } = gameState;
  
  const renderCell = (x: number, y: number) => {
    const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y;
    const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
    const isFood = food.x === x && food.y === y;
    
    let cellClass = 'w-3 h-3 transition-all duration-100 ';
    
    if (isSnakeHead) {
      cellClass += theme === 'dark' 
        ? 'bg-green-400 rounded-full shadow-lg shadow-green-400/50 animate-pulse' 
        : 'bg-green-600 rounded-full shadow-lg shadow-green-600/50 animate-pulse';
    } else if (isSnakeBody) {
      cellClass += theme === 'dark' 
        ? 'bg-green-300 rounded-md shadow-md' 
        : 'bg-green-500 rounded-md shadow-md';
    } else if (isFood) {
      cellClass += theme === 'dark' 
        ? 'bg-red-400 rounded-full animate-bounce shadow-lg shadow-red-400/70' 
        : 'bg-red-500 rounded-full animate-bounce shadow-lg shadow-red-500/70';
    } else {
      cellClass += theme === 'dark' 
        ? 'bg-gray-800/10 border border-gray-700/10' 
        : 'bg-gray-100/20 border border-gray-200/20';
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
          ${theme === 'dark' 
            ? 'bg-gray-900/30 border-gray-700/30' 
            : 'bg-white/30 border-gray-300/30'
          }
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