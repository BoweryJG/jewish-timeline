import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface VisualEffectProps {
  effect: string;
  isActive?: boolean;
}

// Ken Burns effect - subtle zoom and pan
export const KenBurnsEffect = ({ children }: { children: React.ReactNode }) => {
  const [animation, setAnimation] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation(prev => (prev + 1) % 4)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const animations = [
    { scale: 1, x: 0, y: 0 },
    { scale: 1.1, x: -10, y: -5 },
    { scale: 1.15, x: 10, y: 5 },
    { scale: 1.05, x: -5, y: 10 }
  ]

  return (
    <motion.div
      animate={animations[animation]}
      transition={{ duration: 8, ease: "easeInOut" }}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  )
}

// Divine light rays effect
export const LightRaysEffect = ({ color = '#FFD700' }: { color?: string }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 opacity-10"
          style={{
            left: `${20 * i}%`,
            width: '2px',
            height: '150%',
            background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
            transform: 'rotate(15deg)',
          }}
          animate={{
            opacity: [0.05, 0.2, 0.05],
            x: [-20, 20, -20],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Dust particles effect for ancient scenes
export const DustParticles = ({ density = 20 }: { density?: number }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(density)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-100 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, Math.random() * 30, 60],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  )
}

// Ethereal glow for divine moments
export const EtherealGlow = ({ color = '#4169E1' }: { color?: string }) => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        className="absolute inset-0 blur-3xl"
        style={{
          background: `radial-gradient(circle at center, ${color}40, transparent 70%)`,
        }}
      />
    </motion.div>
  )
}

// Water reflection effect
export const WaterReflection = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none">
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(64, 224, 208, 0.2), transparent)',
          filter: 'blur(4px)',
        }}
        animate={{
          scaleY: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

// Star twinkle effect for covenant scene
export const StarTwinkle = ({ count = 50 }: { count?: number }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}

// Main visual effects controller
export const TimelineVisualEffect = ({ effect, isActive = true }: VisualEffectProps) => {
  if (!isActive) return null

  switch (effect) {
    case 'lightRays':
      return <LightRaysEffect />
    case 'dustParticles':
      return <DustParticles />
    case 'etherealGlow':
      return <EtherealGlow />
    case 'waterReflection':
      return <WaterReflection />
    case 'starTwinkle':
      return <StarTwinkle />
    default:
      return null
  }
}