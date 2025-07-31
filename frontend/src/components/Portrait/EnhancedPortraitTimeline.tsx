import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useStore } from '../../store/useStore';
import EnhancedTimelineCard from './EnhancedTimelineCard';
import { audioManager } from '../../utils/audioManager';

export default function EnhancedPortraitTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { events } = useStore();
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Smooth spring animations for parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Multiple parallax layers
  const backgroundY = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const starsY = useTransform(smoothProgress, [0, 1], ['0%', '50%']);
  const cloudsY = useTransform(smoothProgress, [0, 1], ['0%', '30%']);
  const glowIntensity = useTransform(smoothProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  useEffect(() => {
    // Start ambient audio
    audioManager.startAmbient();
    
    return () => {
      audioManager.stopAmbient();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-y-auto h-screen bg-black">
      {/* Multi-layer animated background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Deep space layer */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black via-deep-indigo to-black"
          style={{ y: backgroundY }}
        />
        
        {/* Star field layer */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: starsY }}
        >
          <div className="stars" />
          {/* Animated stars */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </motion.div>
        
        {/* Nebula clouds layer */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{ y: cloudsY }}
        >
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20" />
          <div className="absolute bottom-40 right-20 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-600 rounded-full filter blur-3xl opacity-20" />
        </motion.div>
        
        {/* Energy field overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, transparent 0%, rgba(255, 215, 0, ${glowIntensity}) 100%)`,
            opacity: glowIntensity,
          }}
        />
      </div>

      {/* Enhanced header with glassmorphism */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-40 bg-black/60 backdrop-blur-xl border-b border-royal-gold/20"
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        <div className="container mx-auto px-4 py-4">
          <motion.h1 
            className="text-3xl font-bold text-royal-gold drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            The Jewish Timeline
          </motion.h1>
          <motion.p 
            className="text-gray-300 text-sm mt-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Swipe through 3,500 years of history
          </motion.p>
          
          {/* Progress indicator */}
          <motion.div 
            className="absolute bottom-0 left-0 h-0.5 bg-royal-gold"
            style={{ 
              width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
              boxShadow: '0 0 10px rgba(255, 215, 0, 0.8)'
            }}
          />
        </div>
      </motion.div>

      {/* Enhanced timeline spine with energy flow */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2">
        {/* Base spine */}
        <div className="absolute inset-0 bg-gradient-to-b from-royal-gold/0 via-royal-gold/50 to-royal-gold/0" />
        
        {/* Energy pulse animation */}
        <motion.div
          className="absolute w-full h-32 bg-gradient-to-b from-transparent via-royal-gold to-transparent"
          animate={{
            y: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ 
            filter: 'blur(4px)',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)'
          }}
        />
        
        {/* Secondary pulse */}
        <motion.div
          className="absolute w-full h-48 bg-gradient-to-b from-transparent via-yellow-400 to-transparent opacity-50"
          animate={{
            y: ['-100%', '200%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            delay: 1.5,
          }}
          style={{ filter: 'blur(8px)' }}
        />
      </div>

      {/* Events container */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        {events.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <h2 className="text-3xl font-bold text-royal-gold mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
              Loading Timeline Events...
            </h2>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-royal-gold border-t-transparent rounded-full mx-auto"
            />
          </motion.div>
        ) : (
          <div className="space-y-20">
            {/* Timeline header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <p className="text-gray-400 text-sm">
                Showing {events.length} historical events
              </p>
            </motion.div>
            
            {/* Event cards */}
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                className="timeline-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <EnhancedTimelineCard event={event} index={index} />
              </motion.div>
            ))}
            
            {/* Timeline end marker */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: events.length * 0.05 + 0.5 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 border-4 border-royal-gold rounded-full flex items-center justify-center mb-4"
                style={{
                  boxShadow: '0 0 40px rgba(255, 215, 0, 0.6)',
                }}
              >
                <div className="w-12 h-12 bg-royal-gold rounded-full" />
              </motion.div>
              <p className="text-royal-gold text-lg font-semibold">End of Timeline</p>
            </motion.div>
          </div>
        )}
      </div>

      {/* Floating UI elements */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            audioManager.toggle();
            audioManager.playClick();
          }}
          className="w-14 h-14 bg-royal-gold/20 backdrop-blur-xl rounded-full flex items-center justify-center
                     border border-royal-gold/50 shadow-[0_4px_20px_rgba(255,215,0,0.3)]"
        >
          <span className="text-2xl">{audioManager.isEnabled() ? '🔊' : '🔇'}</span>
        </motion.button>
      </motion.div>
    </div>
  );
}