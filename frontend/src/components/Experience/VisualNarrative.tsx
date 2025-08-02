import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { audioManager } from '../../utils/audioManager';
import { useImagePreloader } from '../../hooks/useImagePreloader';
import { CrossDissolveTransition, RevealMaskTransition } from '../Effects/CinematicTransitions';
import EventDetailOverlay from '../UI/EventDetailOverlay';

export default function VisualNarrative() {
  const { events, selectedEvent, setSelectedEvent } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const currentEvent = events[currentIndex];
  
  // Extract all image URLs for preloading
  const imageUrls = useMemo(() => 
    events.map(event => 
      event.media_urls?.[0] || `/images/events/${event.title.toLowerCase().replace(/\s+/g, '-')}.jpg`
    ), [events]
  );
  
  const { currentImageLoaded, preloadAhead, getImageStyle } = useImagePreloader(imageUrls, {
    preloadNext: 3,
    fadeDuration: 1500
  });

  // Smooth scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const imageY = useTransform(smoothProgress, [0, 1], ['0%', '-20%']);
  const overlayOpacity = useTransform(smoothProgress, [0, 0.5], [0.3, 0.8]);
  
  // Auto-play narrative
  useEffect(() => {
    if (!isAutoPlaying || selectedEvent) return;
    
    const timer = setInterval(() => {
      setCurrentIndex(prev => {
        const next = (prev + 1) % events.length;
        preloadAhead(next);
        return next;
      });
    }, 12000); // 12 seconds for deeper engagement
    
    return () => clearInterval(timer);
  }, [isAutoPlaying, selectedEvent, events.length, preloadAhead]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowRight':
          navigateNext();
          break;
        case 'ArrowLeft':
          navigatePrev();
          break;
        case ' ':
          e.preventDefault();
          setIsAutoPlaying(prev => !prev);
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const navigateNext = () => {
    const next = (currentIndex + 1) % events.length;
    setCurrentIndex(next);
    preloadAhead(next);
    audioManager.playCategory('transition');
  };

  const navigatePrev = () => {
    const prev = (currentIndex - 1 + events.length) % events.length;
    setCurrentIndex(prev);
    preloadAhead(prev);
    audioManager.playCategory('transition');
  };

  const getEraGradient = (epoch: string) => {
    const gradients: Record<string, string> = {
      'Ancient': 'from-amber-900/20 via-transparent to-transparent',
      'Second Temple': 'from-purple-900/20 via-transparent to-transparent',
      'Diaspora': 'from-indigo-900/20 via-transparent to-transparent',
      'Medieval': 'from-emerald-900/20 via-transparent to-transparent',
      'Modern': 'from-blue-900/20 via-transparent to-transparent',
      'Contemporary': 'from-rose-900/20 via-transparent to-transparent',
    };
    return gradients[epoch] || 'from-gray-900/20 via-transparent to-transparent';
  };

  if (!currentEvent) return null;

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEvent.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
        >
          {/* Layered background with parallax */}
          <div className="absolute inset-0">
            {/* Far background - blurred previous image for depth */}
            {currentIndex > 0 && (
              <motion.div 
                className="absolute inset-0 scale-110"
                style={{ y: imageY, filter: 'blur(30px)', opacity: 0.3 }}
              >
                <img
                  src={imageUrls[currentIndex - 1]}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
            
            {/* Main image with cinematic crop */}
            <motion.div 
              className="absolute inset-0"
              style={{ y: imageY }}
            >
              <CrossDissolveTransition color={getCategoryColor(currentEvent.category)}>
                <img
                  src={imageUrls[currentIndex]}
                  alt={currentEvent.title}
                  className="w-full h-full object-cover"
                  style={getImageStyle(imageUrls[currentIndex])}
                />
              </CrossDissolveTransition>
            </motion.div>
          </div>

          {/* Dynamic gradient overlays */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
            style={{ opacity: overlayOpacity }}
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${getEraGradient(currentEvent.epoch)}`} />
          
          {/* Content with cinematic typography */}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full p-8 md:p-16 lg:p-24 pb-32">
              <motion.div className="max-w-4xl space-y-6">
                {/* Era badge */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-3"
                >
                  <div className="w-12 h-px bg-royal-gold" />
                  <span className="text-royal-gold text-sm font-light tracking-[0.3em] uppercase">
                    {currentEvent.epoch} Era
                  </span>
                </motion.div>

                {/* Date with dramatic styling */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-baseline gap-4"
                >
                  <h2 className="text-7xl md:text-9xl font-thin text-white/90 tracking-tighter">
                    {Math.abs(new Date(currentEvent.start_date).getFullYear())}
                  </h2>
                  {new Date(currentEvent.start_date).getFullYear() < 0 && (
                    <span className="text-2xl md:text-3xl text-white/60 font-light">BCE</span>
                  )}
                </motion.div>

                {/* Title with staggered animation */}
                <RevealMaskTransition direction="left">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9]">
                    {currentEvent.title}
                  </h1>
                </RevealMaskTransition>

                {/* Location if available */}
                {currentEvent.location && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="flex items-center gap-2 text-white/60"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{currentEvent.location.name}</span>
                  </motion.div>
                )}

                {/* Synopsis with fade */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-3xl font-light"
                >
                  {currentEvent.synopsis}
                </motion.p>

                {/* CTA */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  onClick={() => setSelectedEvent(currentEvent)}
                  className="group mt-8 inline-flex items-center gap-3 text-white"
                >
                  <span className="text-lg font-medium">Explore This Moment</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center
                             group-hover:bg-white/10 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Timeline navigation */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
            <div className="space-y-2">
              {events.map((event, index) => {
                const isCurrent = index === currentIndex;
                const isNear = Math.abs(index - currentIndex) <= 2;
                
                return (
                  <motion.button
                    key={event.id}
                    onClick={() => setCurrentIndex(index)}
                    className="block"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: isNear ? 1 : 0,
                      x: 0,
                      scale: isCurrent ? 1.2 : 1
                    }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className={`w-1 transition-all duration-500 ${
                      isCurrent ? 'h-12 bg-royal-gold' : 'h-6 bg-white/30'
                    }`} />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Playback controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
            <button
              onClick={navigatePrev}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              {isAutoPlaying ? (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
              )}
            </button>
            
            <button
              onClick={navigateNext}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <EventDetailOverlay />
    </div>
  );
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'win': return '#10b981';
    case 'attack': return '#ef4444';
    case 'struggle': return '#f97316';
    case 'population': return '#3b82f6';
    default: return '#6b7280';
  }
}