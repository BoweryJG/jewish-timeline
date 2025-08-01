import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { TimelineEvent } from '../../lib/supabase';
import { VictoryIcon, StruggleIcon, AttackIcon, PopulationIcon } from '../Icons/CategoryIcons';
import { audioManager } from '../../utils/audioManager';
import FullScreenImageViewer from '../UI/FullScreenImageViewer';

interface TimelineCardProps {
  event: TimelineEvent;
  index: number;
}

// Floating particles component
const ParticleEffect = ({ category }: { category: string }) => {
  const getParticleColor = () => {
    switch (category) {
      case 'win': return '#00ff00';
      case 'struggle': return '#ff8800';
      case 'attack': return '#ff0000';
      case 'population': return '#0088ff';
      default: return '#ffffff';
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: getParticleColor(),
            left: `${50 + Math.cos(i * Math.PI / 4) * 30}%`,
            top: `${50 + Math.sin(i * Math.PI / 4) * 30}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            x: [0, Math.cos(i * Math.PI / 4) * 50],
            y: [0, Math.sin(i * Math.PI / 4) * 50],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

export default function EnhancedTimelineCard({ event, index }: TimelineCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const isLeft = index % 2 === 0;
  
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'win':
      case 'origins':
      case 'covenant':
      case 'cultural':
      case 'spiritual':
      case 'golden_age':
      case 'innovation':
        return 'from-green-600/30 via-green-600/10 to-transparent border-green-600/50 hover:border-green-400';
      case 'struggle':
      case 'resilience':
        return 'from-orange-600/30 via-orange-600/10 to-transparent border-orange-600/50 hover:border-orange-400';
      case 'attack': 
        return 'from-red-600/30 via-red-600/10 to-transparent border-red-600/50 hover:border-red-400';
      case 'population':
      case 'migration':
        return 'from-blue-600/30 via-blue-600/10 to-transparent border-blue-600/50 hover:border-blue-400';
      default: 
        return 'from-gray-600/30 via-gray-600/10 to-transparent border-gray-600/50 hover:border-gray-400';
    }
  };

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
    audioManager.playClick();
    audioManager.playCategory(event.category);
  };

  return (
    <div ref={ref} className={`flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}>
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        whileHover={{ scale: 1.02, rotateY: 5 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => {
          setIsHovered(true);
          audioManager.playHover();
        }}
        onHoverEnd={() => setIsHovered(false)}
        className={`w-11/12 sm:w-5/12 cursor-pointer ${isLeft ? 'pr-8' : 'pl-8'}`}
        onClick={handleCardClick}
        style={{ perspective: 1000 }}
      >
        <motion.div
          className={`relative bg-gradient-to-br ${getCategoryStyle(event.category)} 
                     backdrop-blur-xl rounded-2xl border-2 p-6 
                     shadow-2xl transform-gpu transition-all duration-300`}
          style={{
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: isHovered 
              ? '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(255,215,0,0.2)' 
              : '0 10px 40px rgba(0,0,0,0.3)',
          }}
        >
          {/* Glassmorphism effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-2xl pointer-events-none" />
          
          {/* Animated border glow */}
          <motion.div
            className="absolute -inset-[2px] rounded-2xl opacity-0 blur-md"
            animate={isHovered ? { opacity: [0, 0.6, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              background: `linear-gradient(45deg, ${
                event.category === 'win' ? '#00ff00' :
                event.category === 'attack' ? '#ff0000' :
                event.category === 'struggle' ? '#ff8800' :
                '#0088ff'
              }, transparent)`,
            }}
          />
          
          {/* Particle effects on hover */}
          {isHovered && <ParticleEffect category={event.category} />}
          
          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                animate={isHovered ? { rotate: 360 } : {}}
                transition={{ duration: 2, ease: "linear" }}
                className="flex-shrink-0"
              >
                {event.category === 'win' && <VictoryIcon size={35} />}
                {event.category === 'struggle' && <StruggleIcon size={35} />}
                {event.category === 'attack' && <AttackIcon size={35} />}
                {event.category === 'population' && <PopulationIcon size={35} />}
              </motion.div>
              <div className="flex-1">
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  {event.category}
                </span>
                {event.severity_impact && (
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(10)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={inView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ delay: i * 0.05 + 0.3 }}
                        className={`h-1.5 w-4 rounded-full transition-all duration-300 ${
                          i < (event.severity_impact || 0)
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-[0_0_5px_rgba(255,215,0,0.5)]'
                            : 'bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-royal-gold mb-2 leading-tight 
                         drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {event.title}
            </h3>
            
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
              <span className="font-medium">
                {event.start_date.startsWith('0') && event.start_date.length === 10
                  ? `-${parseInt(event.start_date.substring(0, 4))} BCE`
                  : new Date(event.start_date).getFullYear()}
              </span>
              {event.location && (
                <>
                  <span className="text-gray-500">•</span>
                  <span>{event.location.name}</span>
                </>
              )}
            </div>
            
            <AnimatePresence>
              {!isExpanded ? (
                <motion.p
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-gray-200 text-sm leading-relaxed line-clamp-3"
                >
                  {event.synopsis}
                </motion.p>
              ) : (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-200 text-sm leading-relaxed mb-4">
                    {event.synopsis}
                  </p>
                  
                  {/* Event Image */}
                  {event.media_urls && event.media_urls.length > 0 && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="mb-4 relative z-10"
                    >
                      <div
                        className="relative overflow-hidden rounded-lg cursor-pointer group"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowImageViewer(true);
                          audioManager.playClick();
                        }}
                      >
                        <img
                          src={event.media_urls[0]}
                          alt={event.title}
                          className="w-full h-48 object-cover transform transition-transform duration-300 
                                   group-hover:scale-110"
                          onError={(e) => {
                            console.error(`Failed to load image: ${event.media_urls?.[0]}`);
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg==';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-2 right-2 bg-black/70 rounded-full p-2 
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2 text-center">Click image to view full screen</p>
                    </motion.div>
                  )}
                  
                  {event.population_before && event.population_after && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="bg-gradient-to-r from-royal-gold/20 to-transparent rounded-lg p-4 mb-4 
                               border border-royal-gold/30"
                    >
                      <h4 className="text-royal-gold font-semibold mb-2">Population Impact</h4>
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <p className="text-gray-500">Before</p>
                          <p className="text-xl font-bold text-gray-200">
                            {event.population_before.toLocaleString()}
                          </p>
                        </div>
                        <motion.div
                          animate={{ x: [-3, 3, -3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-2xl text-royal-gold"
                        >
                          →
                        </motion.div>
                        <div>
                          <p className="text-gray-500">After</p>
                          <p className="text-xl font-bold text-gray-200">
                            {event.population_after.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 text-center">
                        <span className={`text-lg font-bold ${
                          event.population_after > event.population_before ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {event.population_after > event.population_before ? '+' : ''}
                          {((event.population_after - event.population_before) / event.population_before * 100).toFixed(0)}%
                        </span>
                      </div>
                    </motion.div>
                  )}
                  
                  {event.sources && event.sources.length > 0 && (
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h4 className="text-royal-gold font-semibold mb-2">Sources</h4>
                      <ul className="space-y-1">
                        {event.sources.map((source, i) => (
                          <motion.li
                            key={i}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                          >
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 text-sm transition-colors 
                                       underline decoration-blue-400/30 hover:decoration-blue-300"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {source.title}
                            </a>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Expand/Collapse indicator */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="mt-3 text-center text-royal-gold text-sm font-medium"
            >
              {isExpanded ? '▲ Less' : '▼ More'}
            </motion.div>
          </div>
          
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden rounded-2xl pointer-events-none">
            <motion.div
              animate={isHovered ? { scale: 1.2, rotate: 45 } : { scale: 1, rotate: 45 }}
              transition={{ duration: 0.3 }}
              className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-royal-gold/20 to-transparent"
            />
          </div>
        </motion.div>
      </motion.div>
      
      {/* Enhanced timeline node */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="absolute left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          whileHover={{ scale: 1.3 }}
          className="relative w-8 h-8 bg-royal-gold rounded-full border-4 border-black z-20
                     shadow-[0_0_20px_rgba(255,215,0,0.6)]"
        >
          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 bg-royal-gold rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </motion.div>
      
      {/* Full Screen Image Viewer */}
      {event.media_urls && event.media_urls.length > 0 && (
        <FullScreenImageViewer
          isOpen={showImageViewer}
          imageUrl={event.media_urls[0]}
          title={event.title}
          description={event.synopsis}
          onClose={() => setShowImageViewer(false)}
        />
      )}
    </div>
  );
}