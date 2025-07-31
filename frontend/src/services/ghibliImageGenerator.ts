// Studio Ghibli-style image generation service for Jewish timeline events
// Uses AI image generation to create beautiful, dreamlike historical scenes

export interface GhibliImagePrompt {
  event: string;
  era: string;
  style: 'landscape' | 'character' | 'artifact' | 'scene';
  mood: 'peaceful' | 'dramatic' | 'melancholic' | 'triumphant';
}

export const ghibliPrompts: Record<string, GhibliImagePrompt[]> = {
  'The Exodus from Egypt': [
    {
      event: 'Moses parting the Red Sea',
      era: 'Ancient',
      style: 'landscape',
      mood: 'triumphant',
    },
    {
      event: 'Israelites crossing desert with pillar of fire',
      era: 'Ancient', 
      style: 'scene',
      mood: 'dramatic',
    }
  ],
  'Destruction of the First Temple': [
    {
      event: 'Ancient Jerusalem temple in flames at sunset',
      era: 'Ancient',
      style: 'landscape',
      mood: 'melancholic',
    }
  ],
  'Building of Second Temple': [
    {
      event: 'Workers rebuilding temple with hope and determination',
      era: 'Ancient',
      style: 'scene',
      mood: 'peaceful',
    }
  ],
  'The Great Revolt': [
    {
      event: 'Masada fortress on mountain at dawn',
      era: 'Classical',
      style: 'landscape',
      mood: 'dramatic',
    }
  ],
  'Spanish Inquisition': [
    {
      event: 'Jewish family fleeing through medieval Spanish streets at night',
      era: 'Medieval',
      style: 'scene',
      mood: 'melancholic',
    }
  ],
  'Holocaust': [
    {
      event: 'Children looking at stars through window with hope',
      era: 'Modern',
      style: 'character',
      mood: 'melancholic',
    }
  ],
  'Establishment of Israel': [
    {
      event: 'Pioneers building kibbutz in blooming desert',
      era: 'Contemporary',
      style: 'landscape',
      mood: 'triumphant',
    }
  ]
};

export function generateGhibliPrompt(basePrompt: GhibliImagePrompt): string {
  const styleModifiers = {
    landscape: 'wide panoramic view, detailed environment, atmospheric perspective',
    character: 'character focus, expressive faces, emotional depth',
    artifact: 'detailed object study, symbolic importance, mystical aura',
    scene: 'multiple figures, dynamic composition, storytelling elements'
  };

  const moodModifiers = {
    peaceful: 'soft morning light, gentle colors, serene atmosphere',
    dramatic: 'dynamic lighting, bold contrasts, epic scale',
    melancholic: 'muted colors, nostalgic feeling, bittersweet beauty',
    triumphant: 'golden hour lighting, uplifting composition, hopeful atmosphere'
  };

  return `Studio Ghibli style, ${basePrompt.event}, ${styleModifiers[basePrompt.style]}, ${moodModifiers[basePrompt.mood]}, hand-painted aesthetic, watercolor textures, dreamy quality, Jewish historical themes, highly detailed, masterpiece quality`;
}

// Placeholder image data using gradients and patterns
export const ghibliPlaceholders: Record<string, { gradient: string; pattern: string }> = {
  'Ancient': {
    gradient: 'linear-gradient(135deg, #8B7355 0%, #DEB887 50%, #F4E4C1 100%)',
    pattern: 'radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)',
  },
  'Classical': {
    gradient: 'linear-gradient(135deg, #4A5568 0%, #718096 50%, #A0AEC0 100%)',
    pattern: 'radial-gradient(ellipse at top, rgba(255, 215, 0, 0.2) 0%, transparent 70%)',
  },
  'Medieval': {
    gradient: 'linear-gradient(135deg, #5D4037 0%, #8D6E63 50%, #BCAAA4 100%)',
    pattern: 'radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.25) 0%, transparent 60%)',
  },
  'Modern': {
    gradient: 'linear-gradient(135deg, #37474F 0%, #546E7A 50%, #78909C 100%)',
    pattern: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.15) 0%, transparent 80%)',
  },
  'Contemporary': {
    gradient: 'linear-gradient(135deg, #1976D2 0%, #42A5F5 50%, #90CAF9 100%)',
    pattern: 'radial-gradient(circle at 30% 70%, rgba(255, 215, 0, 0.35) 0%, transparent 50%)',
  }
};

// Generate CSS background for placeholder while real image loads
export function getGhibliPlaceholder(era: string): string {
  const placeholder = ghibliPlaceholders[era] || ghibliPlaceholders['Ancient'];
  return `${placeholder.gradient}, ${placeholder.pattern}`;
}

// Mock image URLs for now - these would be replaced with actual AI-generated images
export const ghibliImageUrls: Record<string, string[]> = {
  'The Exodus from Egypt': [
    'data:image/svg+xml,%3Csvg width="1200" height="600" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3ClinearGradient id="sky" x1="0%25" y1="0%25" x2="0%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23E3F2FD"%3E%3C/stop%3E%3Cstop offset="100%25" style="stop-color:%23FFF3E0"%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id="sea" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%231976D2"%3E%3C/stop%3E%3Cstop offset="100%25" style="stop-color:%2342A5F5"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="1200" height="400" fill="url(%23sky)"/%3E%3Cpath d="M0 400 Q300 350 600 400 T1200 400 L1200 600 L0 600 Z" fill="url(%23sea)" opacity="0.8"/%3E%3Cpath d="M200 380 Q250 300 300 380" fill="none" stroke="%23FFD700" stroke-width="3" opacity="0.6"/%3E%3Ccircle cx="1000" cy="100" r="60" fill="%23FFD700" opacity="0.8"/%3E%3C/svg%3E'
  ],
  'Destruction of the First Temple': [
    'data:image/svg+xml,%3Csvg width="1200" height="600" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3ClinearGradient id="fire" x1="0%25" y1="100%25" x2="0%25" y2="0%25"%3E%3Cstop offset="0%25" style="stop-color:%23D32F2F"%3E%3C/stop%3E%3Cstop offset="50%25" style="stop-color:%23FF6F00"%3E%3C/stop%3E%3Cstop offset="100%25" style="stop-color:%23FFD54F"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="1200" height="600" fill="%23263238"/%3E%3Crect x="400" y="200" width="400" height="300" fill="%234A4A4A"/%3E%3Cpath d="M400 200 L600 100 L800 200" fill="%235A5A5A"/%3E%3Cpath d="M450 500 Q600 400 750 500" fill="url(%23fire)" opacity="0.7"/%3E%3C/svg%3E'
  ],
  'Establishment of Israel': [
    'data:image/svg+xml,%3Csvg width="1200" height="600" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3ClinearGradient id="sunrise" x1="0%25" y1="0%25" x2="0%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23FFEB3B"%3E%3C/stop%3E%3Cstop offset="100%25" style="stop-color:%2381C784"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="1200" height="600" fill="url(%23sunrise)"/%3E%3Ccircle cx="150" cy="150" r="80" fill="%23FFD700" opacity="0.9"/%3E%3Cpath d="M0 400 Q300 350 600 380 T1200 400 L1200 600 L0 600 Z" fill="%234CAF50" opacity="0.8"/%3E%3Cpath d="M300 380 L350 300 L400 380 Z" fill="%23FFF" opacity="0.8"/%3E%3Cpath d="M500 370 L550 290 L600 370 Z" fill="%23FFF" opacity="0.8"/%3E%3C/svg%3E'
  ]
};