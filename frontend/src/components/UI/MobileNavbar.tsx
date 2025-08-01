import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX, Info, Home } from 'lucide-react';
import { audioManager } from '../../utils/audioManager';
import { useStore } from '../../store/useStore';

interface MobileNavbarProps {
  scrollProgress?: number;
  onMenuClick?: () => void;
}

export default function MobileNavbar({ scrollProgress = 0, onMenuClick }: MobileNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { events, audioEnabled, setAudioEnabled } = useStore();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleAudio = () => {
    const newState = audioManager.toggle();
    setAudioEnabled(newState);
    // Don't play click sound when toggling audio off
    if (newState) {
      audioManager.playClick();
    }
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    audioManager.playClick();
  };
  
  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-black/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-800">
          <motion.div 
            className="h-full bg-gradient-to-r from-royal-gold to-yellow-400"
            style={{ 
              width: `${scrollProgress * 100}%`,
              boxShadow: '0 0 10px rgba(255,215,0,0.8)'
            }}
          />
        </div>
        
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo/Title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-2"
            >
              {/* Star of David Icon */}
              <svg 
                className="w-6 h-6 text-royal-gold" 
                viewBox="0 0 24 24" 
                fill="none"
              >
                <path 
                  d="M12 2L15 8L22 8L17 12L19 19L12 15L5 19L7 12L2 8L9 8L12 2Z" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  transform="rotate(30 12 12)"
                />
                <path 
                  d="M12 2L15 8L22 8L17 12L19 19L12 15L5 19L7 12L2 8L9 8L12 2Z" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  transform="rotate(-30 12 12)"
                />
              </svg>
              
              <div>
                <h1 className="text-lg font-bold text-white leading-tight">
                  Jewish Timeline
                </h1>
                {events.length > 0 && (
                  <p className="text-xs text-gray-400">
                    {events.length} moments in history
                  </p>
                )}
              </div>
            </motion.div>
            
            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-2"
            >
              {/* Audio Toggle */}
              <button
                onClick={toggleAudio}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                aria-label={audioEnabled ? 'Mute audio' : 'Unmute audio'}
              >
                {audioEnabled ? (
                  <Volume2 className="w-5 h-5 text-white" />
                ) : (
                  <VolumeX className="w-5 h-5 text-white" />
                )}
              </button>
              
              {/* Menu Button */}
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Menu"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </motion.nav>
      
      {/* Slide-out Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-black/95 backdrop-blur-lg z-40
                         border-l border-royal-gold/20 shadow-2xl"
            >
              <div className="p-6">
                {/* Menu Header */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-royal-gold">Menu</h2>
                  <button
                    onClick={toggleMenu}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
                
                {/* Menu Items */}
                <nav className="space-y-4">
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      toggleMenu();
                    }}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg
                             hover:bg-white/10 transition-colors text-left"
                  >
                    <Home className="w-5 h-5 text-royal-gold" />
                    <span className="text-white">Timeline Start</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      if (onMenuClick) onMenuClick();
                      toggleMenu();
                    }}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg
                             hover:bg-white/10 transition-colors text-left"
                  >
                    <Info className="w-5 h-5 text-royal-gold" />
                    <span className="text-white">About</span>
                  </button>
                </nav>
                
                {/* Timeline Stats */}
                <div className="mt-8 p-4 bg-white/5 rounded-lg">
                  <h3 className="text-sm font-semibold text-royal-gold mb-3">Timeline Stats</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Events</span>
                      <span className="text-white">{events.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Time Span</span>
                      <span className="text-white">4,000 years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">{Math.round(scrollProgress * 100)}%</span>
                    </div>
                  </div>
                </div>
                
                {/* Audio Status */}
                <div className="mt-4 p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Audio</span>
                    <button
                      onClick={toggleAudio}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        audioEnabled 
                          ? 'bg-royal-gold/20 text-royal-gold' 
                          : 'bg-gray-700 text-gray-400'
                      }`}
                    >
                      {audioEnabled ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}