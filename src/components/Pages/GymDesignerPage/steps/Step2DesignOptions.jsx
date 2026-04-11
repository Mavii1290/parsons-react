import React, { useState, useRef } from 'react';
import styles from './StepComponents.module.css';

const Step2DesignOptions = ({ designOptions, setDesignOptions, nextStep, prevStep }) => {
  const fileInputRef = useRef(null);
  const [uploadedLogo, setUploadedLogo] = useState(designOptions.centerCourtLogo);

  const handleColorChange = (property, color) => {
    setDesignOptions(prev => ({ ...prev, [property]: color }));
  };

  const handleBorderSizeChange = (size) => {
    setDesignOptions(prev => ({ ...prev, borderSize: parseInt(size) }));
  };

  const handleFontChange = (font) => {
    setDesignOptions(prev => ({ ...prev, borderFont: font }));
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoDataUrl = e.target.result;
        setUploadedLogo(logoDataUrl);
        setDesignOptions(prev => ({ ...prev, centerCourtLogo: logoDataUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setUploadedLogo(null);
    setDesignOptions(prev => ({ ...prev, centerCourtLogo: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.stepContainer}>
      <h2>Step 2: Design Options</h2>
      <p>Customize borders, colors, and add your logo</p>
      
      {/* Border Settings */}
      <div className={styles.designSection}>
        <h3>Border Settings</h3>
        <div className={styles.borderControls}>
          <div className={styles.inputGroup}>
            <label>Border Thickness (inches):</label>
            <input
              type="number"
              value={designOptions.borderSize}
              onChange={(e) => handleBorderSizeChange(e.target.value)}
              min="1"
              max="12"
            />
          </div>
          
          <div className={styles.colorRow}>
            <div className={styles.colorInput}>
              <label>Top Border:</label>
              <input
                type="color"
                value={designOptions.borderColorTop}
                onChange={(e) => handleColorChange('borderColorTop', e.target.value)}
              />
            </div>
            <div className={styles.colorInput}>
              <label>Bottom Border:</label>
              <input
                type="color"
                value={designOptions.borderColorBottom}
                onChange={(e) => handleColorChange('borderColorBottom', e.target.value)}
              />
            </div>
          </div>
          
          <div className={styles.colorRow}>
            <div className={styles.colorInput}>
              <label>Left Border:</label>
              <input
                type="color"
                value={designOptions.borderColorLeft}
                onChange={(e) => handleColorChange('borderColorLeft', e.target.value)}
              />
            </div>
            <div className={styles.colorInput}>
              <label>Right Border:</label>
              <input
                type="color"
                value={designOptions.borderColorRight}
                onChange={(e) => handleColorChange('borderColorRight', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Line Colors */}
      <div className={styles.designSection}>
        <h3>Line Colors</h3>
        <div className={styles.colorGrid}>
          <div className={styles.colorInput}>
            <label>Main Lines:</label>
            <input
              type="color"
              value={designOptions.lineColor}
              onChange={(e) => handleColorChange('lineColor', e.target.value)}
            />
          </div>
          <div className={styles.colorInput}>
            <label>Court Interior:</label>
            <input
              type="color"
              value={designOptions.courtInteriorColor}
              onChange={(e) => handleColorChange('courtInteriorColor', e.target.value)}
            />
          </div>
          <div className={styles.colorInput}>
            <label>Key Color:</label>
            <input
              type="color"
              value={designOptions.keyColor}
              onChange={(e) => handleColorChange('keyColor', e.target.value)}
            />
          </div>
          <div className={styles.colorInput}>
            <label>Key Arch:</label>
            <input
              type="color"
              value={designOptions.keyArchColor}
              onChange={(e) => handleColorChange('keyArchColor', e.target.value)}
            />
          </div>
          <div className={styles.colorInput}>
            <label>3-Point Fill:</label>
            <input
              type="color"
              value={designOptions.threePointFillColor}
              onChange={(e) => handleColorChange('threePointFillColor', e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Logo Upload */}
      <div className={styles.designSection}>
        <h3>Center Court Logo</h3>
        <div className={styles.logoUpload}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            style={{ display: 'none' }}
          />
          
          <button onClick={triggerFileInput} className={styles.uploadButton}>
            Upload Logo
          </button>
          
          {uploadedLogo && (
            <div className={styles.logoPreview}>
              <img src={uploadedLogo} alt="Uploaded Logo" />
              <button onClick={removeLogo} className={styles.removeButton}>
                Remove Logo
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Font Selection */}
      <div className={styles.designSection}>
        <h3>Border Font</h3>
        <div className={styles.fontSelection}>
          <select
            value={designOptions.borderFont}
            onChange={(e) => handleFontChange(e.target.value)}
          >
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
            <option value="Georgia">Georgia</option>
          </select>
        </div>
      </div>
      
      {/* Grid Lines Toggle */}
      <div className={styles.designSection}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={designOptions.gridLines}
            onChange={(e) => setDesignOptions(prev => ({ ...prev, gridLines: e.target.checked }))}
          />
          Show Grid Lines
        </label>
      </div>
      
      <div className={styles.stepActions}>
        <button onClick={prevStep} className={styles.prevButton}>
          ← Previous: Display Size
        </button>
        <button onClick={nextStep} className={styles.nextButton}>
          Next: Main Court →
        </button>
      </div>
    </div>
  );
};

export default Step2DesignOptions;