import './Store.css';

const Store = () => {
  return (
    <div className="store-wrapper">
      <div className="store-hero">
        <h1 className="store-title">The MOF Luxury Boutique</h1>
        <p className="store-subtitle">Exclusive travel, fashion, and investment essentials ✨</p>
        <button className="store-btn">Shop Now</button>
      </div>

      <div className="store-grid">
        {/* Example Products */}
        <div className="store-card">
          <img src="/images/travel-package.jpg" alt="Luxury Travel" />
          <h3>Luxury Travel Packages</h3>
          <p>Curated journeys for the elite.</p>
          <button className="store-buy-btn">Explore</button>
        </div>

        <div className="store-card">
          <img src="/images/investment-course.jpg" alt="Investment Course" />
          <h3>Elite Investment Course</h3>
          <p>Grow your empire with expert guidance.</p>
          <button className="store-buy-btn">Learn More</button>
        </div>

        <div className="store-card">
          <img src="/images/designer-bag.jpg" alt="Designer Bag" />
          <h3>Designer Handbags</h3>
          <p>Elegant statement pieces.</p>
          <button className="store-buy-btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Store;
