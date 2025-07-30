import { motion } from 'framer-motion';

// TEMPORARY VERSION WITH NO CIRCLES TO DEBUG ERROR

const EpicLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-royal-gold mb-4">Loading Timeline...</h2>
        <motion.div
          className="text-royal-gold text-lg"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Preparing your journey through history
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EpicLoader;