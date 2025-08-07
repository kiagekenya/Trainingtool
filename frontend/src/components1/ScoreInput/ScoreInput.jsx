import React from "react";
import "./ScoreInput.css";

export default function InputForm({ title, scores, onChange, categories }) {
  return (
    <div className="modern-input-form">
      <h3 className="form-title">{title}</h3>
      <div className="form-grid">
        {categories.map((category) => (
          <div key={category} className="form-field">
            <label htmlFor={category}>{category}</label>
            <div className="input-container">
              <input
                type="number"
                id={category}
                name={category}
                value={scores[category] || 0}
                onChange={onChange}
                min="0"
                max="5"
                className="score-input"
              />
              <div className="input-decoration"></div>
            </div>
            <div className="score-indicator">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`indicator-dot ${i < (scores[category] || 0) ? 'active' : ''}`}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}