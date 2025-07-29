import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';

export default function OrientationPrompt() {
  const { showOrientationPrompt, setShowOrientationPrompt } = useStore();

  return (
    <AnimatePresence>
      {showOrientationPrompt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setShowOrientationPrompt(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="text-center px-8"
          >
            <motion.div
              animate={{ rotate: [0, 0, 90, 90] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                times: [0, 0.3, 0.7, 1]
              }}
              className="inline-block mb-8"
            >
              <svg width="80" height="120" viewBox="0 0 80 120" fill="none">
                <rect x="10" y="20" width="60" height="80" rx="8" stroke="#FFD700" strokeWidth="3"/>
                <circle cx="40" cy="105" r="3" fill="#FFD700"/>
                <rect x="30" y="15" width="20" height="3" rx="1.5" fill="#FFD700"/>
              </svg>
            </motion.div>
            
            <h2 className="text-3xl font-bold text-royal-gold mb-4">
              Rotate Your Device
            </h2>
            
            <p className="text-gray-300 text-lg mb-6 max-w-md mx-auto">
              For the full immersive experience, please rotate your device to landscape mode
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <p className="text-gray-500 text-sm">
                Or tap anywhere to continue in portrait mode
              </p>
              <p className="text-gray-600 text-xs">
                (Some features may be limited)
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}