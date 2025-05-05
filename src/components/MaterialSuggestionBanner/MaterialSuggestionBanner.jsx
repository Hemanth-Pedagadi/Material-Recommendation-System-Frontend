import React from 'react';
import './MaterialSuggestionBanner.css';

const MaterialSuggestionBanner = ({ recommendedMaterials }) => {
  if (!recommendedMaterials || recommendedMaterials.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * recommendedMaterials.length);
  const selectedMaterial = recommendedMaterials[randomIndex];

  return (
    <div className="material-banner">
      <div className="banner-header">
        <h2 className="banner-title">🏗️ Suggested for You: {selectedMaterial.Material}</h2>
      </div>
      <div className="banner-details">
        <div className="banner-detail">
          <span className="detail-label">Durability:</span>
          <span className="detail-value">{selectedMaterial.Durability}</span>
        </div>
        <div className="banner-detail">
          <span className="detail-label">Cost/Unit:</span>
          <span className="detail-value">₹{selectedMaterial.Cost_Per_Unit}</span>
        </div>
        <div className="banner-detail">
          <span className="detail-label">Eco-Friendly:</span>
          <span className="detail-value">{selectedMaterial.Environmental_Suitability}</span>
        </div>
        <div className="banner-detail">
          <span className="detail-label">Fire Resistance:</span>
          <span className="detail-value">{selectedMaterial.Fire_Resistance}</span>
        </div>
      </div>
      <div className="banner-footer">
        <button className="more-info-btn">More Information</button>
      </div>
    </div>
  );
};

export default MaterialSuggestionBanner;
