import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { audioManager } from '../../utils/audioManager';
import EventDetailOverlay from '../UI/EventDetailOverlay';

export default function ImageTimeline() {
  const { events, selectedEvent, setSelectedEvent } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Auto-advance timer
  useEffect(() => {
    if (selectedEvent) return; // Pause auto-advance when event is selected
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 8000); // 8 seconds per image
    
    return () => clearInterval(timer);
  }, [events.length, selectedEvent]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % events.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [events.length]);

  const currentEvent = events[currentIndex];
  
  // Parallax transforms for depth
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'win': return 'from-green-900/20 via-transparent to-transparent';
      case 'attack': return 'from-red-900/20 via-transparent to-transparent';
      case 'struggle': return 'from-orange-900/20 via-transparent to-transparent';
      case 'population': return 'from-blue-900/20 via-transparent to-transparent';
      default: return 'from-gray-900/20 via-transparent to-transparent';
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {currentEvent && (
          <motion.div
            key={currentEvent.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            {/* Background image with Ken Burns effect */}
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: [1, 1.15, 1.1],
                x: [0, -30, 20],
                y: [0, -20, 10]
              }}
              transition={{
                duration: 8,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            >
              <img
                src={currentEvent.media_urls?.[0] || `/images/events/${currentEvent.title.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                alt={currentEvent.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/events/abraham-covenant.jpg'; // Fallback
                }}
              />
            </motion.div>

            {/* Gradient overlays for depth and focus */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryGradient(currentEvent.category)}`} />
            
            {/* Negative space with content */}
            <div className="absolute inset-0 flex items-end justify-start p-8 md:p-16 lg:p-24">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="max-w-2xl space-y-6"
              >
                {/* Era indicator */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-4"
                >
                  <div className="h-px bg-royal-gold flex-1 max-w-[100px]" />
                  <span className="text-royal-gold text-sm font-light tracking-widest uppercase">
                    {currentEvent.epoch}
                  </span>
                </motion.div>

                {/* Year */}
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-6xl md:text-8xl font-thin text-white/80"
                >
                  {new Date(currentEvent.start_date).getFullYear() > 0 
                    ? new Date(currentEvent.start_date).getFullYear()
                    : `${Math.abs(new Date(currentEvent.start_date).getFullYear())} BCE`
                  }
                </motion.h3>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="text-4xl md:text-6xl font-bold text-white leading-tight"
                >
                  {currentEvent.title}
                </motion.h1>

                {/* Synopsis */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="text-lg md:text-xl text-white/70 leading-relaxed"
                >
                  {currentEvent.synopsis}
                </motion.p>

                {/* Action button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  onClick={() => {
                    setSelectedEvent(currentEvent);
                    audioManager.playClick();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm
                           border border-white/20 rounded-full text-white hover:bg-white/20
                           transition-all duration-300 group"
                >
                  <span>Explore Details</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </motion.div>
            </div>

            {/* Timeline progress indicator */}
            <div className="absolute bottom-8 right-8 md:right-16 lg:right-24">
              <div className="flex items-center gap-2">
                {events.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1 transition-all duration-300 ${
                      index === currentIndex 
                        ? 'w-12 bg-royal-gold' 
                        : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Navigation hints */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8">
              <button
                onClick={() => setCurrentIndex((prev) => (prev - 1 + events.length) % events.length)}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8">
              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % events.length)}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating particles for atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-royal-gold/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <EventDetailOverlay />
    </div>
  );
}