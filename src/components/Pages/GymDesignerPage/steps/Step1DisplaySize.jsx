import React from 'react';
import styles from './StepComponents.module.css';

const Step1DisplaySize = ({ displaySize, setDisplaySize, nextStep }) => {
  const handleSizeChange = (type) => {
    let newSize = { ...displaySize, type };
    
    switch (type) {
      case 'high-school':
        newSize.width = 84;
        newSize.length = 50;
        break;
      case 'university':
        newSize.width = 94;
        newSize.length = 50;
        break;
      case 'custom':
        // Keep current custom dimensions
        break;
      case 'none':
        newSize.width = 100;
        newSize.length = 100;
        break;
    }
    
    setDisplaySize(newSize);
  };

  const handleDimensionChange = (dimension, value) => {
    setDisplaySize(prev => ({
      ...prev,
      [dimension]: parseInt(value),
      type: 'custom'
    }));
  };

  const handleZoomChange = (delta) => {
    const newZoom = Math.max(0.5, Math.min(3, displaySize.zoom + delta));
    setDisplaySize(prev => ({ ...prev, zoom: newZoom }));
  };

  return (
    <div className={styles.stepContainer}>
      <h2>Step 1: Display Size</h2>
      <p>Choose your court display size and dimensions</p>
      
      <div className={styles.sizeOptions}>
        <h3>Standard Sizes</h3>
        <div className={styles.radioGroup}>
          <label className={styles.radioOption}>
            <input
              type="radio"
              name="courtSize"
              checked={displaySize.type === 'high-school'}
              onChange={() => handleSizeChange('high-school')}
            />
            <div className={styles.radioContent}>
              <strong>High School Standard</strong>
              <span>84' × 50' court lines</span>
            </div>
          </label>
          
          <label className={styles.radioOption}>
            <input
              type="radio"
              name="courtSize"
              checked={displaySize.type === 'university'}
              onChange={() => handleSizeChange('university')}
            />
            <div className={styles.radioContent}>
              <strong>University Standard</strong>
              <span>94' × 50' court lines</span>
            </div>
          </label>
          
          <label className={styles.radioOption}>
            <input
              type="radio"
              name="courtSize"
              checked={displaySize.type === 'none'}
              onChange={() => handleSizeChange('none')}
            />
            <div className={styles.radioContent}>
              <strong>No Main Court</strong>
              <span>100' × 100' floor space</span>
            </div>
          </label>
        </div>
      </div>
      
      <div className={styles.customDimensions}>
        <h3>Custom Dimensions</h3>
        <div className={styles.dimensionInputs}>
          <div className={styles.inputGroup}>
            <label>Floor Width (ft):</label>
            <input
              type="number"
              value={displaySize.width}
              onChange={(e) => handleDimensionChange('width', e.target.value)}
              min="50"
              max="200"
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Floor Length (ft):</label>
            <input
              type="number"
              value={displaySize.length}
              onChange={(e) => handleDimensionChange('length', e.target.value)}
              min="50"
              max="200"
            />
          </div>
        </div>
      </div>
      
      <div className={styles.zoomControls}>
        <h3>Zoom Level</h3>
        <div className={styles.zoomButtons}>
          <button onClick={() => handleZoomChange(-0.1)}>-</button>
          <span>{displaySize.zoom.toFixed(1)}x</span>
          <button onClick={() => handleZoomChange(0.1)}>+</button>
        </div>
      </div>
      
      <div className={styles.stepActions}>
        <button onClick={nextStep} className={styles.nextButton}>
          Next: Design Options →
        </button>
      </div>
    </div>
  );
};

export default Step1DisplaySize;