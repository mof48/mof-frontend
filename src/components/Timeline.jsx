// src/components/Timeline.jsx
import './Timeline.css';

const events = [
  {
    date: 'April 25, 2025',
    title: 'New Member: Jane Doe',
    description: 'Joined as Diamond Orchid ✨',
    icon: '💎'
  },
  {
    date: 'April 26, 2025',
    title: 'Revenue Milestone',
    description: '$90K Achieved in Memberships 💰',
    icon: '📈'
  },
  {
    date: 'April 27, 2025',
    title: 'New Guest Signup',
    description: 'Guest account created for Sarah Lee 🌸',
    icon: '🌟'
  },
  {
    date: 'April 28, 2025',
    title: 'Member Upgrade',
    description: 'Upgrade: Platinum Lily to Diamond Orchid 💎',
    icon: '🚀'
  }
];

function Timeline() {
  return (
    <div className="timeline-wrapper">
      <h2 className="timeline-title">Elite Events Timeline</h2>
      <div className="timeline">
        {events.map((event, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-icon">{event.icon}</div>
            <div className="timeline-content">
              <h3>{event.title}</h3>
              <span className="timeline-date">{event.date}</span>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
