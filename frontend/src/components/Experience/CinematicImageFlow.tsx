import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { audioManager } from '../../utils/audioManager';
import EventDetailOverlay from '../UI/EventDetailOverlay';

interface TimelineLayer {
  depth: number;
  opacity: number;
  blur: number;
}

export default function CinematicImageFlow() {
  const { events, selectedEvent, setSelectedEvent } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Parallax transforms based on mouse movement
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const currentEvent = events[currentIndex];
  const nextEvent = events[(currentIndex + 1) % events.length];

  // Auto-advance with pause on hover
  useEffect(() => {
    if (selectedEvent || isTransitioning) return;
    
    const timer = setInterval(() => {
      handleNext();
    }, 10000); // 10 seconds per image for deeper engagement
    
    return () => clearInterval(timer);
  }, [currentIndex, selectedEvent, isTransitioning]);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Touch gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
      setIsTransitioning(false);
    }, 500);
    audioManager.playCategory('transition');
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
      setIsTransitioning(false);
    }, 500);
    audioManager.playCategory('transition');
  };

  const getCategoryAccent = (category: string) => {
    switch (category) {
      case 'win': return { color: '#10b981', glow: 'shadow-green-500/50' };
      case 'attack': return { color: '#ef4444', glow: 'shadow-red-500/50' };
      case 'struggle': return { color: '#f97316', glow: 'shadow-orange-500/50' };
      case 'population': return { color: '#3b82f6', glow: 'shadow-blue-500/50' };
      default: return { color: '#6b7280', glow: 'shadow-gray-500/50' };
    }
  };

  const layers: TimelineLayer[] = [
    { depth: -200, opacity: 0.3, blur: 20 }, // Far background
    { depth: -100, opacity: 0.5, blur: 10 }, // Mid background
    { depth: 0, opacity: 1, blur: 0 },       // Main layer
  ];

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Multi-layer parallax background */}
      <div className="absolute inset-0" style={{ perspective: '1000px' }}>
        <AnimatePresence>
          {currentEvent && layers.map((layer, layerIndex) => (
            <motion.div
              key={`${currentEvent.id}-layer-${layerIndex}`}
              className="absolute inset-0"
              initial={{ opacity: 0, z: layer.depth - 100 }}
              animate={{ 
                opacity: layer.opacity,
                z: layer.depth,
                rotateX: layerIndex === 0 ? rotateX.get() * 0.5 : 0,
                rotateY: layerIndex === 0 ? rotateY.get() * 0.5 : 0,
              }}
              exit={{ opacity: 0, z: layer.depth + 100 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{
                filter: `blur(${layer.blur}px)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <motion.img
                src={currentEvent.media_urls?.[0] || `/images/events/${currentEvent.title.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                alt={currentEvent.title}
                className="w-full h-full object-cover"
                animate={{
                  scale: layerIndex === 2 ? [1, 1.08] : [1.1, 1.2],
                }}
                transition={{
                  duration: 15,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Vignette and gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
      
      {/* Content with dramatic negative space */}
      <div className="absolute inset-0 flex items-center justify-between px-8 md:px-16 lg:px-32">
        {/* Left side - Main content */}
        <AnimatePresence mode="wait">
          {currentEvent && (
            <motion.div
              key={currentEvent.id}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-xl space-y-8 z-10"
            >
              {/* Category indicator with glow */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100px' }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex items-center gap-4"
              >
                <div 
                  className={`h-1 bg-gradient-to-r from-transparent ${getCategoryAccent(currentEvent.category).glow}`}
                  style={{ backgroundColor: getCategoryAccent(currentEvent.category).color }}
                />
                <span className="text-sm font-light tracking-[0.3em] uppercase text-white/60">
                  {currentEvent.category}
                </span>
              </motion.div>

              {/* Era and Year */}
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-royal-gold text-lg font-light tracking-widest mb-2"
                >
                  {currentEvent.epoch}
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-7xl md:text-9xl font-thin text-white/90 leading-none"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {new Date(currentEvent.start_date).getFullYear() > 0 
                    ? new Date(currentEvent.start_date).getFullYear()
                    : `${Math.abs(new Date(currentEvent.start_date).getFullYear())}`
                  }
                  {new Date(currentEvent.start_date).getFullYear() < 0 && (
                    <span className="text-3xl md:text-5xl ml-2 text-white/60">BCE</span>
                  )}
                </motion.h2>
              </div>

              {/* Title with dramatic typography */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight"
              >
                {currentEvent.title.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="inline-block mr-3"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Synopsis with fade-in */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-xl text-white/60 leading-relaxed font-light"
              >
                {currentEvent.synopsis}
              </motion.p>

              {/* CTA with hover effects */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <button
                  onClick={() => setSelectedEvent(currentEvent)}
                  className="group relative px-8 py-4 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3 text-white font-medium">
                    <span>Discover More</span>
                    <motion.svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-white/10 backdrop-blur-sm"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 border border-white/20" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right side - Timeline navigation */}
        <div className="hidden lg:flex flex-col items-end space-y-8 z-10">
          {/* Vertical timeline dots */}
          <div className="flex flex-col gap-3">
            {events.slice(Math.max(0, currentIndex - 2), currentIndex + 3).map((event, index) => {
              const globalIndex = Math.max(0, currentIndex - 2) + index;
              const isCurrent = globalIndex === currentIndex;
              
              return (
                <motion.button
                  key={event.id}
                  onClick={() => setCurrentIndex(globalIndex)}
                  className="group flex items-center gap-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div
                    className={`w-3 h-3 rounded-full ${
                      isCurrent ? 'bg-royal-gold' : 'bg-white/30'
                    }`}
                    animate={{ scale: isCurrent ? [1, 1.5, 1] : 1 }}
                    transition={{ duration: 2, repeat: isCurrent ? Infinity : 0 }}
                  />
                  <span className={`text-sm font-light transition-opacity ${
                    isCurrent ? 'text-white opacity-100' : 'text-white/50 opacity-0 group-hover:opacity-100'
                  }`}>
                    {new Date(event.start_date).getFullYear()}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Preview cards */}
          <div className="space-y-4">
            <motion.div
              className="w-48 p-4 bg-white/5 backdrop-blur-md rounded-lg cursor-pointer"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
              onClick={handleNext}
            >
              <p className="text-xs text-white/50 mb-1">Next</p>
              <p className="text-sm text-white font-medium truncate">{nextEvent?.title}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom navigation for mobile */}
      <div className="lg:hidden absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-10">
        <button
          onClick={handlePrev}
          className="p-3 bg-white/10 backdrop-blur-sm rounded-full"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="p-3 bg-white/10 backdrop-blur-sm rounded-full"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-royal-gold/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
            }}
            animate={{
              y: -100,
              x: `${Math.random() * 200 - 100}%`,
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 20,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <EventDetailOverlay />
    </div>
  );
}