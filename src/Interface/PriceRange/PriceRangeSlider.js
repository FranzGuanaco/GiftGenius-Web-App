import React, { useState } from 'react';
import './PriceRangeSlider.css';

const PriceRangeSlider = () => {
  const [minValue, setMinValue] = useState(250);
  const [maxValue, setMaxValue] = useState(1000);
  const maxRange = 1000;

  const handleMinChange = (e) => {
    setMinValue(Math.max(Number(e.target.value), 0));
  };

  const handleMaxChange = (e) => {
    setMaxValue(Math.min(Number(e.target.value), maxRange));
  };

  return (
    <div className="PriceRangeSlider-container"> {/* Utilisation de la classe parente */}
      <div className="d-flex">
        <div className="wrapperRangePrice">
          <div className="price-input">
            <div className="field">
              <span className="fontSlider">Min</span>
              <input type="number" className="input-minFont" value={minValue} onChange={handleMinChange} />
            </div>
            <div className="fieldSeparator">
              <div className="separator">-</div>
            </div>
            <div className="field">
              <span className="fontSlider">Max</span>
              <input type="number" className="input-max" value={maxValue} onChange={handleMaxChange} />
            </div>
          </div>
          <div className="slider">
            <div className="progress" style={{ left: `${(minValue / maxRange) * 100}%`, right: `${100 - (maxValue / maxRange) * 100}%` }}></div>
          </div>
          <div className="range-input">
            <input type="range" className="range-min" min="0" max="1000" value={minValue} step="10" onChange={handleMinChange} />
            <input type="range" className="range-max" min="0" max="1000" value={maxValue} step="10" onChange={handleMaxChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;

