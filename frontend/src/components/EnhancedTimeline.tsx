import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, useScroll, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import type { TimelineEvent } from '../lib/supabase'
import { VictoryIcon, StruggleIcon, AttackIcon, PopulationIcon } from './Icons/CategoryIcons'
import { audioManager } from '../utils/audioManager'
import { ghibliImageUrls, getGhibliPlaceholder } from '../services/ghibliImageGenerator'
import GhibliBackground from './GhibliBackground'
import TimelineSpine from './TimelineSpine'
import GhibliParticles from './Effects/GhibliParticles'
import EraMarker from './EraMarker'
import { eras } from '../data/eras'

interface TimelineProps {
  events: TimelineEvent[]
}



const TimelineNode = ({ event }: { event: TimelineEvent; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'win': return '#00ff00'
      case 'struggle': return '#ff8800'
      case 'attack': return '#ff0000'
      case 'population': return '#0088ff'
      default: return '#888888'
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0 }}
      animate={inView ? { scale: 1 } : { scale: 0 }}
      whileHover={{ scale: 1.5 }}
      onHoverStart={() => {
        setIsHovered(true)
        audioManager.playHover()
      }}
      onHoverEnd={() => setIsHovered(false)}
      className="relative z-20"
    >
      <motion.div
        className="w-8 h-8 rounded-full border-4 border-black"
        style={{
          backgroundColor: getCategoryColor(event.category),
          boxShadow: isHovered 
            ? `0 0 30px ${getCategoryColor(event.category)}, 0 0 60px ${getCategoryColor(event.category)}40`
            : `0 0 15px ${getCategoryColor(event.category)}80`,
        }}
      >
        {/* Pulse animation */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: getCategoryColor(event.category) }}
          animate={isHovered ? {
            scale: [1, 2, 1],
            opacity: [0.5, 0, 0.5],
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Enhanced particles on hover */}
      <GhibliParticles 
        category={event.category as 'win' | 'struggle' | 'attack' | 'population'} 
        isActive={isHovered} 
      />
    </motion.div>
  )
}

const EventCard = ({ event, index, onClick }: { 
  event: TimelineEvent; 
  index: number;
  onClick: () => void;
}) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })
  const [imageLoaded, setImageLoaded] = useState(false)
  const isLeft = index % 2 === 0
  const eventImages = ghibliImageUrls[event.title] || []

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'win':
      case 'origins':
      case 'covenant':
      case 'cultural':
      case 'spiritual':
      case 'golden_age':
      case 'innovation':
        return 'from-green-600/30 via-green-600/10 to-transparent border-green-600/50 hover:border-green-400'
      case 'struggle':
      case 'resilience':
        return 'from-orange-600/30 via-orange-600/10 to-transparent border-orange-600/50 hover:border-orange-400'
      case 'attack': 
        return 'from-red-600/30 via-red-600/10 to-transparent border-red-600/50 hover:border-red-400'
      case 'population':
      case 'migration':
        return 'from-blue-600/30 via-blue-600/10 to-transparent border-blue-600/50 hover:border-blue-400'
      default: 
        return 'from-gray-600/30 via-gray-600/10 to-transparent border-gray-600/50 hover:border-gray-400'
    }
  }

  const renderCategoryIcon = (category: string) => {
    switch (category) {
      case 'win': 
      case 'origins':
      case 'covenant':
      case 'cultural':
      case 'spiritual':
      case 'golden_age':
      case 'innovation':
        return <VictoryIcon size={40} />
      case 'struggle':
      case 'resilience':
        return <StruggleIcon size={40} />
      case 'attack': 
        return <AttackIcon size={40} />
      case 'population':
      case 'migration':
        return <PopulationIcon size={40} />
      default: 
        return <VictoryIcon size={40} />
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className={`w-5/12 cursor-pointer ${isLeft ? 'pr-8 text-right' : 'pl-8'}`}
      onClick={onClick}
      onHoverStart={() => audioManager.playHover()}
      whileHover={{ 
        scale: 1.02, 
        translateY: -5,
        rotateY: isLeft ? 5 : -5,
        z: 50
      }}
      whileTap={{ scale: 0.98 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className={`relative bg-gradient-to-br ${getCategoryStyle(event.category)} 
                   backdrop-blur-xl rounded-2xl border-2 overflow-hidden
                   shadow-2xl transform-gpu transition-all duration-300
                   hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]`}
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Event image */}
        {eventImages.length > 0 && (
          <div className="relative h-48 -m-[2px] mb-4 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
              style={{
                backgroundImage: imageLoaded ? `url(${eventImages[0]})` : getGhibliPlaceholder(event.epoch || 'Ancient'),
                opacity: imageLoaded ? 1 : 0.7
              }}
            />
            <img
              src={eventImages[0]}
              alt={event.title}
              className="sr-only"
              onLoad={() => setImageLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
        )}
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/0 to-transparent rounded-2xl pointer-events-none" />
        
        {/* Animated border glow */}
        <motion.div
          className="absolute -inset-[2px] rounded-2xl opacity-0 blur-sm"
          style={{
            background: `linear-gradient(45deg, ${
              event.category === 'win' ? '#00ff00' :
              event.category === 'attack' ? '#ff0000' :
              event.category === 'struggle' ? '#ff8800' :
              '#0088ff'
            }, transparent)`,
          }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Content */}
        <div className="relative z-10 p-6">
          <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'justify-end' : ''}`}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {renderCategoryIcon(event.category)}
            </motion.div>
            <div className={`${isLeft ? 'text-right' : ''}`}>
              <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                {event.category}
              </span>
              {event.severity_impact && (
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: inView ? i * 0.05 : 0 }}
                      className={`h-1.5 w-4 rounded-full ${
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
          
          <h3 className="text-2xl font-bold text-royal-gold mb-2 leading-tight 
                         drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {event.title}
          </h3>
          
          <p className="text-sm text-gray-300 mb-3 opacity-90">
            {new Date(event.start_date).getFullYear()} BCE/CE
            {event.location && ` • ${event.location.name}`}
          </p>
          
          <p className="text-gray-200 line-clamp-3 leading-relaxed">
            {event.synopsis}
          </p>

          {/* Decorative elements */}
          <div className="absolute top-2 right-2 w-16 h-16 opacity-10">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="w-full h-full"
            >
              {renderCategoryIcon(event.category)}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function EnhancedTimeline({ events }: TimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  useScroll({ target: containerRef })
  
  
  // Merge era markers with events
  const timelineItems = useMemo(() => {
    const items: Array<{ type: 'era' | 'event'; data: any; index: number }> = [];
    let eventIndex = 0;
    let eraIndex = 0;
    
    events.forEach((event) => {
      const eventYear = parseInt(event.start_date);
      
      // Insert era markers before events that start a new era
      while (eraIndex < eras.length && eventYear >= eras[eraIndex].startYear) {
        items.push({ type: 'era', data: eras[eraIndex], index: items.length });
        eraIndex++;
      }
      
      items.push({ type: 'event', data: event, index: eventIndex++ });
    });
    
    // Add any remaining eras
    while (eraIndex < eras.length) {
      items.push({ type: 'era', data: eras[eraIndex], index: items.length });
      eraIndex++;
    }
    
    return items;
  }, [events])
  
  useEffect(() => {
    // Start ambient audio when component mounts
    audioManager.startAmbient()
    
    return () => {
      audioManager.stopAmbient()
    }
  }, [])

  const handleEventClick = (event: TimelineEvent) => {
    setSelectedEvent(event)
    audioManager.playClick()
    audioManager.playCategory(event.category)
  }

  return (
    <>
      <GhibliBackground />
      <div ref={containerRef} className="container mx-auto px-4 py-8 pb-32 relative z-10">
        <div className="relative">
        {/* Enhanced timeline spine */}
        <TimelineSpine />
        
        {/* Timeline items (events and era markers) */}
        {timelineItems.map((item, idx) => {
          if (item.type === 'era') {
            return (
              <EraMarker
                key={`era-${item.data.id}`}
                era={item.data.name}
                year={item.data.period}
                description={item.data.description}
                index={idx}
              />
            );
          } else {
            const event = item.data;
            return (
              <motion.div
                key={event.id}
                className={`relative flex items-center mb-20 ${
                  item.index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Event card */}
                <EventCard 
                  event={event} 
                  index={item.index} 
                  onClick={() => handleEventClick(event)}
                />
                
                {/* Timeline node */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <TimelineNode event={event} index={item.index} />
                </div>
              </motion.div>
            );
          }
        })}
      </div>
      
      {/* Enhanced event detail modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.8, rotateY: -180 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.8, rotateY: 180 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-gradient-to-br from-gray-900/95 to-black/95 rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 
                         border-2 border-royal-gold/50 shadow-[0_0_100px_rgba(255,215,0,0.3)]"
              onClick={(e) => e.stopPropagation()}
              style={{
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Modal content */}
              <div className="relative z-10">
                <motion.h2 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-4xl font-bold text-royal-gold mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                >
                  {selectedEvent.title}
                </motion.h2>
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-gray-300 mb-6"
                >
                  <span className="text-lg">{new Date(selectedEvent.start_date).toLocaleDateString()}</span>
                  {selectedEvent.location && (
                    <span className="text-lg"> • {selectedEvent.location.name}</span>
                  )}
                </motion.div>
                
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-200 mb-6 text-lg leading-relaxed"
                >
                  {selectedEvent.synopsis}
                </motion.p>
                
                {selectedEvent.population_before && selectedEvent.population_after && (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-royal-gold/20 to-transparent rounded-xl p-6 mb-6 
                               border border-royal-gold/30"
                  >
                    <h3 className="text-royal-gold font-bold text-xl mb-3">Population Impact</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Before</p>
                        <p className="text-2xl font-bold text-gray-200">
                          {selectedEvent.population_before.toLocaleString()}
                        </p>
                      </div>
                      <motion.div
                        animate={{ x: [-5, 5, -5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-3xl text-royal-gold"
                      >
                        →
                      </motion.div>
                      <div>
                        <p className="text-gray-400 text-sm">After</p>
                        <p className="text-2xl font-bold text-gray-200">
                          {selectedEvent.population_after.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {selectedEvent.sources && selectedEvent.sources.length > 0 && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-royal-gold font-bold text-xl mb-3">Sources</h3>
                    <ul className="space-y-2">
                      {selectedEvent.sources.map((source, i) => (
                        <motion.li 
                          key={i}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-400 hover:text-blue-300 transition-colors 
                                     underline decoration-blue-400/30 hover:decoration-blue-300"
                          >
                            {source.title}
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedEvent(null)
                    audioManager.playClick()
                  }}
                  className="mt-8 px-8 py-3 bg-gradient-to-r from-royal-gold to-yellow-600 
                           text-black font-bold rounded-full 
                           shadow-[0_4px_20px_rgba(255,215,0,0.4)]
                           hover:shadow-[0_6px_30px_rgba(255,215,0,0.6)]
                           transition-all duration-300"
                >
                  Close
                </motion.button>
              </div>
              
              {/* Background decorations */}
              <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <VictoryIcon size={256} animate={false} />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </>
  )
}