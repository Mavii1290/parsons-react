import React from 'react';
import styles from './StepComponents.module.css';

const Step3MainCourt = ({ mainCourt, setMainCourt, nextStep, prevStep }) => {
  const handleToggle = (property) => {
    setMainCourt(prev => ({ ...prev, [property]: !prev[property] }));
  };

  const handleDimensionChange = (dimension, value) => {
    setMainCourt(prev => ({ ...prev, [dimension]: parseInt(value) }));
  };

  const handleCourtTypeChange = (type) => {
    setMainCourt(prev => ({ ...prev, type }));
  };

  return (
    <div className={styles.stepContainer}>
      <h2>Step 3: Main Court Configuration</h2>
      <p>Configure your main basketball court elements</p>
      
      <div className={styles.stepSection}>
        <h3>Court Type</h3>
        <div className={styles.radioGroup}>
          <label className={styles.radioOption}>
            <input
              type="radio"
              name="courtType"
              checked={mainCourt.type === 'basketball'}
              onChange={() => handleCourtTypeChange('basketball')}
            />
            <span>Basketball Court</span>
          </label>
          <label className={styles.radioOption}>
            <input
              type="radio"
              name="courtType"
              checked={mainCourt.type === 'volleyball'}
              onChange={() => handleCourtTypeChange('volleyball')}
            />
            <span>Volleyball Court</span>
          </label>
        </div>
      </div>
      
      <div className={styles.stepSection}>
        <h3>Court Dimensions</h3>
        <div className={styles.dimensionInputs}>
          <div className={styles.inputGroup}>
            <label>Width (ft):</label>
            <input
              type="number"
              value={mainCourt.width}
              onChange={(e) => handleDimensionChange('width', e.target.value)}
              min="50"
              max="120"
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Length (ft):</label>
            <input
              type="number"
              value={mainCourt.length}
              onChange={(e) => handleDimensionChange('length', e.target.value)}
              min="50"
              max="120"
            />
          </div>
        </div>
      </div>
      
      <div className={styles.stepSection}>
        <h3>Court Elements</h3>
        <div className={styles.elementToggles}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={mainCourt.enabled}
              onChange={() => handleToggle('enabled')}
            />
            Enable Main Court
          </label>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={mainCourt.showKey}
              onChange={() => handleToggle('showKey')}
            />
            Show Key/Paint Area
          </label>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={mainCourt.showKeyArch}
              onChange={() => handleToggle('showKeyArch')}
            />
            Show Key Arch
          </label>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={mainCourt.showThreePoint}
              onChange={() => handleToggle('showThreePoint')}
            />
            Show 3-Point Line
          </label>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={mainCourt.showCenterCircle}
              onChange={() => handleToggle('showCenterCircle')}
            />
            Show Center Circle
          </label>
        </div>
      </div>
      
      <div className={styles.stepActions}>
        <button onClick={prevStep} className={styles.prevButton}>
          ← Previous: Design Options
        </button>
        <button onClick={nextStep} className={styles.nextButton}>
          Next: Additional Courts →
        </button>
      </div>
    </div>
  );
};

export default Step3MainCourt;