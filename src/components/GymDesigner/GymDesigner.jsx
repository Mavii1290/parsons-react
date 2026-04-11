import React, { useState, useCallback, useRef, useEffect } from 'react';
import styles from './GymDesigner.module.css';
import gymFloorImage from '../Pages/Assets/gym-floor.jpg';

const GymDesigner = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 50, length: 84 });
  const [showLines, setShowLines] = useState(true);
  const [showCenter, setShowCenter] = useState(true);
  const [showThree, setShowThree] = useState(true);

  const drawCourt = useCallback(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    const { width: canvasWidth, height: canvasHeight } = ctx.canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw the image background
    drawImageBackground(ctx, canvasWidth, canvasHeight);
    
    // Draw court lines if enabled
    if (showLines) {
      drawCourtLines(ctx, canvasWidth, canvasHeight);
    }
  }, [showLines, showCenter, showThree]);

  const drawImageBackground = (ctx, width, height) => {
    const image = new Image();
    image.src = gymFloorImage; // Use the imported image
    
    if (image.complete) {
      // Image is already loaded
      ctx.drawImage(image, 0, 0, width, height);
    } else {
      image.onload = () => {
        ctx.drawImage(image, 0, 0, width, height);
      };
      image.onerror = () => {
        console.error('Failed to load gym floor image');
        // Fallback to a solid color
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#D2691E');
        gradient.addColorStop(1, '#CD853F');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      };
    }
  };

  const drawCourtLines = (ctx, width, height) => {
    const margin = 50;
    const courtWidth = width - (margin * 2);
    const courtHeight = height - (margin * 2);
    
    // Enhanced line visibility on image background
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 4;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 2;
    
    // Outer boundary
    ctx.strokeRect(margin, margin, courtWidth, courtHeight);
    
    if (showCenter) {
      // Center line
      ctx.beginPath();
      ctx.moveTo(margin, margin + (courtHeight / 2));
      ctx.lineTo(margin + courtWidth, margin + (courtHeight / 2));
      ctx.stroke();
      
      // Center circle
      const centerX = margin + (courtWidth / 2);
      const centerY = margin + (courtHeight / 2);
      ctx.beginPath();
      ctx.arc(centerX, centerY, 60, 0, 2 * Math.PI);
      ctx.stroke();
    }
    
    if (showThree) {
      drawThreePointLine(ctx, margin, margin, courtWidth, courtHeight);
    }
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  };

  const drawThreePointLine = (ctx, margin, marginTop, courtWidth, courtHeight) => {
    const basketDistance = 45;
    const threePointRadius = 75;
    const basketY = marginTop + courtHeight - basketDistance;
    
    // Left side
    const leftBasketX = margin + (courtWidth * 0.15);
    ctx.beginPath();
    ctx.moveTo(margin, basketY - threePointRadius);
    ctx.lineTo(leftBasketX, basketY - threePointRadius);
    ctx.lineTo(leftBasketX, basketY + threePointRadius);
    ctx.lineTo(margin, basketY + threePointRadius);
    ctx.arc(leftBasketX, basketY, threePointRadius, -Math.PI/2, Math.PI/2);
    ctx.stroke();
    
    // Right side
    const rightBasketX = margin + (courtWidth * 0.85);
    ctx.beginPath();
    ctx.moveTo(margin + courtWidth, basketY - threePointRadius);
    ctx.lineTo(rightBasketX, basketY - threePointRadius);
    ctx.lineTo(rightBasketX, basketY + threePointRadius);
    ctx.lineTo(margin + courtWidth, basketY + threePointRadius);
    ctx.arc(rightBasketX, basketY, threePointRadius, Math.PI/2, 3*Math.PI/2);
    ctx.stroke();
  };

  useEffect(() => {
    drawCourt();
  }, [drawCourt]);

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setDimensions({ ...dimensions, [name]: parseInt(value) });
  };

  const handlePresetSelect = (preset) => {
    const presets = {
      basketball: { width: 50, length: 84 },
      volleyball: { width: 59, length: 118 },
      tennis: { width: 78, length: 156 }
    };
    setDimensions(presets[preset] || dimensions);
  };

  const handleSave = () => {
    const designData = {
      dimensions,
      showLines,
      showCenter,
      showThree,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('gymDesign', JSON.stringify(designData));
    alert('Design saved successfully!');
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `gym-design-${Date.now()}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the design?')) {
      setDimensions({ width: 50, length: 84 });
      setShowLines(true);
      setShowCenter(true);
      setShowThree(true);
    }
  };

  const area = dimensions.width * dimensions.length;

  return (
    <div className={styles.designerContainer}>
      <div className={styles.controlPanel}>
        <div className={styles.section}>
          <h3>Court Dimensions</h3>
          <div className={styles.inputGroup}>
            <label>Width (ft):</label>
            <input
              type="number"
              name="width"
              value={dimensions.width}
              onChange={handleDimensionChange}
              min="20"
              max="120"
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Length (ft):</label>
            <input
              type="number"
              name="length"
              value={dimensions.length}
              onChange={handleDimensionChange}
              min="20"
              max="120"
            />
          </div>
          <div className={styles.presetButtons}>
            <button onClick={() => handlePresetSelect('basketball')}>
              Basketball
            </button>
            <button onClick={() => handlePresetSelect('volleyball')}>
              Volleyball
            </button>
            <button onClick={() => handlePresetSelect('tennis')}>
              Tennis
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <h3>Court Lines</h3>
          <div className={styles.lineOptions}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={showLines}
                onChange={(e) => setShowLines(e.target.checked)}
              />
              Show Court Lines
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={showCenter}
                onChange={(e) => setShowCenter(e.target.checked)}
              />
              Center Circle
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={showThree}
                onChange={(e) => setShowThree(e.target.checked)}
              />
              3-Point Line
            </label>
          </div>
        </div>

        <div className={styles.section}>
          <h3>Actions</h3>
          <button onClick={handleSave} className={styles.actionBtn}>
            Save Design
          </button>
          <button onClick={handleDownload} className={styles.actionBtn}>
            Download
          </button>
          <button onClick={handleReset} className={`${styles.actionBtn} ${styles.reset}`}>
            Reset
          </button>
        </div>
      </div>

      <div className={styles.canvasContainer}>
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          className={styles.canvas}
        />
        <div className={styles.canvasInfo}>
          <span>{dimensions.width}ft × {dimensions.length}ft</span>
          <span>{area.toLocaleString()} sq ft</span>
        </div>
      </div>
    </div>
  );
};

export default GymDesigner;