import { useEffect, useCallback } from 'react';
import { Direction } from '../types/game';

interface TouchControlsProps {
  onDirectionChange: (direction: Direction) => void;
  gameStarted: boolean;
  gameOver: boolean;
}

export const useTouchControls = ({ onDirectionChange, gameStarted, gameOver }: TouchControlsProps) => {
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!gameStarted || gameOver) return;
    
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startY = touch.clientY;
    
    const handleTouchEnd = (endEvent: TouchEvent) => {
      const endTouch = endEvent.changedTouches[0];
      const endX = endTouch.clientX;
      const endY = endTouch.clientY;
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const minSwipeDistance = 30;
      
      // Check if swipe distance is sufficient
      if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
        return;
      }
      
      // Determine swipe direction
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
          onDirectionChange('RIGHT');
        } else {
          onDirectionChange('LEFT');
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          onDirectionChange('DOWN');
        } else {
          onDirectionChange('UP');
        }
      }
      
      // Remove the touchend listener
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchend', handleTouchEnd);
  }, [onDirectionChange, gameStarted, gameOver]);
  
  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [handleTouchStart]);
};