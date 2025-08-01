import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import { useStore } from './store/useStore'
import Experience from './components/Experience/Experience'
import EpicLoader from './components/UI/EpicLoader'
import CinematicIntro from './components/CinematicIntro'
import DebugPanel from './components/UI/DebugPanel'
// import { mockEvents } from './data/mockEvents'

function App() {
  console.log('🚀 App component loading...');
  
  const { 
    setEvents, 
    isLoading, 
    setIsLoading
  } = useStore()
  
  // Enable cinematic intro
  const [showIntro, setShowIntro] = useState(true)
  const [introCompleted, setIntroCompleted] = useState(false)
  
  console.log('📱 App state:', { isLoading, showIntro, introCompleted });

  useEffect(() => {
    // Check if intro should be skipped via URL parameter or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const skipIntroParam = urlParams.get('skipIntro') === 'true';
    const skipIntroStorage = localStorage.getItem('skipIntro') === 'true';
    
    if (skipIntroParam || skipIntroStorage) {
      setShowIntro(false);
      setIntroCompleted(true);
      console.log('Skipping intro animation');
    }
    
    fetchEvents()
  }, [])

  async function fetchEvents() {
    console.log('🔍 Starting to fetch events...');
    console.log('🔑 Supabase key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
    
    try {
      const { data, error } = await supabase
        .from('timeline_events')
        .select('*')
        .order('start_date', { ascending: true })

      console.log('📊 Supabase response:', { data, error });
      
      if (error) {
        console.error('❌ Supabase error:', error);
        throw error;
      }
      
      console.log(`✅ Loaded ${data?.length || 0} events`);
      console.log('📋 First few events:', data?.slice(0, 3));
      
      setEvents(data || [])
    } catch (error) {
      console.error('💥 Error fetching events:', error)
      // TODO: Show error UI to user
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    console.log('🔄 Still loading, showing EpicLoader');
    return <EpicLoader />
  }

  // Show intro if not completed
  if (showIntro && !introCompleted) {
    try {
      return (
        <>
          <CinematicIntro 
            onComplete={() => {
              setShowIntro(false);
              setIntroCompleted(true);
            }} 
          />
          <DebugPanel />
        </>
      );
    } catch (error) {
      console.error('Error in intro:', error);
      // Skip intro on error
      setShowIntro(false);
      setIntroCompleted(true);
    }
  }

  // One unified experience for all devices
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <Experience />
      <DebugPanel />
    </div>
  )
}

export default App
