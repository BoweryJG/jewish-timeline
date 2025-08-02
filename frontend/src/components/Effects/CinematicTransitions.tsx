import { motion } from 'framer-motion';

export const fadeTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 1.5, ease: "easeInOut" }
};

export const slideTransition = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
  transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }
};

export const scaleTransition = {
  initial: { scale: 1.2, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
  transition: { duration: 1.2, ease: "easeOut" }
};

export const splitTransition = {
  initial: { 
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
    opacity: 0 
  },
  animate: { 
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    opacity: 1 
  },
  exit: { 
    clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
    opacity: 0 
  },
  transition: { duration: 1, ease: "easeInOut" }
};

// Film burn transition effect
export const FilmBurnTransition = ({ children, isActive }: { children: React.ReactNode, isActive: boolean }) => {
  return (
    <motion.div
      className="relative w-full h-full"
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.3, times: [0, 0.5, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 mix-blend-screen opacity-50" />
          <div className="absolute inset-0 bg-noise opacity-20" />
        </motion.div>
      )}
    </motion.div>
  );
};

// Glitch transition effect
export const GlitchTransition = ({ children, isActive }: { children: React.ReactNode, isActive: boolean }) => {
  return (
    <div className="relative w-full h-full">
      {children}
      {isActive && (
        <>
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              x: [0, -5, 5, -3, 3, 0],
              opacity: [0, 1, 1, 1, 1, 0]
            }}
            transition={{ duration: 0.5 }}
            style={{ mixBlendMode: 'screen' }}
          >
            <div className="w-full h-full bg-red-500 opacity-30" />
          </motion.div>
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              x: [0, 5, -5, 3, -3, 0],
              opacity: [0, 1, 1, 1, 1, 0]
            }}
            transition={{ duration: 0.5, delay: 0.05 }}
            style={{ mixBlendMode: 'screen' }}
          >
            <div className="w-full h-full bg-blue-500 opacity-30" />
          </motion.div>
        </>
      )}
    </div>
  );
};

// Blur fade transition
export const BlurFadeTransition = ({ children, blur = 20 }: { children: React.ReactNode, blur?: number }) => {
  return (
    <motion.div
      initial={{ filter: `blur(${blur}px)`, opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 1 }}
      exit={{ filter: `blur(${blur}px)`, opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

// Reveal mask transition
export const RevealMaskTransition = ({ children, direction = 'left' }: { children: React.ReactNode, direction?: 'left' | 'right' | 'top' | 'bottom' }) => {
  const getClipPath = () => {
    switch (direction) {
      case 'left':
        return {
          initial: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
          animate: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          exit: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
        };
      case 'right':
        return {
          initial: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
          animate: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          exit: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
        };
      case 'top':
        return {
          initial: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
          animate: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          exit: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
        };
      case 'bottom':
        return {
          initial: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
          animate: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          exit: 'polygon(0 0, 100% 0, 100% 0, 0 0)'
        };
    }
  };

  const clipPaths = getClipPath();

  return (
    <motion.div
      initial={{ clipPath: clipPaths.initial }}
      animate={{ clipPath: clipPaths.animate }}
      exit={{ clipPath: clipPaths.exit }}
      transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

// Cross dissolve with color overlay
export const CrossDissolveTransition = ({ children, color = '#FFD700' }: { children: React.ReactNode, color?: string }) => {
  return (
    <motion.div className="relative w-full h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 1.5, times: [0, 0.5, 1] }}
        style={{ backgroundColor: color, mixBlendMode: 'overlay' }}
      />
    </motion.div>
  );
};