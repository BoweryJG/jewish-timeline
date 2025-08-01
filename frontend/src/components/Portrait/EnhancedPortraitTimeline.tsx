import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useStore } from '../../store/useStore';
import EnhancedTimelineCard from './EnhancedTimelineCard';
import { audioManager } from '../../utils/audioManager';
import MobileNavbar from '../UI/MobileNavbar';

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
      {/* Multi-layer animated background - with pointer-events-none to prevent interaction blocking */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Deep space layer */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black via-deep-indigo to-black pointer-events-none"
          style={{ y: backgroundY }}
        />
        
        {/* Star field layer */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ y: starsY }}
        >
          <div className="stars" />
          {/* Animated stars */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
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
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ y: cloudsY }}
        >
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20 pointer-events-none" />
          <div className="absolute bottom-40 right-20 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-600 rounded-full filter blur-3xl opacity-20 pointer-events-none" />
        </motion.div>
        
        {/* Energy field overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, transparent 0%, rgba(255, 215, 0, ${glowIntensity}) 100%)`,
            opacity: glowIntensity,
          }}
        />
      </div>

      {/* Professional Mobile Navbar */}
      <MobileNavbar 
        scrollProgress={smoothProgress.get()}
        onMenuClick={() => {
          // Can add about modal or other functionality here
          console.log('Menu clicked');
        }}
      />

      {/* Enhanced timeline spine with energy flow - non-blocking */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2 pointer-events-none">
        {/* Base spine */}
        <div className="absolute inset-0 bg-gradient-to-b from-royal-gold/0 via-royal-gold/50 to-royal-gold/0" />
        
        {/* Energy pulse animation */}
        <motion.div
          className="absolute w-full h-32 bg-gradient-to-b from-transparent via-royal-gold to-transparent pointer-events-none"
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
          className="absolute w-full h-48 bg-gradient-to-b from-transparent via-yellow-400 to-transparent opacity-50 pointer-events-none"
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

      {/* Events container - with proper top padding for fixed header */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-20">
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

    </div>
  );
}