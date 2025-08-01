// TTS Service for high-quality text-to-speech
// We'll start with Web Speech API and can upgrade to Hugging Face models

class TTSService {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  
  constructor() {
    this.synth = window.speechSynthesis;
    this.loadVoices();
    
    // Reload voices when they change
    this.synth.addEventListener('voiceschanged', () => {
      this.loadVoices();
    });
  }
  
  private loadVoices() {
    this.voices = this.synth.getVoices();
    
    // Try to find high-quality English voices
    const preferredVoices = [
      'Google US English',
      'Microsoft David Desktop',
      'Microsoft Zira Desktop',
      'Alex',
      'Samantha',
      'Daniel'
    ];
    
    for (const voiceName of preferredVoices) {
      const voice = this.voices.find(v => v.name.includes(voiceName));
      if (voice) {
        this.selectedVoice = voice;
        break;
      }
    }
    
    // Fallback to first English voice
    if (!this.selectedVoice) {
      this.selectedVoice = this.voices.find(v => v.lang.startsWith('en')) || this.voices[0];
    }
  }
  
  speak(text: string, options?: {
    rate?: number;
    pitch?: number;
    volume?: number;
    voice?: string;
  }) {
    return new Promise<void>((resolve, reject) => {
      if (!this.synth) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }
      
      // Cancel any ongoing speech
      this.synth.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set voice
      if (options?.voice) {
        const customVoice = this.voices.find(v => v.name === options.voice);
        if (customVoice) {
          utterance.voice = customVoice;
        }
      } else if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }
      
      // Set options
      utterance.rate = options?.rate || 0.9; // Slightly slower for clarity
      utterance.pitch = options?.pitch || 1.0;
      utterance.volume = options?.volume || 1.0;
      
      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);
      
      this.synth.speak(utterance);
    });
  }
  
  // Speak Hebrew text with appropriate voice
  speakHebrew(text: string) {
    const hebrewVoice = this.voices.find(v => v.lang.startsWith('he'));
    if (hebrewVoice) {
      return this.speak(text, { voice: hebrewVoice.name, rate: 0.8 });
    } else {
      // Fallback to transliteration
      console.warn('No Hebrew voice found, using default voice');
      return this.speak(text);
    }
  }
  
  // Stop all speech
  stop() {
    this.synth.cancel();
  }
  
  // Get available voices
  getVoices() {
    return this.voices.map(v => ({
      name: v.name,
      lang: v.lang,
      default: v.default,
      localService: v.localService
    }));
  }
  
  // High-quality TTS using Hugging Face (to be implemented)
  async speakHighQuality(text: string, _voiceId?: string): Promise<string> {
    // For now, use Web Speech API
    // Later we can integrate with Hugging Face API
    await this.speak(text);
    return 'data:audio/wav;base64,'; // Placeholder
  }
  
  // Generate audio for UI sounds
  generateUISound(type: 'click' | 'hover' | 'success' | 'error'): string {
    // Return data URIs for UI sounds
    const sounds = {
      click: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
      hover: 'data:audio/wav;base64,UklGRiYGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoGAAA+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4',
      success: 'data:audio/wav;base64,UklGRqoGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YYYGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWTwwNUqzn77VlHAY6k9n0y3UoBS19yO/djjsIHmW98OWdTQ',
      error: 'data:audio/wav;base64,UklGRpYGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YXIGAADCx8zCfHV5kJCRlZeVjnx5fIySm5mOdmNiYnCInqCLck5PYHeRlZWKdF9YXnSJkIqAcWdeZHeBiYl/cGVkbHuHhHpuZmVwfYiGfG9mZXCAiIZ7bWVldH+JhXxuZGRzfoiFe21jY3N/iYR7bWNkc3+JhHttY2Rygol+cGNkbXuIhHhsY2NvfYiGem1iYnB+iIV7bWJjb36IhXxtYmNwf4mFe21iYnF/iYR7bmJjcn+HhHttY2Jyf4aDe25jY3OAhYN7b2Njc3+Gg3twY2Nzf4aDenFkY3OAhoN7cGRjc3+Gg3xxZGNzf4WDenBkZHOAhoR6cGVkdH+Fg3tvZGRzfoaDe3Bm'
    };
    
    return sounds[type] || sounds.click;
  }
}

// Create singleton instance
export const ttsService = new TTSService();

// Helper function to preload and generate audio for quotes
export async function generateQuoteAudio(quotes: Array<{
  hebrew: string;
  english: string;
  transliteration: string;
}>) {
  const audioPromises = quotes.map(async (quote) => {
    try {
      // For now, we'll use the browser's TTS
      // Later we can upgrade to high-quality API
      await ttsService.speak(quote.english, { rate: 0.8 });
      
      return {
        hebrew: quote.hebrew,
        english: quote.english,
        audioUrl: 'data:audio/wav;base64,' // Placeholder
      };
    } catch (error) {
      console.error('Failed to generate audio for quote:', error);
      return null;
    }
  });
  
  const results = await Promise.all(audioPromises);
  return results.filter(r => r !== null);
}