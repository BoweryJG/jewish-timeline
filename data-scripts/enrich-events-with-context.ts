import { createClient } from '@supabase/supabase-js'
import type { TimelineEvent } from '../frontend/src/lib/supabase'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Load environment variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '..', '.env') })

const supabaseUrl = 'https://alkzliirqdofpygknsij.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseServiceKey) {
  throw new Error('SUPABASE_SERVICE_KEY is required in .env file')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Events that need more historical context
const eventsToEnrich = [
  {
    title: 'October 7th Hamas Massacre',
    additionalContext: {
      details: [
        'The attack began at 6:29 AM with a massive rocket barrage of over 5,000 rockets',
        'Hamas used paragliders, motorcycles, and boats to breach the border at multiple points',
        'The Nova music festival massacre alone claimed 364 lives',
        'Kibbutz Be\'eri lost 10% of its population in the attack',
        'The youngest victim was 9 months old, the oldest was 86',
        'It was the deadliest day for Jews since the Holocaust'
      ],
      aftermath: 'The attack triggered Operation Swords of Iron and a major war in Gaza',
      internationalResponse: 'World leaders condemned the attacks as terrorism and crimes against humanity'
    }
  },
  {
    title: 'The Holocaust - Shoah',
    additionalContext: {
      details: [
        'The genocide was carried out in stages: legal discrimination, ghettoization, mass shootings, and extermination camps',
        'Major killing sites included Auschwitz-Birkenau (1.1 million murdered), Treblinka (900,000), and Bełżec (600,000)',
        'The Einsatzgruppen mobile killing units murdered over 1 million Jews in Eastern Europe',
        'The Warsaw Ghetto Uprising in 1943 became a symbol of Jewish resistance',
        'Two-thirds of European Jewry was murdered, including 90% of Polish Jews',
        '1.5 million Jewish children were murdered'
      ],
      aftermath: 'Led to the Nuremberg Trials, the Genocide Convention, and accelerated the establishment of Israel',
      survivors: 'Only about 200,000 Jews survived the camps'
    }
  },
  {
    title: 'Spanish Expulsion - Alhambra Decree',
    additionalContext: {
      details: [
        'Jews were given 4 months to convert to Christianity or leave Spain',
        'Between 40,000-100,000 Jews converted, many continuing to practice Judaism in secret as "Conversos"',
        'Those who left scattered to Portugal, North Africa, the Ottoman Empire, and the Americas',
        'Many died during the exodus from disease, starvation, and violence',
        'The expulsion ended the Golden Age of Spanish Jewry',
        'Ladino (Judeo-Spanish) language and Sephardic traditions were preserved in exile'
      ],
      legacy: 'Spain did not formally revoke the Alhambra Decree until 1968',
      impact: 'Created the global Sephardic diaspora that exists today'
    }
  },
  {
    title: 'Bar Kokhba Revolt',
    additionalContext: {
      details: [
        'Rabbi Akiva proclaimed Bar Kokhba as the Messiah',
        'Jews initially recaptured Jerusalem and minted their own coins',
        'Romans brought 12 legions to crush the revolt',
        'The fortress of Betar fell after a brutal siege',
        'Emperor Hadrian renamed Judea to "Syria Palaestina" to erase Jewish connection',
        'Jews were banned from Jerusalem except on Tisha B\'Av',
        '580,000 Jews were killed according to Roman historian Cassius Dio'
      ],
      aftermath: 'Marked the beginning of the longest exile in Jewish history',
      archaeological: 'Bar Kokhba letters discovered in Cave of Letters confirm the revolt\'s scope'
    }
  },
  {
    title: 'Six-Day War - Jerusalem Reunified',
    additionalContext: {
      details: [
        'Israel destroyed 450 enemy aircraft in the first hours of the war',
        'Paratroopers entered the Old City through the Lions\' Gate',
        'Commander Motta Gur\'s words "The Temple Mount is in our hands" became iconic',
        'Israel captured the West Bank, Gaza, Sinai Peninsula, and Golan Heights',
        'The war tripled Israel\'s territory',
        'UN Resolution 242 called for "land for peace"'
      ],
      significance: 'First time in 2,000 years Jews controlled their holiest sites',
      impact: 'Sparked a spiritual awakening and massive aliyah from the Soviet Union'
    }
  }
]

// Function to enrich events with additional context
async function enrichEventsWithContext() {
  console.log('Starting to enrich events with additional context...')
  
  try {
    for (const enrichment of eventsToEnrich) {
      console.log(`Enriching event: ${enrichment.title}`)
      
      // Fetch the current event
      const { data: events, error: fetchError } = await supabase
        .from('timeline_events')
        .select('*')
        .eq('title', enrichment.title)
        .single()
      
      if (fetchError || !events) {
        console.error(`Could not find event: ${enrichment.title}`)
        continue
      }
      
      // Create enriched synopsis
      const enrichedSynopsis = `${events.synopsis}\n\nHistorical Details:\n${enrichment.additionalContext.details.map(d => `• ${d}`).join('\n')}`
      
      // Add aftermath if available
      const fullSynopsis = enrichment.additionalContext.aftermath 
        ? `${enrichedSynopsis}\n\nAftermath: ${enrichment.additionalContext.aftermath}`
        : enrichedSynopsis
      
      // Update the event
      const { error: updateError } = await supabase
        .from('timeline_events')
        .update({ 
          synopsis: fullSynopsis,
          // Could also add more sources here if we had them from searches
        })
        .eq('id', events.id)
      
      if (updateError) {
        console.error(`Error updating event ${enrichment.title}:`, updateError)
      } else {
        console.log(`Successfully enriched: ${enrichment.title}`)
      }
    }
    
    console.log('Enrichment completed!')
    
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

// Function that would use Brave Search MCP when available
async function enrichWithBraveSearch(eventTitle: string, mcp: any) {
  // This function would use Brave Search MCP when connected
  // Example of what it might look like:
  /*
  const searchQuery = `${eventTitle} Jewish history details facts`
  const searchResults = await mcp.braveSearch.search({
    query: searchQuery,
    count: 5
  })
  
  // Process search results and extract relevant information
  const additionalContext = processSearchResults(searchResults)
  return additionalContext
  */
  
  console.log('Brave Search MCP not currently connected')
  return null
}

// Run if called directly
if (import.meta.url === `file://${__filename}`) {
  enrichEventsWithContext().then(() => {
    process.exit(0)
  }).catch((err) => {
    console.error('Failed to enrich events:', err)
    process.exit(1)
  })
}

export { enrichEventsWithContext, enrichWithBraveSearch }
