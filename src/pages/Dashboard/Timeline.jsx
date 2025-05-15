import { motion } from 'framer-motion';

const mockTimeline = [
  {
    id: 1,
    title: 'Jane Doe joined as Diamond Orchid',
    time: '2 hours ago',
    icon: '💎'
  },
  {
    id: 2,
    title: 'Sarah Lee submitted profile',
    time: '4 hours ago',
    icon: '🌸'
  },
  {
    id: 3,
    title: 'Revenue milestone hit $89K',
    time: '1 day ago',
    icon: '📈'
  },
  {
    id: 4,
    title: 'New event: Empowerment Summit',
    time: '3 days ago',
    icon: '🎤'
  }
];

const Timeline = () => {
  return (
    <div className="bg-white/5 backdrop-blur border border-gold p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-gold mb-4">Elite Events Timeline</h3>
      <ul className="space-y-4">
        {mockTimeline.map((event, index) => (
          <motion.li
            key={event.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="flex items-start gap-3"
          >
            <div className="w-6 h-6 flex items-center justify-center text-lg bg-gold text-black rounded-full shrink-0">
              {event.icon}
            </div>
            <div>
              <p className="text-sm text-white">{event.title}</p>
              <span className="text-xs text-gray-400">{event.time}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;
