import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import type { TimelineEvent } from '../../lib/supabase';
// import { VictoryIcon, StruggleIcon, AttackIcon, PopulationIcon } from '../Icons/CategoryIcons';

interface TimelineCardProps {
  event: TimelineEvent;
  index: number;
}

export default function TimelineCard({ event, index }: TimelineCardProps) {
  const { setSelectedEvent } = useStore();
  const isLeft = index % 2 === 0;

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'win': return 'from-green-600/20 to-green-600/5 border-green-600/50';
      case 'struggle': return 'from-orange-600/20 to-orange-600/5 border-orange-600/50';
      case 'attack': return 'from-red-600/20 to-red-600/5 border-red-600/50';
      case 'population': return 'from-blue-600/20 to-blue-600/5 border-blue-600/50';
      default: return 'from-gray-600/20 to-gray-600/5 border-gray-600/50';
    }
  };

  return (
    <div className={`flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}>
      <motion.div
        whileHover={{ scale: 1.02, rotateY: 5 }}
        whileTap={{ scale: 0.98 }}
        className={`w-11/12 sm:w-5/12 cursor-pointer ${isLeft ? 'pr-8' : 'pl-8'}`}
        onClick={() => setSelectedEvent(event)}
        style={{ perspective: 1000 }}
      >
        <motion.div
          className={`relative bg-gradient-to-br ${getCategoryStyle(event.category)} 
                     backdrop-blur-md rounded-lg border p-6 
                     shadow-2xl transform-gpu`}
          initial={{ rotateX: 10 }}
          whileHover={{ rotateX: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* 3D depth layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg" />
          
          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-shrink-0">
                {/* Icons temporarily removed - TODO: restore when fixed */}
                <div className="w-8 h-8 rounded-full bg-royal-gold/20 flex items-center justify-center">
                  <span className="text-royal-gold text-lg font-bold">
                    {event.category === 'win' && '✓'}
                    {event.category === 'struggle' && '⚡'}
                    {event.category === 'attack' && '⚔'}
                    {event.category === 'population' && '👥'}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {event.category}
                </span>
                {event.severity_impact && (
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 w-3 rounded-full ${
                          i < (event.severity_impact || 0)
                            ? 'bg-royal-gold' 
                            : 'bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-royal-gold mb-2 leading-tight">
              {event.title}
            </h3>
            
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
              <span>{
                // Handle dates like "0586-01-01" as BCE dates
                event.start_date.startsWith('0') && event.start_date.length === 10
                  ? `-${parseInt(event.start_date.substring(0, 4))} BCE`
                  : new Date(event.start_date).getFullYear()
              }</span>
              {event.location && (
                <>
                  <span>•</span>
                  <span>{event.location.name}</span>
                </>
              )}
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
              {event.synopsis}
            </p>
            
            {event.population_before && event.population_after && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Population Impact</span>
                  <span className="text-royal-gold font-semibold">
                    {((event.population_after - event.population_before) / event.population_before * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            )}
          </div>
          
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-lg">
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-royal-gold/10 rotate-45" />
          </div>
        </motion.div>
      </motion.div>
      
      {/* Timeline node */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 
                   bg-royal-gold rounded-full border-4 border-black z-20
                   shadow-[0_0_20px_rgba(255,215,0,0.5)]"
      />
    </div>
  );
}