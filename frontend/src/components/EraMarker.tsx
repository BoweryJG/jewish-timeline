import { motion } from 'framer-motion';

interface EraMarkerProps {
  era: string;
  year: string;
  description?: string;
  index: number;
}

export default function EraMarker({ era, year, description, index }: EraMarkerProps) {
  const isLeft = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className={`relative flex items-center mb-16 ${
        isLeft ? 'justify-start' : 'justify-end'
      }`}
    >
      {/* Era content */}
      <motion.div
        className={`w-5/12 ${isLeft ? 'pr-8 text-right' : 'pl-8'}`}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="relative"
          initial={{ x: isLeft ? -50 : 50 }}
          whileInView={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          {/* Decorative border */}
          <div className="absolute inset-0 bg-gradient-to-br from-royal-gold/20 to-transparent rounded-2xl blur-xl" />
          
          <div className="relative bg-black/60 backdrop-blur-md border-2 border-royal-gold/50 rounded-2xl p-6">
            <motion.h2 
              className="text-4xl font-bold text-royal-gold mb-2"
              style={{ fontFamily: 'Heebo, sans-serif' }}
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(255,215,0,0.5)',
                  '0 0 40px rgba(255,215,0,0.8)',
                  '0 0 20px rgba(255,215,0,0.5)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {era}
            </motion.h2>
            
            <p className="text-xl text-gray-300 font-medium">
              {year}
            </p>
            
            {description && (
              <p className="text-sm text-gray-400 mt-2">
                {description}
              </p>
            )}
            
            {/* Decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <svg viewBox="0 0 40 40" fill="none">
                <path
                  d="M20 5L24.33 15.5H35.31L26.49 22.5L30.82 33L20 26L9.18 33L13.51 22.5L4.69 15.5H15.67L20 5Z"
                  fill="#FFD700"
                  opacity="0.3"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Central marker */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <motion.div
          className="w-16 h-16 bg-gradient-to-br from-royal-gold to-yellow-600 rounded-full border-4 border-black shadow-[0_0_40px_rgba(255,215,0,0.8)]"
          animate={{
            boxShadow: [
              '0 0 40px rgba(255,215,0,0.8)',
              '0 0 60px rgba(255,215,0,1)',
              '0 0 40px rgba(255,215,0,0.8)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-br from-yellow-200 to-royal-gold"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{
              backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, transparent 50%)'
            }}
          />
        </motion.div>
        
        {/* Orbiting particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              marginTop: '-4px',
              marginLeft: '-4px',
            }}
            animate={{
              x: [
                Math.cos((i * 120) * Math.PI / 180) * 30,
                Math.cos((i * 120 + 360) * Math.PI / 180) * 30
              ],
              y: [
                Math.sin((i * 120) * Math.PI / 180) * 30,
                Math.sin((i * 120 + 360) * Math.PI / 180) * 30
              ],
            }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}