import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useStore } from '../../store/useStore';
import TimelineCard from './TimelineCard';

export default function PortraitTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { events } = useStore();
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Create parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const starsY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);


  return (
    <div ref={containerRef} className="relative min-h-screen overflow-y-auto h-screen">
      {/* Animated background layers */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black via-deep-indigo to-black"
          style={{ y: backgroundY }}
        />
        <motion.div 
          className="absolute inset-0"
          style={{ y: starsY }}
        >
          {/* Particle field */}
          <div className="stars"></div>
        </motion.div>
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-royal-gold/20">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-royal-gold">
            The Jewish Timeline
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Swipe through 3,500 years of history
          </p>
        </div>
      </div>

      {/* Timeline spine */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-royal-gold/0 via-royal-gold/50 to-royal-gold/0 transform -translate-x-1/2" />

      {/* Events */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="space-y-16">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="timeline-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <TimelineCard event={event} index={index} />
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}