import React, { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import MaterialSuggestionBanner from '../MaterialSuggestionBanner/MaterialSuggestionBanner';
import SlidingImageCarousel from '../SlidingImageCarousel/SlidingImageCarousel';

const MaterialRecommendation = () => {
  const [budget, setBudget] = useState("");
  const [minDurability, setMinDurability] = useState("");
  const [environmentalSuitability, setEnvironmentalSuitability] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://material-recommendation-backend.vercel.app/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budget: Number(budget),
          min_durability: Number(minDurability),
          environmental_suitability: environmentalSuitability,
        }),
      });

      const data = await response.json();

      if (data.length > 0) {
        setRecommendations(data);
        setShowResults(true);
      } else {
        setRecommendations([]);
        setShowResults(false);
        alert("No materials matched your criteria.");
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      alert("Failed to fetch recommendations.");
    }
  };

  return (
    <div className="home-page-body">
      <header className="header">
        <h1>Construction Material Recommendation System</h1>
        <nav>
          <ul>
            <li><Link to="/">Logout</Link></li>
          </ul>
        </nav>
      </header>

      <section className="intro">
        <h2>Welcome to the Material Recommendation System</h2>
        <p>Find the best materials for your construction needs.</p>
        <p>Use the form below to get personalized recommendations based on your budget and requirements.</p>
      </section>

      <section className="recommendation-form">
        <h2>Material Recommendation</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="budget">Budget:</label>
            <input
              id="budget"
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="minDurability">Min Durability:</label>
            <input
              id="minDurability"
              type="number"
              value={minDurability}
              onChange={(e) => setMinDurability(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="environmentalSuitability">Environmental Suitability:</label>
            <select
              id="environmentalSuitability"
              value={environmentalSuitability}
              onChange={(e) => setEnvironmentalSuitability(e.target.value)}
            >
              <option value="">Any</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <button type="submit">Get Recommendations</button>
        </form>
      </section>

      {showResults && (
        <section className="recommendations">
          <h3>Recommended Materials</h3>
          <MaterialSuggestionBanner recommendedMaterials={recommendations} />
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Durability</th>
                <th>Cost Per Unit</th>
                <th>Environmental Suitability</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((material, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>{material.Material}</td>
                    <td>{material.Durability}</td>
                    <td>{material.Cost_Per_Unit}</td>
                    <td>{material.Environmental_Suitability}</td>
                    <td>{material.Availability}</td>
                  </tr>
                  <tr>
                    <td colSpan="5">
                      <SlidingImageCarousel materialName={material.Material} />
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <footer className="footer">
        <p>
          🏗️ Helps users find the most suitable building materials based on their budget, durability needs, and environmental preferences. Powered by intelligent data-driven recommendations and real-time visuals, this platform ensures smarter, safer, and more sustainable construction decisions.
        </p>
        <p>
          © {new Date().getFullYear()} | Developed with ❤️ by Hemanth
        </p>
      </footer>
    </div>
  );
};

export default MaterialRecommendation;
