import { useRef, useCallback, useEffect } from 'react';

export const useAudio = (audioEnabled: boolean) => {
  const audioContext = useRef<AudioContext | null>(null);
  const backgroundMusic = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);
  
  const initAudio = useCallback(() => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    if (!backgroundMusic.current) {
      backgroundMusic.current = new Audio();
      backgroundMusic.current.loop = true;
      backgroundMusic.current.volume = 0.2;
      // Create a simple background music using Web Audio API
      createBackgroundMusic();
    }
  }, []);
  
  const createBackgroundMusic = useCallback(() => {
    // Create a simple melodic background music using oscillators
    if (audioContext.current && backgroundMusic.current) {
      // This creates a data URL for a simple background tune
      const sampleRate = 44100;
      const duration = 8; // 8 seconds loop
      const numSamples = sampleRate * duration;
      const buffer = audioContext.current.createBuffer(1, numSamples, sampleRate);
      const channelData = buffer.getChannelData(0);
      
      // Create a simple melody
      const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]; // C major scale
      const notePattern = [0, 2, 4, 2, 0, 2, 4, 2, 5, 4, 2, 0, 5, 4, 2, 0];
      
      for (let i = 0; i < numSamples; i++) {
        const time = i / sampleRate;
        const noteIndex = Math.floor((time * 2) % notePattern.length);
        const frequency = notes[notePattern[noteIndex]];
        const envelope = Math.sin(time * Math.PI * 2) * 0.1 * Math.exp(-time % 0.5);
        channelData[i] = Math.sin(2 * Math.PI * frequency * time) * envelope;
      }
      
      // Convert buffer to blob and create object URL
      const audioBuffer = buffer;
      const offlineContext = new OfflineAudioContext(1, numSamples, sampleRate);
      const source = offlineContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(offlineContext.destination);
      source.start();
      
      offlineContext.startRendering().then((renderedBuffer) => {
        const audioData = renderedBuffer.getChannelData(0);
        const wavBuffer = createWavBuffer(audioData, sampleRate);
        const blob = new Blob([wavBuffer], { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        if (backgroundMusic.current) {
          backgroundMusic.current.src = url;
        }
      });
    }
  }, []);
  
  const createWavBuffer = (audioData: Float32Array, sampleRate: number) => {
    const length = audioData.length;
    const buffer = new ArrayBuffer(44 + length * 2);
    const view = new DataView(buffer);
    
    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length * 2, true);
    
    // Convert float samples to 16-bit PCM
    let offset = 44;
    for (let i = 0; i < length; i++) {
      const sample = Math.max(-1, Math.min(1, audioData[i]));
      view.setInt16(offset, sample * 0x7FFF, true);
      offset += 2;
    }
    
    return buffer;
  };
  
  // Auto-start background music when component mounts
  useEffect(() => {
    if (audioEnabled) {
      initAudio();
      // Small delay to ensure audio context is ready
      setTimeout(() => {
        playBackgroundMusic();
      }, 100);
    }
    
    return () => {
      stopBackgroundMusic();
    };
  }, [audioEnabled]);
  
  const playBackgroundMusic = useCallback(() => {
    if (audioEnabled && backgroundMusic.current && !isPlayingRef.current) {
      initAudio();
      backgroundMusic.current.play().catch(console.error);
      isPlayingRef.current = true;
    }
  }, [audioEnabled, initAudio]);
  
  const stopBackgroundMusic = useCallback(() => {
    if (backgroundMusic.current && isPlayingRef.current) {
      backgroundMusic.current.pause();
      backgroundMusic.current.currentTime = 0;
      isPlayingRef.current = false;
    }
  }, []);
  
  const playSound = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!audioEnabled) return;
    
    initAudio();
    
    if (audioContext.current) {
      const oscillator = audioContext.current.createOscillator();
      const gainNode = audioContext.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.current.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + duration);
      
      oscillator.start();
      oscillator.stop(audioContext.current.currentTime + duration);
    }
  }, [audioEnabled, initAudio]);
  
  const playFoodSound = useCallback(() => {
    playSound(800, 0.2, 'triangle');
    // Add a second harmonic for richer sound
    setTimeout(() => playSound(1200, 0.15, 'sine'), 50);
  }, [playSound]);
  
  const playGameOverSound = useCallback(() => {
    // Play a descending sequence for game over
    playSound(400, 0.3, 'sawtooth');
    setTimeout(() => playSound(300, 0.3, 'sawtooth'), 200);
    setTimeout(() => playSound(200, 0.5, 'sawtooth'), 400);
  }, [playSound]);
  
  return {
    playBackgroundMusic,
    stopBackgroundMusic,
    playFoodSound,
    playGameOverSound
  };
};