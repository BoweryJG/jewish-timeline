import { useEffect } from 'react'
import { supabase } from './lib/supabase'
import { useStore } from './store/useStore'
import { useDeviceOrientation } from './hooks/useDeviceOrientation'
import { getDeviceInfo } from './utils/deviceDetection'
import Experience from './components/Experience/Experience'
import OrientationPrompt from './components/UI/OrientationPrompt'
import Timeline from './components/Timeline'
import EpicLoader from './components/UI/EpicLoader'
import { ErrorBoundary } from './components/ErrorBoundary'

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

  useEffect(() => {
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
  }, [isLandscape, isPortrait, deviceInfo.isMobile, deviceInfo.gpuTier])

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
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <EpicLoader />
  }

  // For desktop, use the original timeline
  if (!deviceInfo.isMobile) {
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
          <Timeline events={events} />
        </main>
      </div>
    )
  }

  // For mobile, use the new experience
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <OrientationPrompt />
      <Experience />
    </div>
  )
}

export default App