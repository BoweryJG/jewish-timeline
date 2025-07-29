import { useState } from 'react'
import { motion } from 'framer-motion'
import type { TimelineEvent } from '../lib/supabase'
import { VictoryIcon, StruggleIcon, AttackIcon, PopulationIcon } from './Icons/CategoryIcons'

interface TimelineProps {
  events: TimelineEvent[]
}

export default function Timeline({ events }: TimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'win': return 'bg-green-600'
      case 'struggle': return 'bg-orange-600'
      case 'attack': return 'bg-red-600'
      case 'population': return 'bg-blue-600'
      default: return 'bg-gray-600'
    }
  }

  const renderCategoryIcon = (category: string) => {
    switch (category) {
      case 'win': return <VictoryIcon size={30} animate={false} />
      case 'struggle': return <StruggleIcon size={30} animate={false} />
      case 'attack': return <AttackIcon size={30} animate={false} />
      case 'population': return <PopulationIcon size={30} animate={false} />
      default: return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative">
        {/* Timeline spine */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-royal-gold/30"></div>
        
        {/* Events */}
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative flex items-center mb-16 ${
              index % 2 === 0 ? 'justify-start' : 'justify-end'
            }`}
          >
            {/* Event card */}
            <div 
              className={`w-5/12 cursor-pointer ${
                index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'
              }`}
              onClick={() => setSelectedEvent(event)}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900 p-6 rounded-lg border border-royal-gold/20 hover:border-royal-gold/50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  {renderCategoryIcon(event.category)}
                  <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${getCategoryColor(event.category)}`}>
                    {event.category.toUpperCase()}
                  </span>
                  {event.severity_impact && (
                    <span className="text-xs text-gray-400">
                      Impact: {event.severity_impact}/10
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-royal-gold mb-1">
                  {event.title}
                </h3>
                
                <p className="text-sm text-gray-400 mb-2">
                  {new Date(event.start_date).getFullYear()} BCE/CE
                </p>
                
                <p className="text-gray-300 line-clamp-3">
                  {event.synopsis}
                </p>
              </motion.div>
            </div>
            
            {/* Timeline node */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-royal-gold rounded-full border-4 border-black z-10"></div>
          </motion.div>
        ))}
      </div>
      
      {/* Event detail modal */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 border border-royal-gold/50"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold text-royal-gold mb-4">
              {selectedEvent.title}
            </h2>
            
            <div className="text-gray-400 mb-4">
              <span>{new Date(selectedEvent.start_date).toLocaleDateString()}</span>
              {selectedEvent.location && (
                <span> • {selectedEvent.location.name}</span>
              )}
            </div>
            
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              {selectedEvent.synopsis}
            </p>
            
            {selectedEvent.population_before && selectedEvent.population_after && (
              <div className="bg-black/50 rounded p-4 mb-6">
                <h3 className="text-royal-gold font-semibold mb-2">Population Impact</h3>
                <p className="text-gray-300">
                  Before: {selectedEvent.population_before.toLocaleString()} → 
                  After: {selectedEvent.population_after.toLocaleString()}
                </p>
              </div>
            )}
            
            {selectedEvent.sources && selectedEvent.sources.length > 0 && (
              <div>
                <h3 className="text-royal-gold font-semibold mb-2">Sources</h3>
                <ul className="list-disc list-inside text-gray-400">
                  {selectedEvent.sources.map((source, i) => (
                    <li key={i}>
                      <a href={source.url} target="_blank" rel="noopener noreferrer" className="hover:text-royal-gold">
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-6 px-6 py-2 bg-royal-gold text-black font-semibold rounded hover:bg-yellow-600 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}