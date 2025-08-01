// High-quality TTS using Hugging Face Spaces
import { ttsService } from './ttsService';

class HuggingFaceTTS {
  private readonly SPACES = {
    // Multiple TTS spaces we can try
    coquiXTTS: 'coqui/xtts',
    barkTTS: 'suno/bark',
    edgeTTS: 'innoai/Edge-TTS-Text-to-Speech',
    elevenLabsFree: 'tigeLtoNoS/Elevenlabs-tts-Free',
    f5TTS: 'SWivid/F5-TTS',
    parlerTTS: 'parler-tts/parler_tts',
  };

  async generateSpeech(
    text: string, 
    options?: {
      voice?: string;
      language?: string;
      emotion?: string;
      speed?: number;
    }
  ): Promise<string> {
    // Try multiple endpoints until one works
    const spacesToTry = [
      this.SPACES.coquiXTTS,
      this.SPACES.edgeTTS,
      this.SPACES.elevenLabsFree,
      this.SPACES.f5TTS,
    ];

    for (const spaceId of spacesToTry) {
      try {
        console.log(`Trying Hugging Face Space: ${spaceId}`);
        const audioUrl = await this.callHuggingFaceSpace(spaceId, text, options);
        if (audioUrl) {
          return audioUrl;
        }
      } catch (error) {
        console.warn(`Failed with ${spaceId}:`, error);
        continue;
      }
    }

    // Fallback to browser TTS
    console.warn('All Hugging Face spaces failed, falling back to browser TTS');
    await ttsService.speak(text, { rate: options?.speed || 0.9 });
    return '';
  }

  private async callHuggingFaceSpace(
    spaceId: string,
    text: string,
    options?: any
  ): Promise<string> {
    // Construct the API endpoint
    const baseUrl = `https://${spaceId.replace('/', '-')}.hf.space`;
    
    // Different spaces have different API endpoints
    const endpoints = [
      '/api/predict',
      '/api/queue/push',
      '/run/predict',
      '/api/tts',
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: [text, options?.voice || 'default', options?.language || 'en'],
            fn_index: 0,
          }),
        });

        if (!response.ok) continue;

        const result = await response.json();
        
        // Different spaces return data differently
        if (result.data && result.data[0]) {
          // Some return base64 audio
          if (typeof result.data[0] === 'string' && result.data[0].startsWith('data:audio')) {
            return result.data[0];
          }
          // Some return a URL
          if (typeof result.data[0] === 'string' && result.data[0].startsWith('http')) {
            return result.data[0];
          }
          // Some return an object with audio data
          if (result.data[0].audio) {
            return result.data[0].audio;
          }
        }

        // Check for audio in other places
        if (result.audio) return result.audio;
        if (result.audio_url) return result.audio_url;
        if (result.url) return result.url;

      } catch (error) {
        console.debug(`Endpoint ${endpoint} failed:`, error);
        continue;
      }
    }

    throw new Error(`Unable to generate speech with ${spaceId}`);
  }

  // Generate speech for Hebrew quotes with appropriate voice
  async generateHebrewSpeech(hebrewText: string, englishText: string): Promise<{
    hebrewAudio?: string;
    englishAudio?: string;
  }> {
    const results: any = {};

    try {
      // Try to generate Hebrew speech
      results.hebrewAudio = await this.generateSpeech(hebrewText, {
        language: 'he',
        speed: 0.8,
      });
    } catch (error) {
      console.warn('Hebrew TTS failed:', error);
    }

    try {
      // Generate English speech
      results.englishAudio = await this.generateSpeech(englishText, {
        language: 'en',
        speed: 0.85,
        emotion: 'solemn',
      });
    } catch (error) {
      console.warn('English TTS failed:', error);
    }

    return results;
  }

  // Pre-generate all audio for quotes
  async preGenerateQuoteAudio(quotes: Array<{
    hebrew: string;
    english: string;
    transliteration: string;
  }>): Promise<Map<string, { hebrewAudio?: string; englishAudio?: string }>> {
    const audioMap = new Map();

    for (const quote of quotes) {
      console.log(`Generating audio for: ${quote.english}`);
      const audio = await this.generateHebrewSpeech(quote.hebrew, quote.english);
      audioMap.set(quote.english, audio);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return audioMap;
  }
}

// Export singleton instance
export const huggingFaceTTS = new HuggingFaceTTS();

// Helper to convert audio URL to playable format
export async function playAudioFromUrl(audioUrl: string): Promise<void> {
  try {
    const audio = new Audio(audioUrl);
    audio.volume = 0.8;
    await audio.play();
  } catch (error) {
    console.error('Failed to play audio:', error);
    // Fallback to browser TTS
    ttsService.speak('Audio playback failed', { rate: 0.9 });
  }
}