import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Mouse, Move, ZoomIn } from 'lucide-react';

export default function NavigationHelp() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile('ontouchstart' in window);
    
    // Hide after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-20 left-1/2 transform -translate-x-1/2 
                 bg-black/80 backdrop-blur-md rounded-lg p-4 
                 border border-royal-gold/30 z-20"
    >
      <div className="flex items-center gap-6 text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <Mouse className="w-4 h-4 text-royal-gold" />
          <span>Click crystals for details</span>
        </div>
        
        {!isMobile && (
          <>
            <div className="flex items-center gap-2">
              <Move className="w-4 h-4 text-royal-gold" />
              <span>Drag to rotate</span>
            </div>
            
            <div className="flex items-center gap-2">
              <ZoomIn className="w-4 h-4 text-royal-gold" />
              <span>Scroll to zoom</span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}