// Epic Timeline Images - Studio Ghibli Style Visual Journey Through Jewish History
// Each image carefully mapped to create maximum emotional impact

export interface EpicTimelineImage {
  url: string;
  caption: string;
  emotionalTone: string;
  colorPalette: {
    primary: string[];
    accent: string[];
    atmosphere: string;
  };
  visualEffects?: string[];
  credit?: string;
}

export interface EpicImageSet {
  hero: EpicTimelineImage;
  gallery?: EpicTimelineImage[];
  thumbnail?: string;
}

// Comprehensive mapping of AI-generated images to timeline events
export const epicTimelineImages: Record<string, EpicImageSet> = {
  // ANCIENT ERA - Warm earth tones, divine blues
  'Origins in Ancient Mesopotamia': {
    hero: {
      url: '/images/events/abraham-journey.jpg',
      caption: 'Abraham leads the first exodus from Ur of the Chaldees',
      emotionalTone: 'epic beginning, destiny calling',
      colorPalette: {
        primary: ['#D4A574', '#8B7355', '#DEB887'],
        accent: ['#4A5D8A', '#FFD700'],
        atmosphere: 'Golden sunset over ancient ziggurats'
      },
      visualEffects: ['kenBurns', 'dustParticles', 'lightRays']
    },
    thumbnail: '/images/events/abraham-journey.jpg'
  },

  'The Ancient Canaanites': {
    hero: {
      url: '/images/events/ancient-canaanites.jpg',
      caption: 'The land between the River and the Sea',
      emotionalTone: 'ancestral connection, deep roots',
      colorPalette: {
        primary: ['#8B7355', '#A0522D', '#DEB887'],
        accent: ['#4682B4', '#FF6347'],
        atmosphere: 'Dawn mist over fortified cities'
      }
    }
  },

  'Migration to Harran': {
    hero: {
      url: '/images/events/migration-to-harran.jpg',
      caption: 'The journey north to the crossroads of civilizations',
      emotionalTone: 'transition, waystation to destiny',
      colorPalette: {
        primary: ['#CD853F', '#F4A460', '#FFE4B5'],
        accent: ['#483D8B', '#FF69B4'],
        atmosphere: 'Caravan lights under star-filled skies'
      }
    }
  },

  "Abraham's Covenant": {
    hero: {
      url: '/images/events/covenant-abraham.jpg',
      caption: 'Under countless stars, a promise for all time',
      emotionalTone: 'cosmic significance, divine promise',
      colorPalette: {
        primary: ['#191970', '#000080', '#4B0082'],
        accent: ['#FFD700', '#F0E68C'],
        atmosphere: 'Transcendent starlight, otherworldly glow'
      },
      visualEffects: ['starTwinkle', 'etherealGlow', 'parallax']
    },
    thumbnail: '/images/events/covenant-abraham.jpg'
  },

  'The Binding of Isaac': {
    hero: {
      url: '/images/events/isaac-binding.jpg',
      caption: 'Ultimate test of faith on Mount Moriah',
      emotionalTone: 'profound sacrifice, divine intervention',
      colorPalette: {
        primary: ['#8B7D6B', '#CDB79E', '#FFDEAD'],
        accent: ['#87CEEB', '#FFB6C1'],
        atmosphere: 'Dawn breaking through morning mist'
      },
      visualEffects: ['lightShafts', 'gentleZoom']
    }
  },

  'The Patriarchs and Matriarchs': {
    hero: {
      url: '/images/events/patriarchs-matriarchs.jpg',
      caption: 'Three generations gather at the wells of Beersheba',
      emotionalTone: 'family legacy, continuity',
      colorPalette: {
        primary: ['#DEB887', '#D2691E', '#F5DEB3'],
        accent: ['#4169E1', '#FFB6C1'],
        atmosphere: 'Golden afternoon, pastoral peace'
      }
    }
  },

  'Jacob Wrestling the Angel': {
    hero: {
      url: '/images/events/jacob-wrestling.jpg',
      caption: 'At Jabbok river, a struggle that births a nation',
      emotionalTone: 'spiritual transformation, becoming Israel',
      colorPalette: {
        primary: ['#483D8B', '#4B0082', '#6A5ACD'],
        accent: ['#00CED1', '#FFD700'],
        atmosphere: 'Mystical night, divine energy'
      },
      visualEffects: ['waterReflections', 'angelicGlow']
    }
  },

  'Descent into Egypt': {
    hero: {
      url: '/images/events/joseph-dreams.jpg',
      caption: 'Joseph reveals himself to his brothers',
      emotionalTone: 'reunion, providence revealed',
      colorPalette: {
        primary: ['#DAA520', '#B8860B', '#FFD700'],
        accent: ['#4169E1', '#DC143C'],
        atmosphere: 'Egyptian palace grandeur'
      }
    }
  },

  'Joseph and His Dreams': {
    hero: {
      url: '/images/events/joseph-reunion-egypt.jpg',
      caption: 'From slave to vizier - dreams fulfilled',
      emotionalTone: 'transformation, divine plan',
      colorPalette: {
        primary: ['#FFD700', '#DAA520', '#F0E68C'],
        accent: ['#9370DB', '#FF1493'],
        atmosphere: 'Dreamlike, surreal quality'
      }
    }
  },

  // EXODUS ERA - From bondage to freedom
  'Egyptian Slavery': {
    hero: {
      url: '/images/events/exodus-slavery.jpg',
      caption: 'In the crucible of bondage, a nation is forged',
      emotionalTone: 'oppression with underlying strength',
      colorPalette: {
        primary: ['#8B4513', '#A0522D', '#D2691E'],
        accent: ['#DC143C', '#FFD700'],
        atmosphere: 'Harsh sun, dust, but human dignity'
      },
      visualEffects: ['heatShimmer', 'dustMotes']
    }
  },

  'Moses and the Burning Bush': {
    hero: {
      url: '/images/events/moses-burning-bush.jpg',
      caption: 'At Horeb, the divine voice calls',
      emotionalTone: 'divine calling, transformation',
      colorPalette: {
        primary: ['#FF4500', '#FF6347', '#FF8C00'],
        accent: ['#00CED1', '#FFD700'],
        atmosphere: 'Supernatural fire, holy ground'
      },
      visualEffects: ['fireGlow', 'divineLight', 'shimmer']
    }
  },

  'The Exodus from Egypt': {
    hero: {
      url: '/images/events/exodus-red-sea.jpg',
      caption: 'Waters part as freedom beckons',
      emotionalTone: 'miraculous deliverance, epic escape',
      colorPalette: {
        primary: ['#00CED1', '#20B2AA', '#48D1CC'],
        accent: ['#FF6347', '#FFD700'],
        atmosphere: 'Dawn through water walls'
      },
      visualEffects: ['waterAnimation', 'lightPrisms', 'epicScale']
    },
    gallery: [
      {
        url: '/images/events/moses-parting-red-sea.jpg',
        caption: 'The moment of miracle',
        emotionalTone: 'divine intervention',
        colorPalette: {
          primary: ['#4682B4', '#5F9EA0', '#87CEEB'],
          accent: ['#FF69B4', '#FFD700'],
          atmosphere: 'Supernatural phenomena'
        }
      }
    ]
  },

  'Receiving of the Torah': {
    hero: {
      url: '/images/events/receiving-torah-sinai.jpg',
      caption: 'At Sinai, heaven touches earth',
      emotionalTone: 'cosmic revelation, nation born',
      colorPalette: {
        primary: ['#4B0082', '#8A2BE2', '#9400D3'],
        accent: ['#FFFFFF', '#FFD700'],
        atmosphere: 'Lightning, divine fire, sacred awe'
      },
      visualEffects: ['lightning', 'smokeEffects', 'glowingTablets']
    }
  },

  'Formation of Jewish Law and Identity': {
    hero: {
      url: '/images/events/wilderness-tabernacle.jpg',
      caption: 'The Mishkan - divine dwelling among the people',
      emotionalTone: 'sacred craftsmanship, holy presence',
      colorPalette: {
        primary: ['#FFD700', '#DAA520', '#B8860B'],
        accent: ['#4169E1', '#DC143C'],
        atmosphere: 'Golden hour, incense smoke'
      },
      visualEffects: ['goldShimmer', 'incenseSmoke', 'fabricFlow']
    }
  },

  // KINGDOM ERA - Glory and majesty
  'King David Establishes Jerusalem': {
    hero: {
      url: '/images/events/king-david-jerusalem.jpg',
      caption: 'Dancing before the Ark, Jerusalem rejoices',
      emotionalTone: 'unbridled joy, eternal capital',
      colorPalette: {
        primary: ['#FFD700', '#FF6347', '#FF4500'],
        accent: ['#4169E1', '#FFFFFF'],
        atmosphere: 'Celebration, music, divine presence'
      },
      visualEffects: ['confetti', 'musicNotes', 'crowdMovement']
    }
  },

  'First Temple Built': {
    hero: {
      url: '/images/events/solomon-temple-dedication.jpg',
      caption: 'Solomon\'s Temple - where heaven meets earth',
      emotionalTone: 'architectural wonder, divine glory',
      colorPalette: {
        primary: ['#FFD700', '#DAA520', '#B8860B'],
        accent: ['#8B0000', '#FFFFFF'],
        atmosphere: 'Shekinah glory descending'
      },
      visualEffects: ['godRays', 'architecturalGrandeur', 'cloudDescending']
    }
  },

  // Additional event mappings with placeholder references for missing images
  'Babylonian Destruction': {
    hero: {
      url: '/images/events/temple-destruction.jpg',
      caption: 'The unthinkable - Temple in flames',
      emotionalTone: 'catastrophic loss, exile begins',
      colorPalette: {
        primary: ['#8B0000', '#DC143C', '#B22222'],
        accent: ['#2F4F4F', '#000000'],
        atmosphere: 'Smoke, flames, tears'
      }
    }
  },

  'Spanish Inquisition': {
    hero: {
      url: '/images/events/spanish-expulsion.jpg',
      caption: '1492 - Exile from Sefarad',
      emotionalTone: 'forced wandering, hidden faith',
      colorPalette: {
        primary: ['#2F4F4F', '#696969', '#708090'],
        accent: ['#8B0000', '#FFD700'],
        atmosphere: 'Ships at twilight, sorrowful departure'
      }
    }
  },

  'Holocaust': {
    hero: {
      url: '/images/events/warsaw-ghetto-uprising.jpg',
      caption: 'In darkness, the spark of resistance',
      emotionalTone: 'defiance in darkness',
      colorPalette: {
        primary: ['#2F4F4F', '#000000', '#696969'],
        accent: ['#FF4500', '#FFD700'],
        atmosphere: 'Ember glow against darkness'
      }
    }
  },

  'Establishment of Israel': {
    hero: {
      url: '/images/events/israel-independence.jpg',
      caption: 'After 2000 years - a nation reborn',
      emotionalTone: 'miraculous rebirth, hope fulfilled',
      colorPalette: {
        primary: ['#0000CD', '#FFFFFF', '#87CEEB'],
        accent: ['#FFD700', '#32CD32'],
        atmosphere: 'Mediterranean brilliance, desert blooms'
      }
    }
  },

  'Six Day War': {
    hero: {
      url: '/images/events/western-wall-liberation.jpg',
      caption: 'The Wall - touching eternity again',
      emotionalTone: 'return, reunion, fulfillment',
      colorPalette: {
        primary: ['#F5DEB3', '#DEB887', '#D2691E'],
        accent: ['#0000CD', '#FFFFFF'],
        atmosphere: 'Golden Jerusalem stone, prayers ascending'
      }
    }
  },

  // Additional epic moments now with generated images
  'Exile to Babylon': {
    hero: {
      url: '/images/events/babylonian-exile.jpg',
      caption: 'By the rivers of Babylon, we wept',
      emotionalTone: 'longing, memory, faithfulness',
      colorPalette: {
        primary: ['#708090', '#778899', '#696969'],
        accent: ['#4682B4', '#DEB887'],
        atmosphere: 'Melancholic riverside, distant memories'
      },
      visualEffects: ['waterReflection', 'gentleMist']
    }
  },

  'Return from Exile': {
    hero: {
      url: '/images/events/second-temple-building.jpg',
      caption: 'From ashes, the Temple rises again',
      emotionalTone: 'renewal, determination, hope',
      colorPalette: {
        primary: ['#DEB887', '#F5DEB3', '#FFE4B5'],
        accent: ['#4169E1', '#32CD32'],
        atmosphere: 'Dawn of reconstruction'
      }
    }
  },

  'The Maccabean Revolt': {
    hero: {
      url: '/images/events/maccabean-revolt.jpg',
      caption: 'The miracle of lights begins',
      emotionalTone: 'triumph over tyranny, divine intervention',
      colorPalette: {
        primary: ['#FFD700', '#DAA520', '#B8860B'],
        accent: ['#0000CD', '#DC143C'],
        atmosphere: 'Sacred flames against winter darkness'
      },
      visualEffects: ['candleGlow', 'lightRays']
    }
  },

  'Liberation from Camps': {
    hero: {
      url: '/images/events/holocaust-liberation.jpg',
      caption: 'From darkness into light',
      emotionalTone: 'survival, resilience, new beginning',
      colorPalette: {
        primary: ['#696969', '#A9A9A9', '#D3D3D3'],
        accent: ['#87CEEB', '#FFD700'],
        atmosphere: 'Breaking dawn after endless night'
      }
    }
  },

  'Ethiopian Aliyah': {
    hero: {
      url: '/images/events/operation-solomon.jpg',
      caption: 'Operation Solomon - coming home',
      emotionalTone: 'unity, ancient roots fulfilled',
      colorPalette: {
        primary: ['#FFFFFF', '#F0F8FF', '#E6E6FA'],
        accent: ['#FF4500', '#32CD32'],
        atmosphere: 'African sunrise meets promised land'
      }
    }
  },

  'Modern Innovation': {
    hero: {
      url: '/images/events/modern-israel-innovation.jpg',
      caption: 'Making the desert bloom',
      emotionalTone: 'transformation, future vision',
      colorPalette: {
        primary: ['#32CD32', '#90EE90', '#98FB98'],
        accent: ['#0000CD', '#FFD700'],
        atmosphere: 'High-tech meets ancient wisdom'
      },
      visualEffects: ['technoPulse', 'growthAnimation']
    }
  }
};

// Helper function to get image set for an event
export function getEventImages(eventTitle: string): EpicImageSet | null {
  return epicTimelineImages[eventTitle] || null;
}

// Get all events that need images generated
export function getMissingImages(): string[] {
  const missing: string[] = [];
  Object.entries(epicTimelineImages).forEach(([event, imageSet]) => {
    if (imageSet.hero.url.includes('To be generated')) {
      missing.push(event);
    }
  });
  return missing;
}

// Color palette for different eras
export const eraColorPalettes: Record<string, {
  primary: string;
  secondary: string;
  accent: string;
}> = {
  'Ancient': {
    primary: '#D4A574',
    secondary: '#4A5D8A',
    accent: '#FFD700'
  },
  'Classical': {
    primary: '#8B4513',
    secondary: '#4682B4',
    accent: '#FF6347'
  },
  'Medieval': {
    primary: '#696969',
    secondary: '#8B0000',
    accent: '#FFD700'
  },
  'Modern': {
    primary: '#2F4F4F',
    secondary: '#FF4500',
    accent: '#FFD700'
  },
  'Contemporary': {
    primary: '#0000CD',
    secondary: '#32CD32',
    accent: '#FFD700'
  }
};