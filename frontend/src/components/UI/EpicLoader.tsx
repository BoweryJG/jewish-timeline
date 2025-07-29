import { motion } from 'framer-motion';

export default function EpicLoader() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative w-64 h-64">
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0" />
                <stop offset="50%" stopColor="#FFD700" stopOpacity="1" />
                <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="url(#loaderGradient)"
              strokeWidth="2"
              strokeDasharray="20 10"
            />
          </svg>
        </motion.div>

        {/* Middle pulsing Star of David */}
        <motion.div
          className="absolute inset-8"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M50 20 L65 40 L50 60 L35 40 Z M35 30 L65 30 L50 50 Z M35 50 L65 50 L50 30 Z"
              fill="none"
              stroke="#FFD700"
              strokeWidth="2"
              opacity="0.8"
            />
          </svg>
        </motion.div>

        {/* Inner spinning hourglass */}
        <motion.div
          className="absolute inset-16"
          animate={{ 
            rotateY: [0, 180, 360],
            rotateZ: [0, 180, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <defs>
              <radialGradient id="sandGradient">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FFA500" />
              </radialGradient>
            </defs>
            
            {/* Hourglass shape */}
            <path
              d="M15 10 L35 10 L30 25 L35 40 L15 40 L20 25 L15 10"
              fill="none"
              stroke="#FFD700"
              strokeWidth="2"
            />
            
            {/* Flowing sand particles */}
            {[...Array(5)].map((_, i) => (
              <motion.circle
                key={i}
                cx="25"
                cy="20"
                r="1"
                fill="url(#sandGradient)"
                animate={{
                  cy: [20, 30, 20],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Loading text with typewriter effect */}
        <motion.div
          className="absolute -bottom-20 left-0 right-0 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.h3 className="text-royal-gold text-2xl font-bold mb-2">
            {"Loading Timeline".split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h3>
          
          <motion.div className="flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-royal-gold rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}