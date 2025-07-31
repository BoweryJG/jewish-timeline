import { motion } from 'framer-motion';

const EpicLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <motion.div
        className="text-royal-gold text-2xl font-bold"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        Loading Timeline...
      </motion.div>
    </div>
  );
};

export default EpicLoader;