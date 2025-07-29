import { useEffect, useState } from 'react'
import { supabase, type TimelineEvent } from './lib/supabase'
import Timeline from './components/Timeline'

function App() {
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    try {
      const { data, error } = await supabase
        .from('timeline_events')
        .select('*')
        .order('start_date', { ascending: true })

      if (error) throw error
      setEvents(data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-royal-gold/20">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-royal-gold">
            The Jewish Timeline: An Iconic Visual Odyssey
          </h1>
          <p className="text-gray-300 mt-1">
            A journey through 3,500 years of Jewish history
          </p>
        </div>
      </header>
      
      <main className="pt-24">
        {loading ? (
          <div className="flex items-center justify-center min-h-[80vh]">
            <div className="text-royal-gold text-xl">Loading timeline...</div>
          </div>
        ) : (
          <Timeline events={events} />
        )}
      </main>
    </div>
  )
}

export default App