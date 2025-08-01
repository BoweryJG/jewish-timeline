// Free TTS using Hugging Face Spaces - No API keys required
export class FreeHuggingFaceTTS {
  private readonly FREE_SPACES = [
    {
      id: 'innoai/Edge-TTS-Text-to-Speech',
      name: 'Edge TTS',
      endpoint: '/api/predict',
      format: 'edge',
    },
    {
      id: 'mrfakename/MeloTTS',
      name: 'MeloTTS',
      endpoint: '/api/predict',
      format: 'melo',
    },
    {
      id: 'myshell-ai/OpenVoiceV2',
      name: 'OpenVoice V2',
      endpoint: '/api/predict',
      format: 'openvoice',
    }
  ];

  async generateSpeech(
    text: string,
    options: {
      voice?: string;
      language?: string;
      speed?: number;
    } = {}
  ): Promise<string | null> {
    // Try each space until one works
    for (const space of this.FREE_SPACES) {
      try {
        console.log(`Trying ${space.name}...`);
        const audioUrl = await this.callSpace(space, text, options);
        if (audioUrl) {
          console.log(`Success with ${space.name}`);
          return audioUrl;
        }
      } catch (error) {
        console.warn(`${space.name} failed:`, error);
        continue;
      }
    }
    
    console.error('All TTS services failed');
    return null;
  }

  private async callSpace(
    space: any,
    text: string,
    options: any
  ): Promise<string | null> {
    const baseUrl = `https://${space.id.replace('/', '-')}.hf.space`;
    
    try {
      // Format payload based on the space
      let payload: any;
      
      if (space.format === 'edge') {
        // Edge TTS format
        payload = {
          data: [
            text,
            options.voice || 'en-US-AriaNeural',
            options.speed || 0,
            0, // pitch
          ],
          fn_index: 0,
        };
      } else if (space.format === 'melo') {
        // MeloTTS format
        payload = {
          data: [
            text,
            'EN-US', // language
            'default', // speaker
            options.speed || 1.0,
          ],
          fn_index: 0,
        };
      } else if (space.format === 'openvoice') {
        // OpenVoice format
        payload = {
          data: [
            text,
            'default', // style
            null, // reference audio
            options.language || 'English',
          ],
          fn_index: 0,
        };
      }

      const response = await fetch(`${baseUrl}${space.endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      
      // Extract audio URL from response
      if (result.data) {
        // Check for base64 audio
        if (typeof result.data[0] === 'string' && result.data[0].startsWith('data:audio')) {
          return result.data[0];
        }
        
        // Check for file path
        if (result.data[0] && result.data[0].name) {
          return `${baseUrl}/file=${result.data[0].name}`;
        }
        
        // Check for direct URL
        if (typeof result.data[0] === 'string' && result.data[0].includes('.wav')) {
          return `${baseUrl}/file=${result.data[0]}`;
        }
      }
      
      return null;
    } catch (error) {
      console.error(`Error calling ${space.name}:`, error);
      return null;
    }
  }

  // Generate narration for timeline events
  async generateTimelineNarration(event: {
    title: string;
    synopsis: string;
    year: string;
  }): Promise<string | null> {
    const narration = `In ${event.year}, ${event.title}. ${event.synopsis}`;
    return this.generateSpeech(narration, {
      voice: 'en-US-AriaNeural',
      speed: 0.9,
    });
  }

  // Play audio from URL or base64
  async playAudio(audioUrl: string): Promise<void> {
    try {
      const audio = new Audio(audioUrl);
      audio.volume = 0.8;
      await audio.play();
    } catch (error) {
      console.error('Failed to play audio:', error);
    }
  }
}

// Export singleton instance
export const freeTTS = new FreeHuggingFaceTTS();