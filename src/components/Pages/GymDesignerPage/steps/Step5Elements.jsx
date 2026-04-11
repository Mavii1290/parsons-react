import React, { useState } from 'react';
import styles from './StepComponents.module.css';

const Step5Elements = ({ elements, setElements, nextStep, prevStep }) => {
  const handleToggle = (elementType) => {
    setElements(prev => ({
      ...prev,
      [elementType]: {
        ...prev[elementType],
        enabled: !prev[elementType].enabled
      }
    }));
  };

  const handleCountChange = (elementType, count) => {
    setElements(prev => ({
      ...prev,
      [elementType]: {
        ...prev[elementType],
        count: parseInt(count)
      }
    }));
  };

  const handleRangeChange = (elementType, range) => {
    setElements(prev => ({
      ...prev,
      [elementType]: {
        ...prev[elementType],
        range: range
      }
    }));
  };

  const handleLengthChange = (elementType, length) => {
    setElements(prev => ({
      ...prev,
      [elementType]: {
        ...prev[elementType],
        length: parseInt(length)
      }
    }));
  };

  const elementConfigs = [
    {
      key: 'bowlingPinMarkers',
      name: 'Bowling Pin Markers',
      description: 'Add bowling pin markers to your court',
      hasCount: true,
      countLabel: 'Number of Pins:',
      minCount: 1,
      maxCount: 15
    },
    {
      key: 'baseballBases',
      name: 'Baseball Bases',
      description: 'Add baseball base markers',
      hasCount: false
    },
    {
      key: 'numbersAndLetters',
      name: 'Numbers and Letters',
      description: 'Add numbered markers (1-24)',
      hasCount: true,
      countLabel: 'Range:',
      countType: 'select',
      options: ['1-12', '1-24', 'A-Z', '1-36']
    },
    {
      key: 'agilityLadder',
      name: 'Agility Ladder',
      description: 'Add agility ladder markings',
      hasCount: true,
      countLabel: 'Length (ft):',
      minCount: 5,
      maxCount: 30
    },
    {
      key: 'agilityDots',
      name: 'Agility Dots',
      description: 'Add agility dot markers',
      hasCount: true,
      countLabel: 'Number of Dots:',
      minCount: 4,
      maxCount: 20
    }
  ];

  return (
    <div className={styles.stepContainer}>
      <h2>Step 5: Additional Elements</h2>
      <p>Add training and sports elements to your gym floor</p>
      
      <div className={styles.elementsList}>
        {elementConfigs.map(config => (
          <div key={config.key} className={styles.elementOption}>
            <div className={styles.elementHeader}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={elements[config.key].enabled}
                  onChange={() => handleToggle(config.key)}
                />
                <span>{config.name}</span>
              </label>
              <p className={styles.elementDescription}>{config.description}</p>
            </div>
            
            {elements[config.key].enabled && config.hasCount && (
              <div className={styles.elementSettings}>
                <div className={styles.inputGroup}>
                  <label>{config.countLabel}</label>
                  {config.countType === 'select' ? (
                    <select
                      value={elements[config.key].range}
                      onChange={(e) => handleRangeChange(config.key, e.target.value)}
                    >
                      {config.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="number"
                      value={elements[config.key].count || elements[config.key].length}
                      onChange={(e) => 
                        config.key === 'agilityLadder' 
                          ? handleLengthChange(config.key, e.target.value)
                          : handleCountChange(config.key, e.target.value)
                      }
                      min={config.minCount}
                      max={config.maxCount}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className={styles.stepActions}>
        <button onClick={prevStep} className={styles.prevButton}>
          ← Previous: Additional Courts
        </button>
        <button onClick={nextStep} className={styles.nextButton}>
          Next: Review →
        </button>
      </div>
    </div>
  );
};

export default Step5Elements;