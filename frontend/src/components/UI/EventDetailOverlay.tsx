import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Users, Maximize2 } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { audioManager } from '../../utils/audioManager';
import FullScreenImageViewer from './FullScreenImageViewer';

export default function EventDetailOverlay() {
  const { selectedEvent, setSelectedEvent } = useStore();
  const [fullscreenImage, setFullscreenImage] = useState<{ url: string; title: string } | null>(null);

  if (!selectedEvent) return null;

  const handleClose = () => {
    setSelectedEvent(null);
    audioManager.playClick();
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'win': return 'bg-green-500';
      case 'attack': return 'bg-red-500';
      case 'struggle': return 'bg-orange-500';
      case 'population': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
            onClick={handleClose}
          >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* Content */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-gradient-to-b from-gray-900 to-black 
                     rounded-t-3xl md:rounded-3xl border border-royal-gold/30 
                     max-h-[85vh] overflow-hidden shadow-2xl"
          >
            {/* Header with image */}
            <div className="relative h-48 md:h-64 overflow-hidden group">
              {selectedEvent.media_urls && selectedEvent.media_urls[0] ? (
                <>
                  <img 
                    src={selectedEvent.media_urls[0]} 
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setFullscreenImage({ 
                      url: selectedEvent.media_urls![0], 
                      title: selectedEvent.title 
                    })}
                  />
                  {/* Fullscreen button overlay */}
                  <button
                    onClick={() => setFullscreenImage({ 
                      url: selectedEvent.media_urls![0], 
                      title: selectedEvent.title 
                    })}
                    className="absolute top-4 left-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full 
                             flex items-center justify-center text-white opacity-0 group-hover:opacity-100 
                             transition-opacity"
                  >
                    <Maximize2 size={18} />
                  </button>
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-royal-gold/20 to-royal-gold/5" />
              )}
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              {/* Category badge */}
              <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white ${getCategoryColor(selectedEvent.category)}`}>
                {selectedEvent.category.toUpperCase()}
              </div>
              
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full 
                         flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </button>
              
              {/* Title */}
              <h2 className="absolute bottom-4 left-4 right-4 text-2xl md:text-3xl font-bold text-white">
                {selectedEvent.title}
              </h2>
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(85vh-12rem)]">
              {/* Date and Location */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-royal-gold" />
                  <span>{new Date(selectedEvent.start_date).toLocaleDateString()}</span>
                </div>
                {selectedEvent.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-royal-gold" />
                    <span>{selectedEvent.location.name}</span>
                  </div>
                )}
              </div>
              
              {/* Synopsis */}
              <div className="text-gray-200 leading-relaxed">
                {selectedEvent.synopsis}
              </div>
              
              {/* Population data */}
              {selectedEvent.population_before && selectedEvent.population_after && (
                <div className="bg-white/5 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-royal-gold font-semibold">
                    <Users size={18} />
                    <span>Population Impact</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Before</p>
                      <p className="text-xl font-bold text-white">
                        {selectedEvent.population_before.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">After</p>
                      <p className="text-xl font-bold text-white">
                        {selectedEvent.population_after.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {selectedEvent.population_before > selectedEvent.population_after && (
                    <div className="text-red-400 text-sm">
                      {((selectedEvent.population_before - selectedEvent.population_after) / selectedEvent.population_before * 100).toFixed(1)}% decrease
                    </div>
                  )}
                </div>
              )}
              
              {/* Sources */}
              {selectedEvent.sources && selectedEvent.sources.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-royal-gold font-semibold">Sources</h3>
                  <ul className="space-y-1">
                    {selectedEvent.sources.map((source, i) => (
                      <li key={i} className="text-sm text-gray-300">
                        • {source.title}
                        {source.url && (
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="ml-2 text-royal-gold hover:underline"
                          >
                            View
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    
    {/* Fullscreen Image Viewer */}
    {fullscreenImage && (
      <FullScreenImageViewer
        isOpen={!!fullscreenImage}
        imageUrl={fullscreenImage.url}
        title={fullscreenImage.title}
        description={selectedEvent?.synopsis}
        onClose={() => setFullscreenImage(null)}
      />
    )}
    </>
  );
}