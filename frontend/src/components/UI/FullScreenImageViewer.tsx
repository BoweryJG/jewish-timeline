import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, Download } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FullScreenImageViewerProps {
  isOpen: boolean;
  imageUrl: string;
  title: string;
  description?: string;
  onClose: () => void;
}

export default function FullScreenImageViewer({ 
  isOpen, 
  imageUrl, 
  title, 
  description, 
  onClose 
}: FullScreenImageViewerProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Reset on image change
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen, imageUrl]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (scale > 1 && e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && scale > 1 && e.touches.length === 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Header Controls */}
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent z-10">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex-1">
                <h3 className="text-white text-lg md:text-xl font-bold">{title}</h3>
                {description && (
                  <p className="text-gray-300 text-sm mt-1 line-clamp-2 max-w-2xl">
                    {description}
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomOut();
                  }}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  title="Zoom Out (-)">
                  <ZoomOut className="w-5 h-5 text-white" />
                </button>
                
                <span className="text-white text-sm font-medium min-w-[50px] text-center">
                  {Math.round(scale * 100)}%
                </span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomIn();
                  }}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  title="Zoom In (+)">
                  <ZoomIn className="w-5 h-5 text-white" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload();
                  }}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  title="Download">
                  <Download className="w-5 h-5 text-white" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  title="Close (Esc)">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Image Container */}
          <div 
            className="absolute inset-0 flex items-center justify-center p-4"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              src={imageUrl}
              alt={title}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: scale, 
                opacity: 1,
                x: position.x,
                y: position.y
              }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              drag={scale > 1}
              dragConstraints={{
                left: -500,
                right: 500,
                top: -500,
                bottom: 500
              }}
              dragElastic={0.1}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl ${
                scale > 1 ? 'cursor-move' : 'cursor-pointer'
              }`}
              style={{
                touchAction: scale > 1 ? 'none' : 'auto'
              }}
            />
          </div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-4 left-4 right-4 text-center"
          >
            <p className="text-gray-400 text-sm">
              {scale > 1 
                ? 'Drag to pan • Use +/- to zoom • Press Esc to close'
                : 'Use +/- to zoom • Press Esc to close'
              }
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}