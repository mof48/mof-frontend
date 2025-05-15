import { motion } from 'framer-motion';

const tierStyles = {
  'gold-rose': {
    flower: '🌹',
    color: 'text-gold',
    glow: 'drop-shadow-[0_0_10px_gold]',
  },
  'platinum-lily': {
    flower: '🌸',
    color: 'text-white',
    glow: 'drop-shadow-[0_0_10px_#e0e0ff]',
  },
  'diamond-orchid': {
    flower: '💎',
    color: 'text-orchid',
    glow: 'drop-shadow-[0_0_10px_#da70d6]',
  },
  guest: {
    flower: '🌼',
    color: 'text-pink-200',
    glow: 'drop-shadow-[0_0_10px_#fbb6ce]',
  },
  speaker: {
    flower: '🎤',
    color: 'text-yellow-300',
    glow: 'drop-shadow-[0_0_10px_#facc15]',
  },
};

const DashboardHero = ({ name = 'Member', tier = '', message }) => {
  const tierKey = tier.toLowerCase();
  const { flower, color, glow } = tierStyles[tierKey] || {
    flower: '🌟',
    color: 'text-white',
    glow: 'drop-shadow-md',
  };

  return (
    <div className="text-center mb-10">
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`text-4xl sm:text-5xl font-extrabold tracking-wide ${color} ${glow}`}
      >
        Welcome, {name} {flower}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-pink-200 mt-2 italic text-lg"
      >
        {message || 'Your journey to legacy and luxury starts here.'}
      </motion.p>
    </div>
  );
};

export default DashboardHero;
