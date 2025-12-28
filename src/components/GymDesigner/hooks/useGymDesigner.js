import { useCallback, useEffect } from 'react';

export const useGymDesigner = ({
  canvasRef,
  dimensions,
  floorType,
  colorScheme,
  showLines,
  showCenter,
  showThree
}) => {
  const drawFloor = useCallback((ctx) => {
    const { width, height } = ctx.canvas;
    
    const schemes = {
      'traditional': ['#D2691E', '#CD853F'],
      'dark-wood': ['#8B4513', '#A0522D'],
      'gray': ['#2F4F4F', '#708090'],
      'blue': ['#000080', '#4169E1'],
      'red': ['#8B0000', '#DC143C']
    };
    
    const colors = schemes[colorScheme] || schemes['traditional'];
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(1, colors[1]);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    if (floorType === 'wood') {
      ctx.strokeStyle = 'rgba(0,0,0,0.1)';
      ctx.lineWidth = 1;
      
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }
  }, [colorScheme, floorType]);

  const drawCourtLines = useCallback((ctx) => {
    const { width, height } = ctx.canvas;
    const margin = 50;
    
    const courtWidth = width - (margin * 2);
    const courtHeight = height - (margin * 2);
    
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    
    ctx.strokeRect(margin, margin, courtWidth, courtHeight);
    
    if (showCenter) {
      ctx.beginPath();
      ctx.moveTo(margin, margin + (courtHeight / 2));
      ctx.lineTo(margin + courtWidth, margin + (courtHeight / 2));
      ctx.stroke();
      
      const centerX = margin + (courtWidth / 2);
      const centerY = margin + (courtHeight / 2);
      ctx.beginPath();
      ctx.arc(centerX, centerY, 60, 0, 2 * Math.PI);
      ctx.stroke();
    }
    
    if (showThree) {
      const basketDistance = 45;
      const threePointRadius = 75;
      const basketY = margin + courtHeight - basketDistance;
      
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
    }
  }, [showLines, showCenter, showThree]);

  const drawCourt = useCallback(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    drawFloor(ctx);
    
    if (showLines) {
      drawCourtLines(ctx);
    }
  }, [canvasRef, drawFloor, drawCourtLines, showLines]);

  useEffect(() => {
    drawCourt();
  }, [drawCourt]);

  return { drawCourt };
};