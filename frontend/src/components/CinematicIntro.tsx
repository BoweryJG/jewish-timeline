import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ttsService } from '../services/ttsService';
import { huggingFaceTTS, playAudioFromUrl } from '../services/huggingFaceTTS';
import { audioManager } from '../utils/audioManager';

const inspirationalQuotes = [
  { 
    hebrew: "עַם יִשְׂרָאֵל חַי", 
    english: "The People of Israel Live",
    transliteration: "Am Yisrael Chai"
  },
  { 
    hebrew: "לְדוֹר וָדוֹר", 
    english: "From Generation to Generation",
    transliteration: "L'dor V'dor"
  },
  { 
    hebrew: "זָכוֹר", 
    english: "Remember",
    transliteration: "Zachor"
  }
];

const keyImages = [
  '/images/events/abraham-covenant.jpg',
  '/images/events/moses-parting-red-sea.jpg',
  '/images/events/king-david-jerusalem.jpg',
  '/images/events/temple-destruction.jpg',
  '/images/events/warsaw-ghetto-uprising.jpg',
  '/images/events/israel-independence.jpg',
  '/images/events/western-wall-liberation.jpg',
  '/images/events/modern-israel-innovation.jpg'
];

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [phase, setPhase] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const skipAvailable = true; // Always show skip button
  
  useEffect(() => {
    // Add keyboard listener for escape/space to skip
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        localStorage.setItem('skipIntro', 'true');
        onComplete();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    
    // Add error handling
    try {
      // Preload critical images
      keyImages.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onerror = () => console.warn('Failed to load image:', src);
      });
    
    // Skip timer no longer needed since we show skip immediately
    // const skipTimer = setTimeout(() => setSkipAvailable(true), 2000);
    
    // Phase progression with narration
    const phaseTimers = [
      setTimeout(() => {
        setPhase(1);
        // Soft ambient sound for light breaking through
        audioManager.playCategory('spiritual');
      }, 2000), // Black to light
      
      setTimeout(async () => {
        setPhase(2);
        // Use high-quality TTS for the first quote
        const quote = inspirationalQuotes[0];
        try {
          const audioUrl = await huggingFaceTTS.generateSpeech(quote.english, {
            language: 'en',
            speed: 0.8,
            emotion: 'inspirational'
          });
          if (audioUrl) {
            await playAudioFromUrl(audioUrl);
          }
        } catch (error) {
          // Fallback to browser TTS
          ttsService.speak(quote.english, { rate: 0.8, pitch: 0.9 });
        }
      }, 5000), // Light to quotes
      
      setTimeout(() => {
        setPhase(3);
        // Play triumphant sound for flag
        audioManager.playCategory('win');
      }, 12000), // Quotes to flag
      
      setTimeout(async () => {
        setPhase(4);
        // Use high-quality TTS for the introduction
        const introText = "Journey through 4,000 years of history, from Abraham's covenant to the modern State of Israel.";
        try {
          const audioUrl = await huggingFaceTTS.generateSpeech(introText, {
            language: 'en',
            speed: 0.85,
            emotion: 'narrative'
          });
          if (audioUrl) {
            await playAudioFromUrl(audioUrl);
          }
        } catch (error) {
          // Fallback to browser TTS
          ttsService.speak(introText, { rate: 0.85, pitch: 1.0 });
        }
      }, 16000), // Flag to introduction
      
      setTimeout(() => setPhase(5), 22000), // Introduction to timeline
      setTimeout(() => onComplete(), 25000) // Complete
    ];
    
    // Quote rotation with narration
    const quoteTimer = setInterval(async () => {
      if (phase === 2) {
        const newIndex = (quoteIndex + 1) % inspirationalQuotes.length;
        setQuoteIndex(newIndex);
        // Use high-quality TTS for quotes
        const quote = inspirationalQuotes[newIndex];
        try {
          const audioUrl = await huggingFaceTTS.generateSpeech(quote.english, {
            language: 'en',
            speed: 0.8,
            emotion: 'inspirational'
          });
          if (audioUrl) {
            await playAudioFromUrl(audioUrl);
          }
        } catch (error) {
          // Fallback to browser TTS
          ttsService.speak(quote.english, { rate: 0.8, pitch: 0.9 });
        }
      }
    }, 4500); // Increased interval to allow speech to complete
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      // clearTimeout(skipTimer); // No longer needed
      phaseTimers.forEach(timer => clearTimeout(timer));
      clearInterval(quoteTimer);
      ttsService.stop(); // Stop any ongoing speech
    };
    } catch (error) {
      console.error('Error in CinematicIntro:', error);
      onComplete(); // Skip intro on error
    }
  }, [phase, quoteIndex, onComplete]);
  
  const handleSkip = () => {
    localStorage.setItem('skipIntro', 'true');
    onComplete();
  };
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Skip button */}
        {skipAvailable && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
            onClick={handleSkip}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-50 text-gray-400 text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 
                     border border-gray-600 rounded hover:border-gray-400 transition-colors"
          >
            Skip Intro
          </motion.button>
        )}
        
        {/* Phase 0-1: Black to Light */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Light rays effect */}
              <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 0.3, 0],
                      scale: [0, 1, 1.5]
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                    className="absolute top-1/2 left-1/2 w-full h-1"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.3), transparent)',
                      transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                      transformOrigin: 'center',
                    }}
                  />
                ))}
              </div>
              
              {/* Central glow */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity
                }}
                className="absolute w-48 h-48 md:w-96 md:h-96 bg-gradient-radial from-yellow-400/20 to-transparent 
                         rounded-full blur-3xl"
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Phase 2: Inspirational Quotes */}
        <AnimatePresence mode="wait">
          {phase >= 2 && phase < 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8"
            >
              <motion.h1
                key={quoteIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-royal-gold mb-2 md:mb-4 text-center"
                style={{ fontFamily: 'serif' }}
              >
                {inspirationalQuotes[quoteIndex].hebrew}
              </motion.h1>
              <motion.p
                key={`trans-${quoteIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-2xl text-gray-400 mb-1 md:mb-2 italic"
              >
                {inspirationalQuotes[quoteIndex].transliteration}
              </motion.p>
              <motion.p
                key={`eng-${quoteIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-3xl text-white"
              >
                {inspirationalQuotes[quoteIndex].english}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Phase 3: Israeli Flag */}
        <AnimatePresence>
          {phase >= 3 && phase < 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Flag background with image fallback */}
              <div className="relative w-full max-w-xs md:max-w-2xl aspect-[3/2] mx-4">
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(0,56,184,0.5)',
                      '0 0 60px rgba(0,56,184,0.8)',
                      '0 0 20px rgba(0,56,184,0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-white rounded-lg overflow-hidden"
                >
                  {/* Blue stripes */}
                  <div className="absolute top-[15%] left-0 right-0 h-[15%] bg-[#0038b8]" />
                  <div className="absolute bottom-[15%] left-0 right-0 h-[15%] bg-[#0038b8]" />
                  
                  {/* Star of David */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-20 h-20 md:w-32 md:h-32" viewBox="0 0 100 100">
                      <path
                        d="M50 10 L61.5 35 L88.5 35 L66.5 52 L78 77 L50 60 L22 77 L33.5 52 L11.5 35 L38.5 35 Z"
                        fill="none"
                        stroke="#0038b8"
                        strokeWidth="4"
                        transform="rotate(30 50 50)"
                      />
                      <path
                        d="M50 10 L61.5 35 L88.5 35 L66.5 52 L78 77 L50 60 L22 77 L33.5 52 L11.5 35 L38.5 35 Z"
                        fill="none"
                        stroke="#0038b8"
                        strokeWidth="4"
                        transform="rotate(-30 50 50)"
                      />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Phase 4: Introduction */}
        <AnimatePresence>
          {phase >= 4 && phase < 5 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center px-4 md:px-8"
            >
              {/* Background montage of historical images */}
              <div className="absolute inset-0 opacity-20">
                {keyImages.map((src, i) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ 
                      opacity: [0, 0.5, 0],
                      scale: [1.2, 1, 0.8]
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 0.5,
                      repeat: Infinity,
                      repeatDelay: keyImages.length * 0.5 - 4
                    }}
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${src})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'blur(10px)'
                    }}
                  />
                ))}
              </div>
              
              {/* Introduction text */}
              <div className="relative z-10 max-w-full md:max-w-4xl text-center px-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-royal-gold mb-3 md:mb-6"
                >
                  The Jewish Timeline
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-4 md:mb-8 leading-relaxed"
                >
                  Journey through 4,000 years of history, from Abraham's covenant 
                  to the modern State of Israel. Witness the triumphs and trials, 
                  the exiles and returns, the tears and celebrations of a people 
                  who refused to disappear.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="text-sm md:text-lg text-gray-400"
                >
                  Swipe through time to explore each pivotal moment...
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Phase 5: Transition to timeline */}
        <AnimatePresence>
          {phase >= 5 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-b from-black via-deep-indigo/50 to-black"
            >
              <motion.div
                animate={{
                  scale: [1, 20],
                  opacity: [1, 0]
                }}
                transition={{ duration: 2, delay: 0.5 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                         w-16 h-16 md:w-32 md:h-32 bg-royal-gold rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}