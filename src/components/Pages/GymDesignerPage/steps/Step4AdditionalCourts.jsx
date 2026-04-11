import React from 'react';
import styles from './StepComponents.module.css';

const Step4AdditionalCourts = ({ additionalCourts, setAdditionalCourts, nextStep, prevStep }) => {
  const handleCourtToggle = (courtType) => {
    setAdditionalCourts(prev => ({
      ...prev,
      [courtType]: {
        ...prev[courtType],
        enabled: !prev[courtType].enabled
      }
    }));
  };

  const handleCourtDimensionChange = (courtType, dimension, value) => {
    setAdditionalCourts(prev => ({
      ...prev,
      [courtType]: {
        ...prev[courtType],
        [dimension]: parseInt(value)
      }
    }));
  };

  const courtTypes = [
    { key: 'sideBasketball', name: 'Side Basketball Court', standardWidth: 84, standardLength: 50 },
    { key: 'volleyball', name: 'Volleyball Court', standardWidth: 59, standardLength: 118 },
    { key: 'badminton', name: 'Badminton Court', standardWidth: 44, standardLength: 88 },
    { key: 'pickleball', name: 'Pickleball Court', standardWidth: 44, standardLength: 88 }
  ];

  return (
    <div className={styles.stepContainer}>
      <h2>Step 4: Additional Courts</h2>
      <p>Add more courts to your gym floor layout</p>
      
      <div className={styles.courtsList}>
        {courtTypes.map(court => (
          <div key={court.key} className={styles.courtOption}>
            <div className={styles.courtHeader}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={additionalCourts[court.key].enabled}
                  onChange={() => handleCourtToggle(court.key)}
                />
                <span>{court.name}</span>
              </label>
            </div>
            
            {additionalCourts[court.key].enabled && (
              <div className={styles.courtDimensions}>
                <div className={styles.dimensionInputs}>
                  <div className={styles.inputGroup}>
                    <label>Width (ft):</label>
                    <input
                      type="number"
                      value={additionalCourts[court.key].width}
                      onChange={(e) => handleCourtDimensionChange(court.key, 'width', e.target.value)}
                      min="20"
                      max="100"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Length (ft):</label>
                    <input
                      type="number"
                      value={additionalCourts[court.key].length}
                      onChange={(e) => handleCourtDimensionChange(court.key, 'length', e.target.value)}
                      min="20"
                      max="150"
                    />
                  </div>
                </div>
                <button 
                  className={styles.standardSizeButton}
                  onClick={() => handleCourtDimensionChange(court.key, 'width', court.standardWidth)}
                >
                  Use Standard Size ({court.standardWidth}' × {court.standardLength}')
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className={styles.stepActions}>
        <button onClick={prevStep} className={styles.prevButton}>
          ← Previous: Main Court
        </button>
        <button onClick={nextStep} className={styles.nextButton}>
          Next: Elements →
        </button>
      </div>
    </div>
  );
};

export default Step4AdditionalCourts;