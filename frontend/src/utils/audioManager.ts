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
    
    // Initialize sounds
    this.initializeSounds();
  }

  private initializeSounds() {
    // Category-specific sounds (using data URIs for built-in sounds)
    const sounds: { [key: string]: SoundConfig } = {
      victory: {
        src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA='], // Placeholder
        volume: 0.3
      },
      struggle: {
        src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA='], // Placeholder
        volume: 0.3
      },
      attack: {
        src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA='], // Placeholder
        volume: 0.3
      },
      population: {
        src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA='], // Placeholder
        volume: 0.3
      },
      hover: {
        src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA='], // Placeholder
        volume: 0.2
      },
      click: {
        src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA='], // Placeholder
        volume: 0.25
      },
      ambient: {
        src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA='], // Placeholder
        volume: 0.15,
        loop: true
      }
    };

    // Create Howl instances
    Object.entries(sounds).forEach(([name, config]) => {
      this.sounds.set(name, new Howl(config));
    });

    this.ambientSound = this.sounds.get('ambient') || null;
  }

  // Play a sound by name
  play(soundName: string, options?: { volume?: number; rate?: number }) {
    if (!this.enabled) return;

    const sound = this.sounds.get(soundName);
    if (sound) {
      const id = sound.play();
      
      if (options?.volume !== undefined) {
        sound.volume(options.volume, id);
      }
      
      if (options?.rate !== undefined) {
        sound.rate(options.rate, id);
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