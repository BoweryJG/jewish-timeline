import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://alkzliirqdofpygknsij.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions for our database
export interface TimelineEvent {
  id: string
  epoch: string
  start_date: string
  end_date?: string
  location?: {
    lat: number
    lng: number
    name: string
    region: string
    country?: string
  }
  category: 'struggle' | 'attack' | 'win' | 'population' | 'origins' | 'migration' | 'covenant' | 'cultural' | 'spiritual' | 'golden_age' | 'innovation' | 'resilience'
  title: string
  synopsis: string
  severity_impact?: number
  population_before?: number
  population_after?: number
  media_urls?: string[]
  sources?: Array<{
    title: string
    url: string
    type: string
  }>
  verified: boolean
  created_at: string
  updated_at: string
}

export interface PopulationSnapshot {
  id: string
  year: number
  region: string
  country?: string
  population: number
  percentage_of_world_jewish_pop?: number
  notes?: string
  sources?: Array<{
    title: string
    url: string
    type: string
  }>
  created_at: string
}

export interface MediaAsset {
  id: string
  event_id: string
  url: string
  storage_path?: string
  type: 'image' | 'video' | 'document' | 'audio'
  caption?: string
  attribution?: string
  license?: string
  metadata?: Record<string, any>
  created_at: string
}