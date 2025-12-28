import React, { useState, useCallback, useRef } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { Canvas } from './components/Canvas';
import { useGymDesigner } from './hooks/useGymDesigner';
import styles from './GymDesigner.module.css';

export const GymDesigner = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 50, length: 84 });
  const [floorType, setFloorType] = useState('wood');
  const [colorScheme, setColorScheme] = useState('traditional');
  const [showLines, setShowLines] = useState(true);
  const [showCenter, setShowCenter] = useState(true);
  const [showThree, setShowThree] = useState(true);

  const { drawCourt } = useGymDesigner({
    canvasRef,
    dimensions,
    floorType,
    colorScheme,
    showLines,
    showCenter,
    showThree
  });

  const handleDimensionChange = useCallback((newDimensions) => {
    setDimensions(newDimensions);
  }, []);

  const handlePresetSelect = useCallback((preset) => {
    const presets = {
      basketball: { width: 50, length: 84 },
      volleyball: { width: 59, length: 118 },
      tennis: { width: 78, length: 156 }
    };
    setDimensions(presets[preset] || dimensions);
  }, [dimensions]);

  const handleSave = useCallback(() => {
    const designData = {
      dimensions,
      floorType,
      colorScheme,
      showLines,
      showCenter,
      showThree,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('gymDesign', JSON.stringify(designData));
    alert('Design saved successfully!');
  }, [dimensions, floorType, colorScheme, showLines, showCenter, showThree]);

  const handleDownload = useCallback(() => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `gym-design-${Date.now()}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  }, []);

  const handleReset = useCallback(() => {
    if (confirm('Are you sure you want to reset the design?')) {
      setDimensions({ width: 50, length: 84 });
      setFloorType('wood');
      setColorScheme('traditional');
      setShowLines(true);
      setShowCenter(true);
      setShowThree(true);
    }
  }, []);

  return (
    <div className={styles.designerContainer}>
      <ControlPanel
        dimensions={dimensions}
        floorType={floorType}
        colorScheme={colorScheme}
        showLines={showLines}
        showCenter={showCenter}
        showThree={showThree}
        onDimensionChange={handleDimensionChange}
        onPresetSelect={handlePresetSelect}
        onFloorTypeChange={setFloorType}
        onColorSchemeChange={setColorScheme}
        onLinesToggle={setShowLines}
        onCenterToggle={setShowCenter}
        onThreeToggle={setShowThree}
        onSave={handleSave}
        onDownload={handleDownload}
        onReset={handleReset}
      />
      <Canvas
        canvasRef={canvasRef}
        dimensions={dimensions}
        onDraw={drawCourt}
      />
    </div>
  );
};