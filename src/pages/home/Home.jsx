import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <main className="hero-section">
      <div className="hero-text">
        <h1>Welcome to Movie Collection</h1>
        <p>Explore and create your favorite movie collections</p>
      </div>
      <div className="sections-container">
        <div className="section">
          <h2>See Whole Movie Collection</h2>
        </div>
        <div className="section">
          <h2>Personalized Collection</h2>
        </div>
        <div className="section">
          <h2>Edit or Delete Your Collection</h2>
        </div>
        <div className="section">
          <h2>Create Your Own Collection</h2>
        </div>
      </div>
    </main>
  );
};

export default Home;
