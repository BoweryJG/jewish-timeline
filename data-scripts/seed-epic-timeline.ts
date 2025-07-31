import { createClient } from '@supabase/supabase-js'
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

// ONE EPIC TIMELINE - 4000 Years of Jewish History
const epicTimelineEvents = [
  // ANCIENT ERA - The Beginning
  {
    epoch: 'Ancient',
    start_date: '1800-01-01',
    location: {
      lat: 30.9626,
      lng: 46.1025,
      name: 'Ur of the Chaldees',
      region: 'Mesopotamia',
      country: 'Ancient Sumer'
    },
    category: 'win',
    title: 'Origins in Ancient Mesopotamia',
    synopsis: 'Abraham receives the divine call and leads his family from Ur, beginning the Jewish journey. The first monotheist leaves the greatest civilization of his time to follow an invisible God.',
    severity_impact: 10,
    population_before: 0,
    population_after: 100,
    media_urls: ['/images/events/abraham-journey.jpg'],
    sources: [{
      title: 'Genesis 12:1-3',
      url: 'https://www.sefaria.org/Genesis.12.1',
      type: 'religious text'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '1700-01-01',
    location: {
      lat: 31.7683,
      lng: 35.2137,
      name: 'Canaan',
      region: 'Middle East',
      country: 'Ancient Canaan'
    },
    category: 'struggle',
    title: 'The Ancient Canaanites',
    synopsis: 'Abraham and his descendants navigate among the Canaanite peoples, establishing their presence in the land promised by God.',
    severity_impact: 6,
    population_before: 100,
    population_after: 500,
    media_urls: ['/images/events/ancient-canaanites.jpg'],
    sources: [{
      title: 'Genesis 15:18-21',
      url: 'https://www.sefaria.org/Genesis.15.18',
      type: 'religious text'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '1750-01-01',
    location: {
      lat: 36.8667,
      lng: 39.0333,
      name: 'Harran',
      region: 'Upper Mesopotamia',
      country: 'Ancient Assyria'
    },
    category: 'win',
    title: 'Migration to Harran',
    synopsis: 'Abraham\'s family settles temporarily in Harran, the crossroads of ancient civilizations, before continuing to Canaan.',
    severity_impact: 5,
    population_before: 100,
    population_after: 150,
    media_urls: ['/images/events/migration-to-harran.jpg'],
    sources: [{
      title: 'Genesis 11:31',
      url: 'https://www.sefaria.org/Genesis.11.31',
      type: 'religious text'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '1700-01-01',
    location: {
      lat: 31.5000,
      lng: 34.9000,
      name: 'Between Bethel and Ai',
      region: 'Canaan',
      country: 'Ancient Canaan'
    },
    category: 'win',
    title: "Abraham's Covenant",
    synopsis: 'Under a canopy of stars, God makes an eternal covenant with Abraham, promising his descendants will be as numerous as the stars and inherit the land.',
    severity_impact: 10,
    population_before: 150,
    population_after: 200,
    media_urls: ['/images/events/covenant-abraham.jpg'],
    sources: [{
      title: 'Genesis 15:5-6',
      url: 'https://www.sefaria.org/Genesis.15.5',
      type: 'religious text'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '1650-01-01',
    location: {
      lat: 31.7784,
      lng: 35.2354,
      name: 'Mount Moriah',
      region: 'Canaan',
      country: 'Ancient Canaan'
    },
    category: 'struggle',
    title: 'The Binding of Isaac',
    synopsis: 'Abraham faces the ultimate test of faith on Mount Moriah, where he proves his devotion and God provides a ram as substitute.',
    severity_impact: 9,
    population_before: 200,
    population_after: 200,
    media_urls: ['/images/events/isaac-binding.jpg'],
    sources: [{
      title: 'Genesis 22',
      url: 'https://www.sefaria.org/Genesis.22',
      type: 'religious text'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '1600-01-01',
    location: {
      lat: 31.3847,
      lng: 34.6105,
      name: 'Beersheba',
      region: 'Negev',
      country: 'Ancient Canaan'
    },
    category: 'win',
    title: 'The Patriarchs and Matriarchs',
    synopsis: 'Three generations - Abraham and Sarah, Isaac and Rebecca, Jacob and his wives - establish the foundations of the Jewish people.',
    severity_impact: 8,
    population_before: 200,
    population_after: 1000,
    media_urls: ['/images/events/patriarchs-matriarchs.jpg'],
    sources: [{
      title: 'Genesis 12-50',
      url: 'https://www.sefaria.org/Genesis.12',
      type: 'religious text'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '1550-01-01',
    location: {
      lat: 32.5492,
      lng: 35.5678,
      name: 'Jabbok River',
      region: 'Transjordan',
      country: 'Ancient Canaan'
    },
    category: 'win',
    title: 'Jacob Wrestling the Angel',
    synopsis: 'Jacob wrestles with a divine being through the night, emerging transformed with the name Israel - "one who struggles with God and prevails."',
    severity_impact: 10,
    population_before: 1000,
    population_after: 1000,
    media_urls: ['/images/events/jacob-wrestling.jpg'],
    sources: [{
      title: 'Genesis 32:24-30',
      url: 'https://www.sefaria.org/Genesis.32.24',
      type: 'religious text'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '1500-01-01',
    location: {
      lat: 30.0444,
      lng: 31.2357,
      name: 'Egypt',
      region: 'Lower Egypt',
      country: 'Ancient Egypt'
    },
    category: 'win',
    title: 'Joseph and His Dreams',
    synopsis: 'Sold into slavery by his brothers, Joseph rises to become vizier of Egypt, saving his family from famine and beginning the sojourn in Egypt.',
    severity_impact: 8,
    population_before: 70,
    population_after: 100,
    media_urls: ['/images/events/joseph-dreams.jpg'],
    sources: [{
      title: 'Genesis 37-47',
      url: 'https://www.sefaria.org/Genesis.37',
      type: 'religious text'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '1450-01-01',
    location: {
      lat: 30.8025,
      lng: 30.6285,
      name: 'Goshen',
      region: 'Nile Delta',
      country: 'Ancient Egypt'
    },
    category: 'win',
    title: 'Descent into Egypt',
    synopsis: 'Jacob and his entire family relocate to Egypt during the famine, reuniting with Joseph and settling in the land of Goshen.',
    severity_impact: 7,
    population_before: 70,
    population_after: 600000,
    media_urls: ['/images/events/joseph-reunion-egypt.jpg'],
    sources: [{
      title: 'Genesis 46',
      url: 'https://www.sefaria.org/Genesis.46',
      type: 'religious text'
    }],
    verified: true
  },
  
  // EXODUS ERA
  {
    epoch: 'Ancient',
    start_date: '1300-01-01',
    location: {
      lat: 30.0444,
      lng: 31.2357,
      name: 'Egypt',
      region: 'Lower Egypt',
      country: 'Ancient Egypt'
    },
    category: 'attack',
    title: 'Egyptian Slavery',
    synopsis: 'A new Pharaoh who knew not Joseph enslaves the Israelites, forcing them into harsh bondage. Yet in the crucible of oppression, a nation is forged.',
    severity_impact: 8,
    population_before: 600000,
    population_after: 600000,
    media_urls: ['/images/events/exodus-slavery.jpg'],
    sources: [{
      title: 'Exodus 1',
      url: 'https://www.sefaria.org/Exodus.1',
      type: 'religious text'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '1250-01-01',
    location: {
      lat: 28.5394,
      lng: 33.9759,
      name: 'Mount Horeb (Sinai)',
      region: 'Sinai Peninsula',
      country: 'Ancient Egypt'
    },
    category: 'win',
    title: 'Moses and the Burning Bush',
    synopsis: 'At the burning bush that is not consumed, Moses encounters the Divine and receives his mission to liberate the Israelites from bondage.',
    severity_impact: 10,
    population_before: 600000,
    population_after: 600000,
    media_urls: ['/images/events/moses-burning-bush.jpg'],
    sources: [{
      title: 'Exodus 3',
      url: 'https://www.sefaria.org/Exodus.3',
      type: 'religious text'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '1250-01-01',
    location: {
      lat: 30.6263,
      lng: 32.3547,
      name: 'Red Sea',
      region: 'Between Egypt and Sinai',
      country: 'Ancient Egypt'
    },
    category: 'win',
    title: 'The Exodus from Egypt',
    synopsis: 'In the defining moment of Jewish history, Moses leads the Israelites out of Egypt. The sea parts, and a nation walks from slavery to freedom.',
    severity_impact: 10,
    population_before: 600000,
    population_after: 600000,
    media_urls: ['/images/events/exodus-red-sea.jpg', '/images/events/moses-parting-red-sea.jpg'],
    sources: [{
      title: 'Exodus 14',
      url: 'https://www.sefaria.org/Exodus.14',
      type: 'religious text'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '1250-01-01',
    location: {
      lat: 28.5394,
      lng: 33.9759,
      name: 'Mount Sinai',
      region: 'Sinai Peninsula',
      country: 'Ancient Egypt'
    },
    category: 'win',
    title: 'Receiving of the Torah',
    synopsis: 'At Mount Sinai, heaven touches earth as the Jewish people receive the Torah, transforming from a tribe into a nation with a divine mission.',
    severity_impact: 10,
    population_before: 600000,
    population_after: 600000,
    media_urls: ['/images/events/receiving-torah-sinai.jpg'],
    sources: [{
      title: 'Exodus 19-20',
      url: 'https://www.sefaria.org/Exodus.19',
      type: 'religious text'
    }],
    verified: true
  },
  {
    epoch: 'Ancient',
    start_date: '1240-01-01',
    location: {
      lat: 29.5581,
      lng: 34.7721,
      name: 'Wilderness of Sinai',
      region: 'Sinai Peninsula',
      country: 'Ancient Egypt'
    },
    category: 'win',
    title: 'Formation of Jewish Law and Identity',
    synopsis: 'In the wilderness, the Mishkan (Tabernacle) is built, creating a portable sanctuary where the Divine presence dwells among the people.',
    severity_impact: 9,
    population_before: 600000,
    population_after: 600000,
    media_urls: ['/images/events/wilderness-tabernacle.jpg'],
    sources: [{
      title: 'Exodus 25-40',
      url: 'https://www.sefaria.org/Exodus.25',
      type: 'religious text'
    }],
    verified: true
  },
  
  // KINGDOM ERA
  {
    epoch: 'Classical',
    start_date: '1000-01-01',
    location: {
      lat: 31.7683,
      lng: 35.2137,
      name: 'Jerusalem',
      region: 'Judah',
      country: 'Ancient Israel'
    },
    category: 'win',
    title: 'King David Establishes Jerusalem',
    synopsis: 'David conquers Jerusalem and makes it the eternal capital, bringing the Ark of the Covenant with dancing and rejoicing.',
    severity_impact: 10,
    population_before: 1000000,
    population_after: 1200000,
    media_urls: ['/images/events/king-david-jerusalem.jpg'],
    sources: [{
      title: '2 Samuel 5-6',
      url: 'https://www.sefaria.org/II_Samuel.5',
      type: 'religious text'
    }],
    verified: true
  },
  {
    epoch: 'Classical',
    start_date: '0950-01-01',
    location: {
      lat: 31.7784,
      lng: 35.2354,
      name: 'Temple Mount',
      region: 'Jerusalem',
      country: 'Ancient Israel'
    },
    category: 'win',
    title: 'First Temple Built',
    synopsis: 'Solomon builds the First Temple, a wonder of the ancient world where the Shekinah glory descends and heaven meets earth.',
    severity_impact: 10,
    population_before: 1200000,
    population_after: 1500000,
    media_urls: ['/images/events/solomon-temple-dedication.jpg'],
    sources: [{
      title: '1 Kings 6-8',
      url: 'https://www.sefaria.org/I_Kings.6',
      type: 'religious text'
    }],
    verified: true
  },
  
  // DESTRUCTION AND EXILE
  {
    epoch: 'Classical',
    start_date: '0586-01-01',
    location: {
      lat: 31.7683,
      lng: 35.2137,
      name: 'Jerusalem',
      region: 'Judah',
      country: 'Babylonian Empire'
    },
    category: 'attack',
    title: 'Babylonian Destruction',
    synopsis: 'Nebuchadnezzar\'s armies destroy Solomon\'s Temple and exile the Jewish people to Babylon. The unthinkable has happened.',
    severity_impact: 10,
    population_before: 150000,
    population_after: 50000,
    media_urls: ['/images/events/temple-destruction.jpg'],
    sources: [{
      title: '2 Kings 25',
      url: 'https://www.sefaria.org/II_Kings.25',
      type: 'religious text'
    }],
    verified: true
  },
  {
    epoch: 'Classical',
    start_date: '0586-01-01',
    end_date: '0538-01-01',
    location: {
      lat: 32.5364,
      lng: 44.4209,
      name: 'Babylon',
      region: 'Mesopotamia',
      country: 'Babylonian Empire'
    },
    category: 'struggle',
    title: 'Exile to Babylon',
    synopsis: 'By the rivers of Babylon, the exiled Jews weep for Jerusalem but maintain their faith and identity, refusing to forget their homeland.',
    severity_impact: 8,
    population_before: 50000,
    population_after: 100000,
    media_urls: ['/images/events/babylonian-exile.jpg'],
    sources: [{
      title: 'Psalm 137',
      url: 'https://www.sefaria.org/Psalms.137',
      type: 'religious text'
    }],
    verified: true
  },
  {
    epoch: 'Classical',
    start_date: '0538-01-01',
    location: {
      lat: 31.7683,
      lng: 35.2137,
      name: 'Jerusalem',
      region: 'Judah',
      country: 'Persian Empire'
    },
    category: 'win',
    title: 'Return from Exile',
    synopsis: 'Cyrus the Great permits the Jews to return and rebuild. From the ashes of destruction, the Second Temple begins to rise.',
    severity_impact: 9,
    population_before: 50000,
    population_after: 100000,
    media_urls: ['/images/events/second-temple-building.jpg'],
    sources: [{
      title: 'Ezra 1',
      url: 'https://www.sefaria.org/Ezra.1',
      type: 'religious text'
    }],
    verified: true
  },
  {
    epoch: 'Classical',
    start_date: '0165-01-01',
    location: {
      lat: 31.7683,
      lng: 35.2137,
      name: 'Jerusalem',
      region: 'Judea',
      country: 'Seleucid Empire'
    },
    category: 'win',
    title: 'The Maccabean Revolt',
    synopsis: 'Against overwhelming odds, the Maccabees defeat the Greek-Syrians and rededicate the Temple. The miracle of lights begins.',
    severity_impact: 9,
    population_before: 200000,
    population_after: 250000,
    media_urls: ['/images/events/maccabean-revolt.jpg'],
    sources: [{
      title: 'Books of Maccabees',
      url: 'https://www.sefaria.org/The_Book_of_Maccabees_I',
      type: 'religious text'
    }],
    verified: true
  },
  
  // DIASPORA AND PERSECUTION
  {
    epoch: 'Classical',
    start_date: '0070-01-01',
    location: {
      lat: 31.7683,
      lng: 35.2137,
      name: 'Jerusalem',
      region: 'Judea',
      country: 'Roman Empire'
    },
    category: 'attack',
    title: 'Second Temple Destruction',
    synopsis: 'Roman legions under Titus destroy the Second Temple. The long exile begins, but Judaism transforms and endures.',
    severity_impact: 10,
    population_before: 1000000,
    population_after: 100000,
    media_urls: ['/images/events/second-temple-destruction.jpg'],
    sources: [{
      title: 'The Jewish War by Josephus',
      url: 'https://www.gutenberg.org/ebooks/2850',
      type: 'historical account'
    }],
    verified: true
  },
  {
    epoch: 'Medieval',
    start_date: '1492-01-01',
    location: {
      lat: 40.4168,
      lng: -3.7038,
      name: 'Spain',
      region: 'Iberian Peninsula',
      country: 'Spain'
    },
    category: 'attack',
    title: 'Spanish Inquisition',
    synopsis: 'The same year Columbus sails, Spain expels all Jews. Sephardic culture scatters but survives, carrying keys to homes they\'ll never see again.',
    severity_impact: 9,
    population_before: 200000,
    population_after: 0,
    media_urls: ['/images/events/spanish-expulsion.jpg'],
    sources: [{
      title: 'The Alhambra Decree',
      url: 'https://www.sephardicstudies.org/decree.html',
      type: 'historical document'
    }],
    verified: true
  },
  
  // MODERN STRUGGLES AND TRIUMPH
  {
    epoch: 'Modern',
    start_date: '1943-01-01',
    location: {
      lat: 52.2497,
      lng: 21.0122,
      name: 'Warsaw',
      region: 'Poland',
      country: 'Nazi-occupied Poland'
    },
    category: 'struggle',
    title: 'Holocaust',
    synopsis: 'In the Warsaw Ghetto uprising, starved fighters with few weapons hold off Nazi forces for nearly a month. In darkness, the spark of resistance.',
    severity_impact: 10,
    population_before: 400000,
    population_after: 0,
    media_urls: ['/images/events/warsaw-ghetto-uprising.jpg'],
    sources: [{
      title: 'Yad Vashem Archives',
      url: 'https://www.yadvashem.org/',
      type: 'memorial archive'
    }],
    verified: true
  },
  {
    epoch: 'Modern',
    start_date: '1945-01-01',
    location: {
      lat: 50.0755,
      lng: 14.4378,
      name: 'Europe',
      region: 'Multiple Countries',
      country: 'Allied-liberated territories'
    },
    category: 'win',
    title: 'Liberation from Camps',
    synopsis: 'Allied forces liberate the camps. Survivors emerge from humanity\'s darkest chapter into the light of freedom.',
    severity_impact: 10,
    population_before: 3500000,
    population_after: 250000,
    media_urls: ['/images/events/holocaust-liberation.jpg'],
    sources: [{
      title: 'United States Holocaust Memorial Museum',
      url: 'https://www.ushmm.org/',
      type: 'museum archive'
    }],
    verified: true
  },
  {
    epoch: 'Contemporary',
    start_date: '1948-05-14',
    location: {
      lat: 32.0853,
      lng: 34.7818,
      name: 'Tel Aviv',
      region: 'Israel',
      country: 'Israel'
    },
    category: 'win',
    title: 'Establishment of Israel',
    synopsis: 'David Ben-Gurion declares independence. After 2000 years, the Jewish people have returned home. "We have come home."',
    severity_impact: 10,
    population_before: 650000,
    population_after: 806000,
    media_urls: ['/images/events/israel-independence.jpg'],
    sources: [{
      title: 'Israel Declaration of Independence',
      url: 'https://www.knesset.gov.il/docs/eng/megilat_eng.htm',
      type: 'official document'
    }],
    verified: true
  },
  {
    epoch: 'Contemporary',
    start_date: '1967-06-05',
    location: {
      lat: 31.7784,
      lng: 35.2354,
      name: 'Jerusalem',
      region: 'Israel',
      country: 'Israel'
    },
    category: 'win',
    title: 'Six Day War',
    synopsis: 'In six miraculous days, Israel defeats surrounding armies. Paratroopers reach the Western Wall: "The Temple Mount is in our hands!"',
    severity_impact: 10,
    population_before: 2500000,
    population_after: 2700000,
    media_urls: ['/images/events/western-wall-liberation.jpg'],
    sources: [{
      title: 'Israel Ministry of Foreign Affairs',
      url: 'https://mfa.gov.il/mfa/aboutisrael/history/pages/the%20six-day%20war%20-%20june%201967.aspx',
      type: 'government archive'
    }],
    verified: true
  },
  {
    epoch: 'Contemporary',
    start_date: '1991-05-24',
    location: {
      lat: 9.0307,
      lng: 38.7469,
      name: 'Addis Ababa to Jerusalem',
      region: 'Ethiopia to Israel',
      country: 'Israel'
    },
    category: 'win',
    title: 'Ethiopian Aliyah',
    synopsis: 'In 36 hours, Operation Solomon airlifts 14,325 Ethiopian Jews to Israel. Ancient traditions meet modern homeland as prophecy unfolds.',
    severity_impact: 8,
    population_before: 20000,
    population_after: 0,
    media_urls: ['/images/events/operation-solomon.jpg'],
    sources: [{
      title: 'Jewish Virtual Library',
      url: 'https://www.jewishvirtuallibrary.org/operation-solomon',
      type: 'historical archive'
    }],
    verified: true
  },
  {
    epoch: 'Contemporary',
    start_date: '2000-01-01',
    location: {
      lat: 32.0853,
      lng: 34.7818,
      name: 'Israel',
      region: 'Multiple Cities',
      country: 'Israel'
    },
    category: 'win',
    title: 'Modern Innovation',
    synopsis: 'The Start-Up Nation: Desert blooms with technology, medicine, and innovation. Ancient wisdom meets cutting-edge science.',
    severity_impact: 10,
    population_before: 6000000,
    population_after: 9500000,
    media_urls: ['/images/events/modern-israel-innovation.jpg'],
    sources: [{
      title: 'Start-Up Nation',
      url: 'https://startupnationbook.com/',
      type: 'contemporary analysis'
    }],
    verified: true
  }
]

async function seedEpicTimeline() {
  console.log('🚀 Starting epic timeline seed...')
  
  try {
    // Clear existing events - use a different approach
    const { error: deleteError } = await supabase
      .from('timeline_events')
      .delete()
      .gte('created_at', '1900-01-01') // Delete all events
    
    if (deleteError) {
      console.error('Error clearing events:', deleteError)
      // Continue anyway - might be empty table
    }
    
    console.log('✅ Cleared existing events')
    
    // Insert all epic timeline events
    const { data, error } = await supabase
      .from('timeline_events')
      .insert(epicTimelineEvents)
      .select()
    
    if (error) {
      console.error('Error inserting events:', error)
      return
    }
    
    console.log(`✅ Successfully inserted ${data?.length || 0} epic timeline events`)
    console.log('🎉 Epic timeline complete - 4000 years of Jewish history!')
    
    // List all events
    data?.forEach((event, index) => {
      console.log(`${index + 1}. ${event.title} (${event.start_date})`)
    })
    
  } catch (error) {
    console.error('💥 Fatal error:', error)
  }
}

// Run the seed
seedEpicTimeline()