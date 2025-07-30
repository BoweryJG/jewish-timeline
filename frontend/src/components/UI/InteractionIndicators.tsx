import { motion } from 'framer-motion';

// Gyroscope tilt indicator
export const GyroIndicator = ({ active = false }: { active?: boolean }) => (
  <motion.div
    className="fixed bottom-4 right-4 w-16 h-16"
    animate={{ opacity: active ? 1 : 0.5 }}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="gyroGrad">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      
      {/* Outer gimbal ring */}
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="url(#gyroGrad)"
        strokeWidth="2"
        animate={active ? { 
          rotateX: [0, 20, -20, 0],
          rotateY: [0, -20, 20, 0]
        } : {}}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ transformOrigin: 'center' }}
      />
      
      {/* Middle gimbal ring */}
      <motion.circle
        cx="50"
        cy="50"
        r="30"
        fill="none"
        stroke="url(#gyroGrad)"
        strokeWidth="2"
        animate={active ? { 
          rotateX: [0, -15, 15, 0],
          rotateY: [0, 15, -15, 0]
        } : {}}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      
      {/* Inner sphere */}
      <motion.circle
        cx="50"
        cy="50"
        r="15"
        fill="url(#gyroGrad)"
        animate={active ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      />
      
      {/* Direction indicators */}
      <motion.g opacity={active ? 1 : 0.3}>
        <path d="M50 20 L45 30 L55 30 Z" fill="#FFD700" />
        <path d="M50 80 L45 70 L55 70 Z" fill="#FFD700" />
        <path d="M20 50 L30 45 L30 55 Z" fill="#FFD700" />
        <path d="M80 50 L70 45 L70 55 Z" fill="#FFD700" />
      </motion.g>
    </svg>
  </motion.div>
);

// Scroll indicator with Hebrew-inspired design
export const ScrollIndicator = () => (
  <motion.div
    className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1 }}
  >
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="flex flex-col items-center"
    >
      <svg width="40" height="60" viewBox="0 0 40 60" className="mb-2">
        <defs>
          <linearGradient id="scrollGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFD700" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Scroll shape */}
        <rect x="5" y="5" width="30" height="50" rx="15" fill="none" stroke="#FFD700" strokeWidth="2" opacity="0.5" />
        
        {/* Scrolling dot */}
        <motion.circle
          cx="20"
          r="4"
          fill="url(#scrollGrad)"
          initial={{ cy: 20 }}
          animate={{ cy: [20, 40, 20] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Hebrew-style decorative elements */}
        <path d="M10 10 L15 15 M25 10 L30 15" stroke="#FFD700" strokeWidth="1" opacity="0.5" />
        <path d="M10 50 L15 45 M25 50 L30 45" stroke="#FFD700" strokeWidth="1" opacity="0.5" />
      </svg>
      
      <motion.p
        className="text-royal-gold text-sm font-light tracking-wider"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        SCROLL
      </motion.p>
    </motion.div>
  </motion.div>
);

// Touch gesture indicator
export const TouchIndicator = ({ gesture = 'tap' }: { gesture?: 'tap' | 'swipe' | 'pinch' }) => {
  const renderGesture = () => {
    switch (gesture) {
      case 'tap':
        return (
          <motion.g>
            <motion.circle
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke="#FFD700"
              strokeWidth="3"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <circle cx="50" cy="50" r="5" fill="#FFD700" />
          </motion.g>
        );
        
      case 'swipe':
        return (
          <motion.g>
            <motion.path
              d="M20 50 L80 50"
              stroke="#FFD700"
              strokeWidth="3"
              strokeLinecap="round"
              pathLength="1"
              animate={{ pathLength: [0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.path
              d="M70 40 L80 50 L70 60"
              stroke="#FFD700"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.g>
        );
        
      case 'pinch':
        return (
          <motion.g>
            <motion.circle
              r="8"
              fill="#FFD700"
              initial={{ cx: 35, cy: 35 }}
              animate={{ 
                cx: [35, 40, 35],
                cy: [35, 40, 35]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.circle
              r="8"
              fill="#FFD700"
              initial={{ cx: 65, cy: 65 }}
              animate={{ 
                cx: [65, 60, 65],
                cy: [65, 60, 65]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.line
              x1="35"
              y1="35"
              x2="65"
              y2="65"
              stroke="#FFD700"
              strokeWidth="2"
              strokeDasharray="5 5"
              opacity="0.5"
            />
          </motion.g>
        );
    }
  };
  
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <motion.svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        {renderGesture()}
      </motion.svg>
    </div>
  );
};