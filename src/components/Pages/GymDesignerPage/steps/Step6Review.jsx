import React from 'react';
import styles from './StepComponents.module.css';

const Step6Review = ({ 
  displaySize, 
  designOptions, 
  mainCourt, 
  additionalCourts, 
  elements,
  prevStep,
  handleSave,
  handleDownload 
}) => {
  const renderCourtSummary = () => {
    const courts = [];
    
    if (mainCourt.enabled) {
      courts.push({
        name: 'Main Court',
        type: mainCourt.type,
        size: `${mainCourt.width}' × ${mainCourt.length}'`,
        features: []
      });
    }
    
    Object.entries(additionalCourts).forEach(([key, court]) => {
      if (court.enabled) {
        const courtNames = {
          sideBasketball: 'Side Basketball',
          volleyball: 'Volleyball',
          badminton: 'Badminton',
          pickleball: 'Pickleball'
        };
        
        courts.push({
          name: courtNames[key],
          type: key,
          size: `${court.width}' × ${court.length}'`,
          features: []
        });
      }
    });
    
    return courts;
  };

  const renderElementSummary = () => {
    const activeElements = [];
    
    Object.entries(elements).forEach(([key, element]) => {
      if (element.enabled) {
        const elementNames = {
          bowlingPinMarkers: 'Bowling Pin Markers',
          baseballBases: 'Baseball Bases',
          numbersAndLetters: 'Numbers and Letters',
          agilityLadder: 'Agility Ladder',
          agilityDots: 'Agility Dots'
        };
        
        let details = '';
        if (element.count) details += ` (${element.count})`;
        if (element.length) details += ` (${element.length}ft)`;
        if (element.range) details += ` (${element.range})`;
        
        activeElements.push({
          name: elementNames[key],
          details: details
        });
      }
    });
    
    return activeElements;
  };

  const courts = renderCourtSummary();
  const activeElements = renderElementSummary();

  return (
    <div className={styles.stepContainer}>
      <h2>Step 6: Review Your Design</h2>
      <p>Review all your selections before finalizing</p>
      
      <div className={styles.reviewContainer}>
        <div className={styles.reviewSection}>
          <h3>Display Size</h3>
          <div className={styles.reviewItem}>
            <strong>Type:</strong> {displaySize.type.replace('-', ' ').toUpperCase()}
          </div>
          <div className={styles.reviewItem}>
            <strong>Dimensions:</strong> {displaySize.width}' × {displaySize.length}'
          </div>
          <div className={styles.reviewItem}>
            <strong>Zoom Level:</strong> {displaySize.zoom}x
          </div>
        </div>
        
        <div className={styles.reviewSection}>
          <h3>Design Options</h3>
          <div className={styles.reviewItem}>
            <strong>Border Thickness:</strong> {designOptions.borderSize}" 
          </div>
          <div className={styles.reviewItem}>
            <strong>Line Color:</strong> 
            <div className={styles.colorPreview} style={{ backgroundColor: designOptions.lineColor }}></div>
          </div>
          {designOptions.centerCourtLogo && (
            <div className={styles.reviewItem}>
              <strong>Center Court Logo:</strong> 
              <img src={designOptions.centerCourtLogo} alt="Logo" className={styles.logoPreviewSmall} />
            </div>
          )}
        </div>
        
        <div className={styles.reviewSection}>
          <h3>Main Court</h3>
          <div className={styles.reviewItem}>
            <strong>Status:</strong> {mainCourt.enabled ? 'Enabled' : 'Disabled'}
          </div>
          {mainCourt.enabled && (
            <>
              <div className={styles.reviewItem}>
                <strong>Type:</strong> {mainCourt.type}
              </div>
              <div className={styles.reviewItem}>
                <strong>Size:</strong> {mainCourt.width}' × {mainCourt.length}'
              </div>
              <div className={styles.reviewItem}>
                <strong>Elements:</strong> 
                {mainCourt.showKey && ' Key,'}
                {mainCourt.showKeyArch && ' Key Arch,'}
                {mainCourt.showThreePoint && ' 3-Point,'}
                {mainCourt.showCenterCircle && ' Center Circle'}
              </div>
            </>
          )}
        </div>
        
        <div className={styles.reviewSection}>
          <h3>Additional Courts</h3>
          {courts.length > 1 ? (
            courts.slice(1).map((court, index) => (
              <div key={index} className={styles.reviewItem}>
                <strong>{court.name}:</strong> {court.size}
              </div>
            ))
          ) : (
            <div className={styles.reviewItem}>No additional courts</div>
          )}
        </div>
        
        <div className={styles.reviewSection}>
          <h3>Additional Elements</h3>
          {activeElements.length > 0 ? (
            activeElements.map((element, index) => (
              <div key={index} className={styles.reviewItem}>
                <strong>{element.name}:</strong> {element.details}
              </div>
            ))
          ) : (
            <div className={styles.reviewItem}>No additional elements</div>
          )}
        </div>
      </div>
      
      <div className={styles.finalActions}>
        <button onClick={prevStep} className={styles.prevButton}>
          ← Previous: Elements
        </button>
        <button onClick={handleSave} className={styles.saveButton}>
          Save Design
        </button>
        <button onClick={handleDownload} className={styles.downloadButton}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Step6Review;