import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface CloudProps {
  delay: number;
  duration: number;
  yPos: number;
}

const Cloud = ({ delay, duration, yPos }: CloudProps) => (
  <motion.div
    className="absolute"
    style={{ top: `${yPos}%` }}
    initial={{ x: '-20%' }}
    animate={{ x: '120%' }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'linear'
    }}
  >
    <svg width="200" height="100" viewBox="0 0 200 100" fill="none">
      <ellipse cx="60" cy="50" rx="40" ry="25" fill="white" opacity="0.3" />
      <ellipse cx="100" cy="45" rx="50" ry="30" fill="white" opacity="0.25" />
      <ellipse cx="140" cy="55" rx="35" ry="20" fill="white" opacity="0.2" />
    </svg>
  </motion.div>
);

const FloatingSymbol = ({ type, delay }: { type: 'star' | 'menorah' | 'scroll'; delay: number }) => {
  const symbols = {
    star: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 5L24.33 15.5H35.31L26.49 22.5L30.82 33L20 26L9.18 33L13.51 22.5L4.69 15.5H15.67L20 5Z" 
              fill="#FFD700" opacity="0.15" />
      </svg>
    ),
    menorah: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="18" y="10" width="4" height="20" fill="#FFD700" opacity="0.15" />
        <rect x="8" y="15" width="24" height="3" fill="#FFD700" opacity="0.15" />
      </svg>
    ),
    scroll: (
      <svg width="50" height="30" viewBox="0 0 50 30" fill="none">
        <rect x="10" y="5" width="30" height="20" rx="3" fill="#FFD700" opacity="0.1" stroke="#FFD700" strokeOpacity="0.2" />
        <circle cx="10" cy="15" r="8" fill="#FFD700" opacity="0.15" />
        <circle cx="40" cy="15" r="8" fill="#FFD700" opacity="0.15" />
      </svg>
    )
  };

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.5, 0],
        scale: [0, 1.2, 0],
        y: [0, -100, -200],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration: 10 + Math.random() * 10,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {symbols[type]}
    </motion.div>
  );
};

export default function GhibliBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [currentEra, setCurrentEra] = useState('Ancient');
  
  // Parallax transforms
  const skyY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const midgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);
  
  // Dynamic gradient based on scroll
  const gradientStart = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['#E3F2FD', '#FFF3E0', '#FFEBEE', '#E8F5E9', '#F3E5F5']
  );
  
  const gradientEnd = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['#BBDEFB', '#FFE0B2', '#FFCDD2', '#C8E6C9', '#E1BEE7']
  );

  useEffect(() => {
    const updateEra = () => {
      const progress = scrollYProgress.get();
      if (progress < 0.2) setCurrentEra('Ancient');
      else if (progress < 0.4) setCurrentEra('Classical');
      else if (progress < 0.6) setCurrentEra('Medieval');
      else if (progress < 0.8) setCurrentEra('Modern');
      else setCurrentEra('Contemporary');
    };

    const unsubscribe = scrollYProgress.on('change', updateEra);
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Dynamic gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${gradientStart} 0%, ${gradientEnd} 100%)`
        }}
      />
      
      {/* Sun/Moon */}
      <motion.div
        className="absolute right-20 top-20"
        style={{ y: skyY }}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 
                     shadow-[0_0_60px_rgba(255,215,0,0.5)]"
        />
      </motion.div>
      
      {/* Clouds */}
      <div className="absolute inset-0">
        <Cloud delay={0} duration={60} yPos={10} />
        <Cloud delay={20} duration={80} yPos={25} />
        <Cloud delay={40} duration={70} yPos={15} />
        <Cloud delay={10} duration={90} yPos={35} />
      </div>
      
      {/* Floating symbols */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <FloatingSymbol
            key={i}
            type={['star', 'menorah', 'scroll'][i % 3] as 'star' | 'menorah' | 'scroll'}
            delay={i * 3}
          />
        ))}
      </div>
      
      {/* Midground hills */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/3"
        style={{ y: midgroundY }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 200 Q300 100 600 150 T1200 200 L1200 400 L0 400 Z"
            fill="url(#hillGradient)"
            opacity="0.4"
          />
          <defs>
            <linearGradient id="hillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8BC34A" />
              <stop offset="100%" stopColor="#4CAF50" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      
      {/* Foreground elements */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/4"
        style={{ y: foregroundY }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 300"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 150 Q200 50 400 100 T800 150 T1200 100 L1200 300 L0 300 Z"
            fill="url(#foregroundGradient)"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="foregroundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#66BB6A" />
              <stop offset="100%" stopColor="#43A047" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      
      {/* Particle effects */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      
      {/* Era indicator */}
      <motion.div
        className="fixed top-8 left-8 text-white/30 text-sm font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={currentEra}
      >
        {currentEra} Era
      </motion.div>
    </div>
  );
}