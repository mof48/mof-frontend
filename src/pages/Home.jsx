import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="home-hero">
      {/* 🎥 Background video */}
      <video className="home-video" autoPlay muted loop playsInline>
        <source src="/videos/MOF-hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🌑 Overlay for contrast */}
      <div className="home-overlay"></div>

      {/* ✨ Content Layer */}
      <div className="home-content">
        <h1 className="home-title glow">Manifestors of Freedom</h1>
        <p className="home-subtitle">
          An exclusive circle for elite women building legacy, wealth, and global influence.
        </p>
        <button className="home-button" onClick={() => navigate('/login')}>
          Enter the Circle
        </button>
      </div>
    </section>
  );
};

export default Home;
