import { createClient } from '@supabase/supabase-js'
import type { TimelineEvent } from '../frontend/src/lib/supabase'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Load environment variables from parent directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '..', '.env') })

// Initialize Supabase client with service role key for seeding
const supabaseUrl = 'https://alkzliirqdofpygknsij.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseServiceKey) {
  throw new Error('SUPABASE_SERVICE_KEY is required in .env file')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Initial historical events data
const initialEvents: Omit<TimelineEvent, 'id' | 'created_at' | 'updated_at'>[] = [
  // Ancient Period
  {
    epoch: 'Ancient',
    start_date: '1200-01-01',
    end_date: '1200-12-31',
    location: {
      lat: 31.7683,
      lng: 35.2137,
      name: 'Ancient Israel',
      region: 'Middle East'
    },
    category: 'win',
    title: 'Exodus from Egypt',
    synopsis: 'The foundational event of Jewish history: liberation from slavery in Egypt and the receiving of the Torah at Mount Sinai.',
    severity_impact: 10,
    sources: [{
      title: 'Book of Exodus',
      url: 'https://www.sefaria.org/Exodus',
      type: 'primary'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '0586-01-01',
    end_date: '0586-12-31',
    location: {
      lat: 31.7683,
      lng: 35.2137,
      name: 'Jerusalem',
      region: 'Middle East'
    },
    category: 'struggle',
    title: 'First Temple Destruction',
    synopsis: 'The Babylonians destroyed the First Temple and exiled the Jewish people to Babylon, marking the beginning of the Jewish diaspora.',
    severity_impact: 9,
    population_before: 150000,
    population_after: 50000,
    sources: [{
      title: 'Book of Kings',
      url: 'https://www.sefaria.org/II_Kings',
      type: 'primary'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '0070-01-01',
    end_date: '0070-12-31',
    location: {
      lat: 31.7683,
      lng: 35.2137,
      name: 'Jerusalem',
      region: 'Middle East'
    },
    category: 'struggle',
    title: 'Second Temple Destruction',
    synopsis: 'Roman forces destroyed the Second Temple, leading to mass exile and the dispersal of Jews throughout the Roman Empire.',
    severity_impact: 10,
    population_before: 2500000,
    population_after: 1000000,
    sources: [{
      title: 'The Jewish War by Josephus',
      url: 'https://www.gutenberg.org/ebooks/2850',
      type: 'primary'
    }],
    verified: true
  },

  // Medieval Period
  {
    epoch: 'Medieval',
    start_date: '1096-01-01',
    end_date: '1096-12-31',
    location: {
      lat: 50.9375,
      lng: 6.9603,
      name: 'Rhineland',
      region: 'Europe',
      country: 'Germany'
    },
    category: 'attack',
    title: 'First Crusade Massacres',
    synopsis: 'Crusaders massacred thousands of Jews in the Rhineland communities despite attempts by local bishops to protect them.',
    severity_impact: 8,
    population_before: 20000,
    population_after: 10000,
    sources: [{
      title: 'Chronicles of the First Crusade',
      url: 'https://sourcebooks.fordham.edu/source/1096jews.asp',
      type: 'secondary'
    }],
    verified: true
  },
  {
    epoch: 'Medieval',
    start_date: '1290-07-18',
    end_date: '1290-07-18',
    location: {
      lat: 51.5074,
      lng: -0.1278,
      name: 'England',
      region: 'Europe',
      country: 'England'
    },
    category: 'struggle',
    title: 'Expulsion from England',
    synopsis: 'King Edward I expelled all Jews from England, the first of many national expulsions in medieval Europe.',
    severity_impact: 7,
    population_before: 3000,
    population_after: 0,
    sources: [{
      title: 'Calendar of the Close Rolls',
      url: 'https://www.british-history.ac.uk',
      type: 'primary'
    }],
    verified: true
  },
  {
    epoch: 'Medieval',
    start_date: '1492-03-31',
    end_date: '1492-03-31',
    location: {
      lat: 40.4168,
      lng: -3.7038,
      name: 'Spain',
      region: 'Europe',
      country: 'Spain'
    },
    category: 'struggle',
    title: 'Spanish Expulsion',
    synopsis: 'The Alhambra Decree expelled all Jews from Spain, ending centuries of Jewish life in Iberia and scattering Sephardic Jews across the Mediterranean.',
    severity_impact: 9,
    population_before: 200000,
    population_after: 0,
    sources: [{
      title: 'The Alhambra Decree',
      url: 'https://www.sephardicstudies.org/decree.html',
      type: 'primary'
    }],
    verified: true
  },

  // Modern Period
  {
    epoch: 'Modern',
    start_date: '1881-01-01',
    end_date: '1884-12-31',
    location: {
      lat: 55.7558,
      lng: 37.6173,
      name: 'Russian Empire',
      region: 'Europe',
      country: 'Russia'
    },
    category: 'attack',
    title: 'Russian Pogroms Begin',
    synopsis: 'A wave of anti-Jewish riots swept through the Russian Empire following the assassination of Tsar Alexander II, marking the beginning of mass Jewish emigration.',
    severity_impact: 8,
    population_before: 5000000,
    population_after: 4500000,
    sources: [{
      title: 'YIVO Archives on Russian Pogroms',
      url: 'https://yivoarchives.org',
      type: 'secondary'
    }],
    verified: true
  },
  {
    epoch: 'Modern',
    start_date: '1933-01-30',
    end_date: '1945-05-08',
    location: {
      lat: 52.5200,
      lng: 13.4050,
      name: 'Europe',
      region: 'Europe'
    },
    category: 'attack',
    title: 'The Holocaust',
    synopsis: 'The systematic genocide of six million Jews by Nazi Germany and its collaborators, representing the destruction of one-third of world Jewry.',
    severity_impact: 10,
    population_before: 16600000,
    population_after: 11000000,
    sources: [{
      title: 'Yad Vashem Holocaust History',
      url: 'https://www.yadvashem.org',
      type: 'secondary'
    }],
    verified: true
  },
  {
    epoch: 'Modern',
    start_date: '1948-05-14',
    end_date: '1948-05-14',
    location: {
      lat: 32.0853,
      lng: 34.7818,
      name: 'Tel Aviv',
      region: 'Middle East',
      country: 'Israel'
    },
    category: 'win',
    title: 'State of Israel Established',
    synopsis: 'David Ben-Gurion declared the establishment of the State of Israel, marking the return of Jewish sovereignty after 2,000 years of exile.',
    severity_impact: 10,
    population_before: 650000,
    population_after: 650000,
    sources: [{
      title: 'Israel Declaration of Independence',
      url: 'https://www.knesset.gov.il/docs/eng/megilat_eng.htm',
      type: 'primary'
    }],
    verified: true
  },
  
  // Contemporary Period
  {
    epoch: 'Contemporary',
    start_date: '1967-06-05',
    end_date: '1967-06-10',
    location: {
      lat: 31.7683,
      lng: 35.2137,
      name: 'Jerusalem',
      region: 'Middle East',
      country: 'Israel'
    },
    category: 'win',
    title: 'Six-Day War - Jerusalem Reunified',
    synopsis: 'Israel defeated surrounding Arab nations and reunified Jerusalem, gaining access to the Western Wall for the first time since 1948.',
    severity_impact: 9,
    sources: [{
      title: 'Israel Ministry of Foreign Affairs',
      url: 'https://mfa.gov.il',
      type: 'official'
    }],
    verified: true
  },
  {
    epoch: 'Contemporary',
    start_date: '1991-01-01',
    end_date: '1991-12-31',
    location: {
      lat: 31.0461,
      lng: 34.8516,
      name: 'Israel',
      region: 'Middle East',
      country: 'Israel'
    },
    category: 'win',
    title: 'Operation Solomon',
    synopsis: 'Israel airlifted 14,325 Ethiopian Jews to Israel in 36 hours, completing the rescue of the ancient Beta Israel community.',
    severity_impact: 8,
    population_before: 0,
    population_after: 14325,
    sources: [{
      title: 'Jewish Virtual Library',
      url: 'https://www.jewishvirtuallibrary.org/operation-solomon',
      type: 'secondary'
    }],
    verified: true
  }
]

async function seedDatabase() {
  console.log('Starting database seeding...')
  
  try {
    // Insert events
    const { data, error } = await supabase
      .from('timeline_events')
      .insert(initialEvents)
      .select()

    if (error) {
      console.error('Error seeding events:', error)
      return
    }

    console.log(`Successfully seeded ${data.length} events`)

    // Add some population snapshots
    const populationData = [
      { year: 1, region: 'Judea', country: 'Roman Empire', population: 2500000 },
      { year: 1000, region: 'Global', population: 1500000 },
      { year: 1500, region: 'Global', population: 1000000 },
      { year: 1800, region: 'Global', population: 2500000 },
      { year: 1900, region: 'Global', population: 10600000 },
      { year: 1939, region: 'Global', population: 16600000 },
      { year: 1945, region: 'Global', population: 11000000 },
      { year: 1970, region: 'Global', population: 12630000 },
      { year: 2000, region: 'Global', population: 13200000 },
      { year: 2025, region: 'Global', population: 15700000 },
    ]

    const { error: popError } = await supabase
      .from('population_snapshots')
      .insert(populationData)

    if (popError) {
      console.error('Error seeding population data:', popError)
      return
    }

    console.log('Successfully seeded population snapshots')
    console.log('Database seeding completed!')

  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

// Run if called directly
seedDatabase().then(() => {
  process.exit(0)
}).catch((err) => {
  console.error('Failed to seed database:', err)
  process.exit(1)
})

export { seedDatabase }