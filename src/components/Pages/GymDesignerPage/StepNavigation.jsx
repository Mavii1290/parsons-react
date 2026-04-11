import React from 'react';
import styles from './StepNavigation.module.css';

const StepNavigation = ({ currentStep, totalSteps, onStepClick }) => {
  const steps = [
    'Display Size',
    'Design Options', 
    'Main Court',
    'Additional Courts',
    'Elements',
    'Review'
  ];

  return (
    <div className={styles.navigation}>
      <div className={styles.stepIndicators}>
        {steps.map((step, index) => (
          <div 
            key={index}
            className={`${styles.stepIndicator} ${
              index + 1 === currentStep ? styles.active : ''
            } ${index + 1 < currentStep ? styles.completed : ''}`}
            onClick={() => onStepClick(index + 1)}
          >
            <div className={styles.stepNumber}>{index + 1}</div>
            <div className={styles.stepLabel}>{step}</div>
          </div>
        ))}
      </div>
      
      <div className={styles.progressBar}>
        <div 
          className={styles.progress}
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default StepNavigation;