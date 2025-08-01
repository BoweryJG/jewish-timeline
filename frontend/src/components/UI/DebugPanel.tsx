import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { getDeviceInfo } from '../../utils/deviceDetection';

export default function DebugPanel() {
  const [isVisible, setIsVisible] = useState(false);
  const [touchEvents, setTouchEvents] = useState<string[]>([]);
  const [clickEvents, setClickEvents] = useState<string[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const deviceInfo = getDeviceInfo();
  const { events, viewMode, quality } = useStore();
  
  // Keyboard shortcut to toggle panel
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        setIsVisible(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
  
  // Track touch events
  useEffect(() => {
    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        const event = `${e.type} at (${Math.round(touch.clientX)}, ${Math.round(touch.clientY)})`;
        setTouchEvents(prev => [...prev.slice(-4), event]);
      }
    };
    
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const event = `Click on ${target.tagName}.${target.className} at (${e.clientX}, ${e.clientY})`;
      setClickEvents(prev => [...prev.slice(-4), event]);
    };
    
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('touchstart', handleTouch);
    window.addEventListener('touchmove', handleTouch);
    window.addEventListener('touchend', handleTouch);
    window.addEventListener('click', handleClick, true);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('touchend', handleTouch);
      window.removeEventListener('click', handleClick, true);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Check z-index layers
  const getZIndexInfo = () => {
    const elements = document.querySelectorAll('*');
    const zIndexMap = new Map<string, { element: string; zIndex: string }[]>();
    
    elements.forEach(el => {
      const style = window.getComputedStyle(el);
      const zIndex = style.zIndex;
      if (zIndex !== 'auto' && zIndex !== '0') {
        if (!zIndexMap.has(zIndex)) {
          zIndexMap.set(zIndex, []);
        }
        const tagName = el.tagName.toLowerCase();
        const className = el.className || 'no-class';
        zIndexMap.get(zIndex)?.push({
          element: `${tagName}.${className}`.substring(0, 50),
          zIndex
        });
      }
    });
    
    return Array.from(zIndexMap.entries())
      .sort((a, b) => Number(b[0]) - Number(a[0]))
      .slice(0, 10);
  };
  
  const zIndexInfo = getZIndexInfo();
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed right-0 top-0 h-full w-80 bg-black/90 backdrop-blur-md border-l border-royal-gold/30 
                     z-[9999] overflow-y-auto p-4 text-white text-xs font-mono"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-royal-gold">Debug Panel</h3>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            {/* Device Info */}
            <div className="bg-gray-900/50 rounded p-3">
              <h4 className="text-royal-gold mb-2">Device Info</h4>
              <div className="space-y-1">
                <p>Mobile: {deviceInfo.isMobile ? 'Yes' : 'No'}</p>
                <p>iOS: {deviceInfo.isIOS ? 'Yes' : 'No'}</p>
                <p>Android: {deviceInfo.isAndroid ? 'Yes' : 'No'}</p>
                <p>Touch: {deviceInfo.supportsTouch ? 'Yes' : 'No'}</p>
                <p>GPU: {deviceInfo.gpuTier}</p>
                <p>Screen: {window.innerWidth} × {window.innerHeight}</p>
                <p>Pixel Ratio: {window.devicePixelRatio}</p>
              </div>
            </div>
            
            {/* App State */}
            <div className="bg-gray-900/50 rounded p-3">
              <h4 className="text-royal-gold mb-2">App State</h4>
              <div className="space-y-1">
                <p>View Mode: {viewMode}</p>
                <p>Quality: {quality}</p>
                <p>Events Loaded: {events.length}</p>
                <p>Scroll: {scrollPosition}px</p>
              </div>
            </div>
            
            {/* Touch Events */}
            <div className="bg-gray-900/50 rounded p-3">
              <h4 className="text-royal-gold mb-2">Touch Events</h4>
              <div className="space-y-1">
                {touchEvents.length === 0 ? (
                  <p className="text-gray-500">No touch events yet</p>
                ) : (
                  touchEvents.map((event, i) => (
                    <p key={i} className="text-gray-300">{event}</p>
                  ))
                )}
              </div>
            </div>
            
            {/* Click Events */}
            <div className="bg-gray-900/50 rounded p-3">
              <h4 className="text-royal-gold mb-2">Click Events</h4>
              <div className="space-y-1">
                {clickEvents.length === 0 ? (
                  <p className="text-gray-500">No click events yet</p>
                ) : (
                  clickEvents.map((event, i) => (
                    <p key={i} className="text-gray-300 truncate">{event}</p>
                  ))
                )}
              </div>
            </div>
            
            {/* Z-Index Layers */}
            <div className="bg-gray-900/50 rounded p-3">
              <h4 className="text-royal-gold mb-2">Z-Index Layers</h4>
              <div className="space-y-1">
                {zIndexInfo.map(([zIndex, elements], i) => (
                  <div key={i}>
                    <p className="text-yellow-400">z-{zIndex}:</p>
                    {elements.slice(0, 3).map((el, j) => (
                      <p key={j} className="text-gray-300 pl-2 truncate">
                        {el.element}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Performance */}
            <div className="bg-gray-900/50 rounded p-3">
              <h4 className="text-royal-gold mb-2">Performance</h4>
              <div className="space-y-1">
                <p>FPS: {Math.round(1000 / 16)} (estimated)</p>
                <p>Memory: {(performance as any).memory?.usedJSHeapSize 
                  ? Math.round((performance as any).memory.usedJSHeapSize / 1048576) + 'MB'
                  : 'N/A'}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}