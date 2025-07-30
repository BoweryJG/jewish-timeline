import { motion } from 'framer-motion';

interface IconProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

// VICTORY ICON - Star of David transforming into rays of light
export const VictoryIcon = ({ size = 40, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={className}
    initial={{ scale: 0.8, rotate: 0 }}
    animate={animate ? { scale: [0.8, 1, 0.8], rotate: [0, 180, 360] } : {}}
    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
  >
    <defs>
      <radialGradient id="victoryGradient" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
        <stop offset="50%" stopColor="#FFA500" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#FF6347" stopOpacity="0.3" />
      </radialGradient>
      <filter id="victoryGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Star of David with light rays */}
    <g filter="url(#victoryGlow)">
      {/* Light rays */}
      {[...Array(12)].map((_, i) => (
        <motion.line
          key={i}
          x1="50"
          y1="50"
          x2={50 + 40 * Math.cos((i * 30 * Math.PI) / 180)}
          y2={50 + 40 * Math.sin((i * 30 * Math.PI) / 180)}
          stroke="url(#victoryGradient)"
          strokeWidth="2"
          opacity={0.6}
          animate={animate ? { 
            strokeWidth: [2, 4, 2],
            opacity: [0.3, 0.8, 0.3]
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1
          }}
        />
      ))}
      
      {/* Star of David */}
      <path
        d="M50 20 L65 40 L50 60 L35 40 Z M35 30 L65 30 L50 50 Z M35 50 L65 50 L50 30 Z"
        fill="none"
        stroke="url(#victoryGradient)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M50 20 L65 40 L50 60 L35 40 Z"
        fill="url(#victoryGradient)"
        opacity="0.5"
      />
    </g>
  </motion.svg>
);

// STRUGGLE ICON - Hands breaking chains that transform into doves
export const StruggleIcon = ({ size = 40, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={className}
  >
    <defs>
      <linearGradient id="struggleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF8C00" />
        <stop offset="100%" stopColor="#FF4500" />
      </linearGradient>
      <filter id="struggleGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <g filter="url(#struggleGlow)">
      {/* Broken chains */}
      <motion.path
        d="M30 50 Q35 45 40 50 T50 50 T60 50 T70 50"
        fill="none"
        stroke="url(#struggleGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        pathLength="1"
        animate={animate ? {
          pathLength: [0, 1, 0.5, 0],
          opacity: [1, 1, 0.5, 0]
        } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Rising fist */}
      <motion.path
        d="M40 70 L40 50 Q40 45 45 45 L55 45 Q60 45 60 50 L60 70 
           L60 65 L55 65 L55 60 L50 60 L50 65 L45 65 L45 60 L40 60 L40 70
           Q40 75 45 75 L55 75 Q60 75 60 70"
        fill="url(#struggleGradient)"
        stroke="url(#struggleGradient)"
        strokeWidth="2"
        animate={animate ? { y: [0, -10, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Transforming dove */}
      <motion.path
        d="M50 30 Q45 25 40 30 Q45 35 50 30 Q55 35 60 30 Q55 25 50 30"
        fill="url(#struggleGradient)"
        opacity={0}
        animate={animate ? {
          opacity: [0, 0, 1, 0],
          y: [0, -10, -20, -30],
          scale: [0.5, 1, 1.2, 0.5]
        } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </g>
  </motion.svg>
);

// ATTACK ICON - Shield shattering with explosive fragments
export const AttackIcon = ({ size = 40, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={className}
  >
    <defs>
      <radialGradient id="attackGradient" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#FF0000" />
        <stop offset="50%" stopColor="#DC143C" />
        <stop offset="100%" stopColor="#8B0000" />
      </radialGradient>
      <filter id="attackGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <g filter="url(#attackGlow)">
      {/* Shield base */}
      <path
        d="M50 20 Q30 25 30 40 L30 60 Q30 80 50 85 Q70 80 70 60 L70 40 Q70 25 50 20"
        fill="none"
        stroke="url(#attackGradient)"
        strokeWidth="3"
      />
      
      {/* Crack lines */}
      <motion.g
        animate={animate ? { opacity: [0, 1, 1, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <path d="M50 30 L45 45 L50 60" stroke="url(#attackGradient)" strokeWidth="2" />
        <path d="M50 30 L55 45 L50 60" stroke="url(#attackGradient)" strokeWidth="2" />
        <path d="M40 40 L50 45 L60 40" stroke="url(#attackGradient)" strokeWidth="2" />
      </motion.g>
      
      {/* Explosive fragments */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const x = 50 + 20 * Math.cos(angle);
        const y = 50 + 20 * Math.sin(angle);
        return (
          <motion.circle
            key={i}
            cx={50}
            cy={50}
            r="3"
            fill="url(#attackGradient)"
            initial={{ cx: 50, cy: 50, opacity: 0, scale: 0 }}
            animate={animate ? {
              cx: [50, x, x + 10 * Math.cos(angle)],
              cy: [50, y, y + 10 * Math.sin(angle)],
              opacity: [0, 1, 0],
              scale: [0, 1, 0.5]
            } : {
              cx: x,
              cy: y,
              opacity: 1,
              scale: 1
            }}
            transition={animate ? {
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1
            } : {}}
          />
        );
      })}
    </g>
  </motion.svg>
);

// POPULATION ICON - Tree of Life with flowing branches
export const PopulationIcon = ({ size = 40, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={className}
  >
    <defs>
      <linearGradient id="populationGradient" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#1E90FF" />
        <stop offset="50%" stopColor="#00BFFF" />
        <stop offset="100%" stopColor="#87CEEB" />
      </linearGradient>
      <filter id="populationGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <g filter="url(#populationGlow)">
      {/* Tree trunk */}
      <path
        d="M50 80 L50 60 M50 60 Q45 50 45 40 M50 60 Q55 50 55 40"
        stroke="url(#populationGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Flowing branches with people */}
      {[
        { x: 30, y: 40, delay: 0 },
        { x: 70, y: 40, delay: 0.2 },
        { x: 20, y: 30, delay: 0.4 },
        { x: 80, y: 30, delay: 0.6 },
        { x: 40, y: 25, delay: 0.8 },
        { x: 60, y: 25, delay: 1 }
      ].map((pos, i) => (
        <motion.g key={i}>
          {/* Branch */}
          <motion.path
            d={`M50 ${pos.y + 20} Q${(50 + pos.x) / 2} ${pos.y + 10} ${pos.x} ${pos.y}`}
            stroke="url(#populationGradient)"
            strokeWidth="2"
            fill="none"
            pathLength="1"
            animate={animate ? { pathLength: [0, 1] } : {}}
            transition={{ duration: 2, delay: pos.delay, repeat: Infinity }}
          />
          
          {/* Person symbol */}
          <motion.g
            animate={animate ? {
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.5]
            } : {}}
            transition={{ duration: 2, delay: pos.delay + 0.5, repeat: Infinity }}
          >
            <circle cx={pos.x || 50} cy={(pos.y - 5) || 45} r="3" fill="url(#populationGradient)" />
            <path
              d={`M${pos.x} ${pos.y - 2} L${pos.x} ${pos.y + 5} M${pos.x - 3} ${pos.y} L${pos.x + 3} ${pos.y}`}
              stroke="url(#populationGradient)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.g>
        </motion.g>
      ))}
      
      {/* Roots spreading */}
      <motion.g
        animate={animate ? { opacity: [0.5, 1, 0.5] } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <path d="M50 80 L40 90 M50 80 L50 90 M50 80 L60 90" 
              stroke="url(#populationGradient)" 
              strokeWidth="2" 
              strokeLinecap="round" />
      </motion.g>
    </g>
  </motion.svg>
);