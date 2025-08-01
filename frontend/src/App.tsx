import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import { useStore } from './store/useStore'
import { useDeviceOrientation } from './hooks/useDeviceOrientation'
import { getDeviceInfo } from './utils/deviceDetection'
import Experience from './components/Experience/Experience'
import OrientationPrompt from './components/UI/OrientationPrompt'
import EnhancedTimeline from './components/EnhancedTimeline'
import EpicLoader from './components/UI/EpicLoader'
import CinematicIntro from './components/CinematicIntro'
import DebugPanel from './components/UI/DebugPanel'
// import { mockEvents } from './data/mockEvents'

function App() {
  const { 
    events, 
    setEvents, 
    isLoading, 
    setIsLoading,
    setViewMode,
    setShowOrientationPrompt,
    setQuality
  } = useStore()
  
  const { isLandscape, isPortrait } = useDeviceOrientation()
  const deviceInfo = getDeviceInfo()
  const [showIntro, setShowIntro] = useState(true)
  const [introCompleted, setIntroCompleted] = useState(false)

  useEffect(() => {
    // Check if intro should be skipped
    const skipIntro = localStorage.getItem('skipIntro') === 'true';
    if (skipIntro) {
      setShowIntro(false);
      setIntroCompleted(true);
    }
    
    fetchEvents()
    
    // Set quality based on device
    if (deviceInfo.gpuTier === 'high') {
      setQuality('high')
    } else if (deviceInfo.gpuTier === 'medium') {
      setQuality('medium')
    } else {
      setQuality('low')
    }
    
    // Show orientation prompt for mobile devices in portrait
    if (deviceInfo.isMobile && isPortrait) {
      setShowOrientationPrompt(true)
    }
    
    // Auto-set view mode based on orientation
    if (isLandscape) {
      setViewMode('landscape')
    } else {
      setViewMode('portrait')
    }
    
    // Add/remove desktop body class
    if (!deviceInfo.isMobile) {
      document.body.classList.add('desktop-body')
      // Enable scrolling on root elements for desktop
      document.documentElement.style.overflow = 'auto'
      document.body.style.overflow = 'auto'
      document.body.style.position = 'relative'
      const rootElement = document.getElementById('root')
      if (rootElement) {
        rootElement.style.overflow = 'visible'
        rootElement.style.height = 'auto'
      }
    } else {
      document.body.classList.remove('desktop-body')
      // Keep mobile restrictions
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      const rootElement = document.getElementById('root')
      if (rootElement) {
        rootElement.style.overflow = 'hidden'
        rootElement.style.height = '100%'
      }
    }
    
    // Cleanup function
    return () => {
      document.body.classList.remove('desktop-body')
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.body.style.position = ''
      const rootElement = document.getElementById('root')
      if (rootElement) {
        rootElement.style.overflow = ''
        rootElement.style.height = ''
      }
    }
  }, [isLandscape, isPortrait, deviceInfo.isMobile, deviceInfo.gpuTier])

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
    return <EpicLoader />
  }

  // Show intro if not completed
  if (showIntro && !introCompleted) {
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
  }

  console.log('🔍 Device info:', deviceInfo);
  console.log('📱 Is mobile?', deviceInfo.isMobile);
  console.log('🏞️ Is landscape?', isLandscape);

  // For desktop, use the original timeline
  if (!deviceInfo.isMobile) {
    return (
      <div className="desktop-timeline-view min-h-screen bg-black">
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-royal-gold/20">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-3xl font-bold text-royal-gold">
              The Jewish Timeline: An Iconic Visual Odyssey
            </h1>
            <p className="text-gray-300 mt-1">
              From the ancient sands of Mesopotamia to the modern age - A 4,000-year saga of faith, resilience, and triumph
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Beginning in Ur of the Chaldees where Abraham first heard the divine call, through the forging of a nation at Sinai, 
              the glory of Jerusalem, the tears of exile, and the miraculous return - witness the eternal story of a people who refused to disappear
            </p>
          </div>
        </header>
        
        <main className="pt-24">
          <EnhancedTimeline events={events} />
        </main>
        <DebugPanel />
      </div>
    )
  }

  // For mobile, use the new experience
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <OrientationPrompt />
      <Experience />
      <DebugPanel />
    </div>
  )
}

export default App
