import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* ✨ Hero Background Video */}
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src="/videos/MOF-hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔲 Dark overlay for readability */}
      <div className="overlay"></div>

      {/* 🌟 Hero Text Content */}
      <div className="content">
        <h1 className="glow">Manifestors of Freedom</h1>
        <p className="subtitle">
          An exclusive circle for elite women building legacy, wealth, and global influence.
        </p>
        <button className="home-btn" onClick={() => navigate('/login')}>
          Enter the Circle
        </button>
      </div>
    </div>
  );
};

export default Home;
