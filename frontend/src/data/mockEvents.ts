import { TimelineEvent } from '../lib/supabase';

export const mockEvents: TimelineEvent[] = [
  {
    id: 'mock-1',
    epoch: 'Ancient',
    start_date: '-1500',
    end_date: '-1200',
    location: {
      lat: 31.7683,
      lng: 35.2137,
      name: 'Jerusalem',
      region: 'Middle East',
      country: 'Ancient Israel'
    },
    category: 'win',
    title: 'The Exodus from Egypt',
    synopsis: 'The liberation of the Israelites from slavery in Egypt, led by Moses. This foundational event shaped Jewish identity and faith.',
    severity_impact: 10,
    population_before: 600000,
    population_after: 600000,
    media_urls: [],
    sources: [{
      title: 'Book of Exodus',
      url: '#',
      type: 'religious text'
    }],
    verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mock-2',
    epoch: 'Ancient',
    start_date: '-586',
    location: {
      lat: 31.7683,
      lng: 35.2137,
      name: 'Jerusalem',
      region: 'Middle East',
      country: 'Babylon'
    },
    category: 'attack',
    title: 'Destruction of the First Temple',
    synopsis: 'The Babylonians destroyed Solomon\'s Temple and exiled the Jewish people to Babylon.',
    severity_impact: 9,
    population_before: 150000,
    population_after: 50000,
    media_urls: [],
    sources: [{
      title: 'Book of Kings',
      url: '#',
      type: 'religious text'
    }],
    verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mock-3',
    epoch: 'Medieval',
    start_date: '1290',
    location: {
      lat: 51.5074,
      lng: -0.1278,
      name: 'England',
      region: 'Europe',
      country: 'England'
    },
    category: 'struggle',
    title: 'Expulsion from England',
    synopsis: 'King Edward I expelled all Jews from England, not to return for over 350 years.',
    severity_impact: 7,
    population_before: 3000,
    population_after: 0,
    media_urls: [],
    sources: [{
      title: 'Historical Records',
      url: '#',
      type: 'historical document'
    }],
    verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];