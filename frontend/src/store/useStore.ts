import { create } from 'zustand';
import type { TimelineEvent } from '../lib/supabase';

interface AppState {
  // View mode
  viewMode: 'portrait' | 'landscape';
  setViewMode: (mode: 'portrait' | 'landscape') => void;
  
  // Events
  events: TimelineEvent[];
  setEvents: (events: TimelineEvent[]) => void;
  currentEventIndex: number;
  setCurrentEventIndex: (index: number) => void;
  
  // UI State
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  showOrientationPrompt: boolean;
  setShowOrientationPrompt: (show: boolean) => void;
  
  // Performance
  quality: 'low' | 'medium' | 'high';
  setQuality: (quality: 'low' | 'medium' | 'high') => void;
  
  // Interaction
  selectedEvent: TimelineEvent | null;
  setSelectedEvent: (event: TimelineEvent | null) => void;
  collectedFragments: string[];
  collectFragment: (fragmentId: string) => void;
  
  // Audio
  audioEnabled: boolean;
  setAudioEnabled: (enabled: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
}

export const useStore = create<AppState>((set) => ({
  // View mode
  viewMode: 'portrait',
  setViewMode: (mode) => set({ viewMode: mode }),
  
  // Events
  events: [],
  setEvents: (events) => set({ events }),
  currentEventIndex: 0,
  setCurrentEventIndex: (index) => set({ currentEventIndex: index }),
  
  // UI State
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
  showOrientationPrompt: false,
  setShowOrientationPrompt: (show) => set({ showOrientationPrompt: show }),
  
  // Performance
  quality: 'medium',
  setQuality: (quality) => set({ quality }),
  
  // Interaction
  selectedEvent: null,
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  collectedFragments: [],
  collectFragment: (fragmentId) => set((state) => ({
    collectedFragments: [...state.collectedFragments, fragmentId]
  })),
  
  // Audio
  audioEnabled: true,
  setAudioEnabled: (enabled) => set({ audioEnabled: enabled }),
  volume: 0.5,
  setVolume: (volume) => set({ volume }),
}));