import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface ParticleSystemProps {
  category: 'win' | 'struggle' | 'attack' | 'population';
  isActive: boolean;
}

export default function GhibliParticles({ category, isActive }: ParticleSystemProps) {
  const particles = useMemo(() => {
    const count = category === 'win' ? 20 : category === 'attack' ? 15 : 12;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }));
  }, [category]);

  const getParticleStyle = () => {
    switch (category) {
      case 'win':
        return {
          particle: 'bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-[0_0_10px_rgba(255,215,0,0.8)]',
          glow: true
        };
      case 'struggle':
        return {
          particle: 'bg-gradient-to-br from-orange-400 to-orange-600',
          glow: false
        };
      case 'attack':
        return {
          particle: 'bg-gradient-to-br from-red-500 to-red-700',
          glow: true
        };
      case 'population':
        return {
          particle: 'bg-gradient-to-br from-blue-400 to-blue-600',
          glow: false
        };
    }
  };

  const style = getParticleStyle();

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${style.particle}`}
          style={{
            width: particle.size,
            height: particle.size,
            left: '50%',
            top: '50%',
          }}
          initial={{ 
            x: 0, 
            y: 0, 
            opacity: 0,
            scale: 0 
          }}
          animate={{
            x: particle.x,
            y: particle.y,
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1.2, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatDelay: 1,
            ease: 'easeOut'
          }}
        >
          {style.glow && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${
                  category === 'win' ? 'rgba(255,215,0,0.6)' : 'rgba(255,0,0,0.6)'
                } 0%, transparent 70%)`,
                filter: 'blur(4px)',
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0.4, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          )}
        </motion.div>
      ))}
      
      {/* Special effects for each category */}
      {category === 'win' && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-gradient-radial from-yellow-400/20 via-transparent to-transparent" />
        </motion.div>
      )}
      
      {category === 'attack' && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`flame-${i}`}
              className="absolute bottom-0 left-1/2"
              style={{
                width: '60px',
                height: '80px',
                marginLeft: (i - 1) * 30,
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                y: [0, -40, -80],
                x: [0, (i - 1) * 10, (i - 1) * 20],
                scale: [0.8, 1.2, 0.5],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.3,
                repeat: Infinity,
                ease: 'easeOut'
              }}
            >
              <div className="w-full h-full bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded-full filter blur-sm" />
            </motion.div>
          ))}
        </>
      )}
    </div>
  );
}