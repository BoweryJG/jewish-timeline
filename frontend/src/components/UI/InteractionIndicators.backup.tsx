// BACKUP OF ORIGINAL FILE
import { motion } from 'framer-motion';

// Gyroscope tilt indicator
export const GyroIndicator = ({ active = false }: { active?: boolean }) => (
  <motion.div
    className="fixed bottom-4 right-4 w-16 h-16"
    animate={{ opacity: active ? 1 : 0.5 }}
  >
    <div className="text-yellow-500">GYRO</div>
  </motion.div>
);

// Scroll indicator
export const ScrollIndicator = () => (
  <motion.div
    className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1 }}
  >
    <div className="text-yellow-500">SCROLL</div>
  </motion.div>
);

// Touch gesture indicator
export const TouchIndicator = ({ gesture = 'tap' }: { gesture?: 'tap' | 'swipe' | 'pinch' }) => (
  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
    <div className="text-yellow-500">{gesture.toUpperCase()}</div>
  </div>
);