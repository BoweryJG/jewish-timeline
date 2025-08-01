import { Howl, Howler } from 'howler';

interface SoundConfig {
  src: string[];
  volume?: number;
  loop?: boolean;
  sprite?: { [key: string]: [number, number] };
}

class AudioManager {
  private sounds: Map<string, Howl> = new Map();
  private ambientSound: Howl | null = null;
  private enabled: boolean = true;
  private masterVolume: number = 0.5;

  constructor() {
    // Set global volume
    Howler.volume(this.masterVolume);
    
    // Initialize sounds with error handling
    try {
      this.initializeSounds();
    } catch (error) {
      console.warn('Audio initialization failed:', error);
      // Continue without audio - don't break the app
    }
  }

  private initializeSounds() {
    // Category-specific sounds (using actual sound data)
    const sounds: { [key: string]: SoundConfig } = {
      victory: {
        src: ['data:audio/wav;base64,UklGRqoGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YYYGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWTwwNUqzn77VlHAY6k9n0y3UoBS19yO/djjsIHmW98OWdTQ'],
        volume: 0.3
      },
      struggle: {
        src: ['data:audio/wav;base64,UklGRtYGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YbIGAAC1tbW1tbW1tbW1tbW1tbW1ra2NjXV1ZWVVVVVVZWVtbYWFsbG1ta2tjY11dWVlVVVVVWVlbW2FhbGxtbWtra2NjX19ZWVlZVVVZWVtbYWFpbW1ta2tjY19fWVlZWVVVWVlbW2FhaW1tbWtrY2NfX1lZWVlVVVlZW1thYWltbW1ta2tjY19fWVlZWVVVWVlbW2FhaW1tbWtrY2NfX1lZWVlVVVlZW1thYWltbW1ra2NjX19ZWVlZVVVZWVtbYWFpbW1ta'],
        volume: 0.3
      },
      attack: {
        src: ['data:audio/wav;base64,UklGRpYGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YXIGAADCx8zCfHV5kJCRlZeVjnx5fIySm5mOdmNiYnCInqCLck5PYHeRlZWKdF9YXnSJkIqAcWdeZHeBiYl/cGVkbHuHhHpuZmVwfYiGfG9mZXCAiIZ7bWVldH+JhXxuZGRzfoiFe21jY3N/iYR7bWNkc3+JhHttY2Rygol+cGNkbXuIhHhsY2NvfYiGem1iYnB+iIV7bWJjb36IhXxtYmNwf4mFe21iYnF/iYR7bmJjcn+HhHttY2Jyf4aDe25jY3OAhYN7b2Njc3+Gg3twY2Nzf4aDenFkY3OAhoN7cGRjc3+Gg3xxZGNzf4WDenBkZHOAhoR6cGVkdH+Fg3tvZGRzfoaDe3Bm'],
        volume: 0.3
      },
      population: {
        src: ['data:audio/wav;base64,UklGRmYGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YUIGAACtra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2t'],
        volume: 0.3
      },
      hover: {
        src: ['data:audio/wav;base64,UklGRiYGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoGAAA+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4'],
        volume: 0.2
      },
      click: {
        src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'],
        volume: 0.25
      },
      // Removed ambient sound temporarily - was causing infinite loop with empty data
    };

    // Create Howl instances with error handling
    Object.entries(sounds).forEach(([name, config]) => {
      try {
        const howl = new Howl({
          ...config,
          // Add html5 audio support as fallback
          html5: true,
          // Add format hint
          format: ['wav'],
          // Handle load errors
          onloaderror: (_id: number, error: any) => {
            console.warn(`Failed to load sound ${name}:`, error);
          },
          // Prevent infinite loop on end
          onend: function() {
            // Do nothing - prevent any automatic replay
          }
        });
        this.sounds.set(name, howl);
      } catch (error) {
        console.warn(`Failed to create sound ${name}:`, error);
      }
    });

    // Ambient sound disabled temporarily
    this.ambientSound = null;
  }

  // Play a sound by name
  play(soundName: string, options?: { volume?: number; rate?: number }) {
    if (!this.enabled) return;

    const sound = this.sounds.get(soundName);
    if (sound) {
      try {
        const id = sound.play();
        
        if (options?.volume !== undefined) {
          sound.volume(options.volume, id);
        }
        
        if (options?.rate !== undefined) {
          sound.rate(options.rate, id);
        }
      } catch (error) {
        console.warn(`Failed to play sound ${soundName}:`, error);
      }
    }
  }

  // Play category-specific sound
  playCategory(category: string) {
    const soundMap: { [key: string]: string } = {
      win: 'victory',
      struggle: 'struggle',
      attack: 'attack',
      population: 'population',
      origins: 'victory',
      migration: 'population',
      covenant: 'victory',
      cultural: 'victory',
      spiritual: 'victory',
      golden_age: 'victory',
      innovation: 'victory',
      resilience: 'struggle'
    };
    
    const soundName = soundMap[category] || 'click';
    this.play(soundName, {
      volume: 0.3,
      rate: 0.9 + Math.random() * 0.2 // Slight pitch variation
    });
  }

  // Play hover sound
  playHover() {
    this.play('hover', { volume: 0.15 });
  }

  // Play click sound
  playClick() {
    this.play('click', { volume: 0.2 });
  }

  // Start ambient sound
  startAmbient() {
    if (this.ambientSound && !this.ambientSound.playing()) {
      this.ambientSound.fade(0, 0.15, 2000);
      this.ambientSound.play();
    }
  }

  // Stop ambient sound
  stopAmbient() {
    if (this.ambientSound && this.ambientSound.playing()) {
      this.ambientSound.fade(0.15, 0, 2000);
      setTimeout(() => {
        this.ambientSound?.stop();
      }, 2000);
    }
  }

  // Toggle sound on/off
  toggle() {
    this.enabled = !this.enabled;
    if (!this.enabled) {
      Howler.volume(0);
      this.stopAmbient();
    } else {
      Howler.volume(this.masterVolume);
    }
    return this.enabled;
  }

  // Set master volume
  setVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    if (this.enabled) {
      Howler.volume(this.masterVolume);
    }
  }

  // Get enabled state
  isEnabled() {
    return this.enabled;
  }

  // Create Web Audio API synthesized sounds
  createSynthSound(type: 'victory' | 'struggle' | 'attack' | 'population' | 'hover' | 'click') {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Configure sound based on type
    switch (type) {
      case 'victory':
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.exponentialRampToValueAtTime(1046.50, audioContext.currentTime + 0.1); // C6
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        break;
      
      case 'struggle':
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3
        oscillator.frequency.linearRampToValueAtTime(440, audioContext.currentTime + 0.3); // A4
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        break;
      
      case 'attack':
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(55, audioContext.currentTime); // A1
        gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        break;
      
      case 'population':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(293.66, audioContext.currentTime); // D4
        oscillator.frequency.linearRampToValueAtTime(349.23, audioContext.currentTime + 0.2); // F4
        gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
        break;
      
      case 'hover':
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        break;
      
      case 'click':
        oscillator.frequency.setValueAtTime(1760, audioContext.currentTime); // A6
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        break;
    }
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
  }
}

// Create singleton instance
export const audioManager = new AudioManager();

// Export types
export type { AudioManager };