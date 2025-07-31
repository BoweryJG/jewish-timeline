import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function TimelineSpine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  
  // Multiple animated elements for the spine
  const flowY1 = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const flowY2 = useTransform(scrollYProgress, [0, 1], ['-50%', '150%']);
  const flowY3 = useTransform(scrollYProgress, [0, 1], ['-100%', '200%']);
  
  const glowIntensity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 0.3]);
  const spineWidth = useTransform(scrollYProgress, [0, 0.5, 1], [2, 4, 2]);

  return (
    <div ref={ref} className="absolute left-1/2 transform -translate-x-1/2 w-8 h-full pointer-events-none">
      {/* Base spine with dynamic width */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 h-full bg-gradient-to-b from-royal-gold/20 via-royal-gold/40 to-royal-gold/20"
        style={{ width: spineWidth }}
      />
      
      {/* Primary glow */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full"
        style={{
          background: `linear-gradient(to bottom, 
            transparent 0%, 
            rgba(255, 215, 0, ${glowIntensity}) 50%, 
            transparent 100%)`,
          filter: 'blur(8px)',
          width: '12px',
        }}
      />
      
      {/* Flowing energy streams */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 w-px"
        style={{
          height: '300px',
          top: flowY1,
          background: 'linear-gradient(to bottom, transparent, #FFD700, transparent)',
          filter: 'blur(2px)',
          opacity: 0.8,
        }}
      />
      
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 w-px"
        style={{
          height: '200px',
          top: flowY2,
          background: 'linear-gradient(to bottom, transparent, #FFA500, transparent)',
          filter: 'blur(3px)',
          opacity: 0.6,
        }}
      />
      
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 w-px"
        style={{
          height: '150px',
          top: flowY3,
          background: 'linear-gradient(to bottom, transparent, #FFE4B5, transparent)',
          filter: 'blur(2px)',
          opacity: 0.4,
        }}
      />
      
      {/* Pulsing orbs along the spine */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-royal-gold"
          style={{
            top: `${(i + 1) * 12.5}%`,
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            delay: i * 0.25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Hebrew letters floating up */}
      {['א', 'ב', 'ג', 'ד', 'ה'].map((letter, i) => (
        <motion.div
          key={letter}
          className="absolute left-1/2 transform -translate-x-1/2 text-royal-gold/30 text-xl font-hebrew"
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: [0, 0.6, 0],
            y: [-100, -500],
            x: [0, Math.sin(i) * 20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 10,
            delay: i * 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {letter}
        </motion.div>
      ))}
      
      {/* Connecting threads */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="threadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFD700" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {[...Array(3)].map((_, i) => (
          <motion.path
            key={i}
            d={`M 4 0 Q ${4 + Math.sin(i) * 10} ${200 * (i + 1)} 4 ${400 * (i + 1)}`}
            stroke="url(#threadGradient)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              delay: i * 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  );
}