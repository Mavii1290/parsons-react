import { forwardRef, useMemo, useRef, useState, useEffect } from 'react';
import { RotateCw } from 'lucide-react';
import type { DesignState, SideCourt } from '@/lib/courtTypes';

interface CourtCanvasProps {
  state: DesignState;
  setState: (updater: (s: DesignState) => DesignState) => void;
  svgId?: string;
}

type DragTarget =
  | { kind: 'main' }
  | { kind: 'side'; id: string }
  | { kind: 'additional'; sport: 'mainVolleyball' | 'sideVolleyball' | 'badminton' | 'pickleball'; index: number }
  | { kind: 'element'; key: 'bowlingPin' | 'baseballBases' | 'agilityLadder' | 'agilityDots' }
  | { kind: 'character'; id: string }
  | { kind: 'logo'; id: string }
  | { kind: 'logoResize'; id: string; initialSize: number }
  | { kind: 'pan' };

interface DragState {
  target: DragTarget;
  startClientX: number;
  startClientY: number;
  startObjX: number;
  startObjY: number;
}

const CourtCanvas = forwardRef<SVGSVGElement, CourtCanvasProps>(function CourtCanvas(
  { state, setState, svgId = 'court-canvas' },
  ref,
) {
  const gymW = state.gymWidth;
  const gymL = state.gymLength;
  const pad = 5;
  const vbW = gymW + pad * 2;
  const vbH = gymL + pad * 2;

  const innerRef = useRef<SVGSVGElement | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [ctrlHeld, setCtrlHeld] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Control') setCtrlHeld(true); };
    const onKeyUp = (e: KeyboardEvent) => { if (e.key === 'Control') setCtrlHeld(false); };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  // expose ref
  useEffect(() => {
    if (!ref) return;
    if (typeof ref === 'function') ref(innerRef.current);
    else (ref as React.MutableRefObject<SVGSVGElement | null>).current = innerRef.current;
  }, [ref]);

  const woodPattern = useMemo(() => `wood-${Math.abs(hash(state.courtInteriorColor))}`, [
    state.courtInteriorColor,
  ]);

  const mainCW = state.mainCourtWidth;
  const mainCL = state.mainCourtLength;
  const hasMain = state.mainCourtSize !== 'NO MAIN BASKETBALL COURT' && mainCW > 0 && mainCL > 0;
  const mainX = state.mainCourtX ?? pad + (gymW - (state.mainCourtRotated ? mainCL : mainCW)) / 2;
  const mainY = state.mainCourtY ?? pad + (gymL - (state.mainCourtRotated ? mainCW : mainCL)) / 2;

  // Convert client coords to SVG userspace
  const clientToSvg = (clientX: number, clientY: number) => {
    const svg = innerRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    const scaleX = vbW / rect.width;
    const scaleY = vbH / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrag = (
    e: React.PointerEvent,
    target: DragTarget,
    objX: number,
    objY: number,
  ) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    dragRef.current = {
      target,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startObjX: objX,
      startObjY: objY,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    const svg = innerRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const scaleX = vbW / rect.width;
    const scaleY = vbH / rect.height;
    const dx = (e.clientX - d.startClientX) * scaleX;
    const dy = (e.clientY - d.startClientY) * scaleY;
    if (d.target.kind === 'pan') {
      setPanX(d.startObjX - dx);
      setPanY(d.startObjY - dy);
    } else {
      applyDrag(d.target, d.startObjX + dx, d.startObjY + dy);
    }
  };

  const onPointerUp = () => {
    dragRef.current = null;
  };

  const applyDrag = (target: DragTarget, nx: number, ny: number) => {
    if (target.kind === 'main') {
      setState((s) => ({ ...s, mainCourtX: nx, mainCourtY: ny }));
    } else if (target.kind === 'side') {
      setState((s) => ({
        ...s,
        sideCourts: s.sideCourts.map((c) => (c.id === target.id ? { ...c, x: nx, y: ny } : c)),
      }));
    } else if (target.kind === 'additional') {
      setState((s) => {
        const sd = s[target.sport];
        const positions = (sd.positions ?? []).slice();
        while (positions.length <= target.index) positions.push({ x: 0, y: 0, rotated: false });
        positions[target.index] = { ...positions[target.index], x: nx, y: ny };
        return { ...s, [target.sport]: { ...sd, positions } };
      });
    } else if (target.kind === 'element') {
      setState((s) => ({
        ...s,
        elements: {
          ...s.elements,
          [target.key]: { ...s.elements[target.key], x: nx, y: ny },
        },
      }));
    } else if (target.kind === 'character') {
      setState((s) => ({
        ...s,
        characters: s.characters.map((c) => (c.id === target.id ? { ...c, x: nx, y: ny } : c)),
      }));
    } else if (target.kind === 'logo') {
      setState((s) => {
        const bW = s.mainCourtWidth;
        const bL = s.mainCourtLength;
        const rot = s.mainCourtRotated;
        const displayW = rot ? bL : bW;
        const displayH = rot ? bW : bL;
        const mx = s.mainCourtX ?? pad + (gymW - displayW) / 2;
        const my = s.mainCourtY ?? pad + (gymL - displayH) / 2;
        let newX, newY;
        if (rot) {
          newX = (ny - my) / bW;
          newY = 1 - (nx - mx) / bL;
        } else {
          newX = (nx - mx) / bW;
          newY = (ny - my) / bL;
        }
        return {
          ...s,
          logos: s.logos.map((l) =>
            l.id === target.id ? { ...l, x: Math.max(0, Math.min(1, newX)), y: Math.max(0, Math.min(1, newY)) } : l,
          ),
        };
      });
    } else if (target.kind === 'logoResize') {
      setState((s) => {
        const minDim = Math.min(s.mainCourtWidth, s.mainCourtLength);
        const newSize = Math.max(0.04, Math.min(1.5, target.initialSize + nx / minDim));
        return {
          ...s,
          logos: s.logos.map((l) => (l.id === target.id ? { ...l, size: newSize } : l)),
        };
      });
    }
  };

  // Wheel zoom (on canvas)
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY;
    setState((s) => {
      const factor = delta > 0 ? 1.1 : 0.9;
      const newZoom = Math.max(0.3, Math.min(5, s.zoom * factor));
      return { ...s, zoom: newZoom };
    });
  };

  const rotateMain = (e: React.MouseEvent) => {
    e.stopPropagation();
    setState((s) => ({ ...s, mainCourtRotated: !s.mainCourtRotated }));
  };

  const rotateSide = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setState((s) => ({
      ...s,
      sideCourts: s.sideCourts.map((c) => (c.id === id ? { ...c, rotated: !c.rotated } : c)),
    }));
  };

  return (
    <svg
      ref={innerRef}
      id={svgId}
      viewBox={`${panX} ${panY} ${vbW} ${vbH}`}
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full touch-none"
      style={{
        backgroundColor: '#f5f5f5',
        cursor: dragRef.current?.target.kind === 'pan' ? 'grabbing' : ctrlHeld ? 'grab' : 'default',
      }}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onPointerDown={(e) => {
        if (ctrlHeld) {
          e.stopPropagation();
          (e.target as Element).setPointerCapture?.(e.pointerId);
          dragRef.current = {
            target: { kind: 'pan' },
            startClientX: e.clientX,
            startClientY: e.clientY,
            startObjX: panX,
            startObjY: panY,
          };
        } else {
          setSelected(null);
        }
      }}
      onWheel={onWheel}
    >
      <defs>
        <WoodPattern id={woodPattern} base={state.courtInteriorColor} />
        <WoodPattern id="gym-wood" base="#e6c79b" />
        <WoodPattern id="stain-mv" base={state.mainVolleyball.woodStain} />
        <WoodPattern id="stain-sv" base={state.sideVolleyball.woodStain} />
        <WoodPattern id="stain-bad" base={state.badminton.woodStain} />
        <WoodPattern id="stain-pick" base={state.pickleball.woodStain} />
      </defs>

      <rect x={pad} y={pad} width={gymW} height={gymL} fill="url(#gym-wood)" />

      {state.gridlines && (
        <g stroke="#888" strokeWidth={0.1} opacity={0.5}>
          {Array.from({ length: Math.floor(gymW / 5) + 1 }).map((_, i) => (
            <line
              key={`gv-${i}`}
              x1={pad + i * 5}
              y1={pad}
              x2={pad + i * 5}
              y2={pad + gymL}
            />
          ))}
          {Array.from({ length: Math.floor(gymL / 5) + 1 }).map((_, i) => (
            <line
              key={`gh-${i}`}
              x1={pad}
              y1={pad + i * 5}
              x2={pad + gymW}
              y2={pad + i * 5}
            />
          ))}
        </g>
      )}

      {/* Watermark text */}
      <text
        x={pad + gymW / 2}
        y={pad + gymL / 2}
        textAnchor="middle"
        fill="#00000020"
        fontSize={Math.min(gymW, gymL) * 0.07}
        fontFamily="Georgia, serif"
        fontStyle="italic"
        style={{ pointerEvents: 'none' }}
      >
        Parsons Floors
      </text>

      {!state.hiddenLayers?.includes('additionalCourts') && (
        <AdditionalCourts
          state={state}
          pad={pad}
          gymW={gymW}
          selected={selected}
          setSelected={setSelected}
          startDrag={startDrag}
          setState={setState}
        />
      )}

      {!state.hiddenLayers?.includes('sideCourts') && (
        <SideCourts
          state={state}
          pad={pad}
          gymW={gymW}
          selected={selected}
          setSelected={setSelected}
          startDrag={startDrag}
          onRotate={rotateSide}
        />
      )}

      {hasMain && !state.hiddenLayers?.includes('mainCourt') && (
        <g
          onPointerDown={(e) => {
            setSelected('main');
            startDrag(e, { kind: 'main' }, mainX, mainY);
          }}
          style={{ cursor: 'grab' }}
        >
          <MainCourt
            state={state}
            x={mainX}
            y={mainY}
            w={state.mainCourtRotated ? mainCL : mainCW}
            l={state.mainCourtRotated ? mainCW : mainCL}
            rotated={state.mainCourtRotated}
            woodId={woodPattern}
          />
          {selected === 'main' && (
            <SelectionHandles
              x={mainX}
              y={mainY}
              w={state.mainCourtRotated ? mainCL : mainCW}
              h={state.mainCourtRotated ? mainCW : mainCL}
              onRotate={rotateMain}
            />
          )}
        </g>
      )}

      {/* Logos rendered in absolute SVG space for drag/resize support */}
      {hasMain && !state.hiddenLayers?.includes('mainCourt') && state.logos.map((logo) => {
        const bW = state.mainCourtWidth;
        const bL = state.mainCourtLength;
        const rot = state.mainCourtRotated;
        const size = logo.size * Math.min(bW, bL);
        const logoAbsX = rot
          ? mainX + bL * (1 - logo.y)
          : mainX + bW * logo.x;
        const logoAbsY = rot
          ? mainY + bW * logo.x
          : mainY + bL * logo.y;
        const logoSelected = selected === `logo-${logo.id}`;
        return (
          <g key={logo.id}>
            <image
              href={logo.src}
              x={logoAbsX - size / 2}
              y={logoAbsY - size / 2}
              width={size}
              height={size}
              preserveAspectRatio="xMidYMid meet"
              style={{ cursor: 'grab' }}
              onPointerDown={(e) => {
                e.stopPropagation();
                (e.target as Element).setPointerCapture?.(e.pointerId);
                setSelected(`logo-${logo.id}`);
                startDrag(e, { kind: 'logo', id: logo.id }, logoAbsX, logoAbsY);
              }}
            />
            {logoSelected && (
              <>
                <rect
                  x={logoAbsX - size / 2}
                  y={logoAbsY - size / 2}
                  width={size}
                  height={size}
                  fill="none"
                  stroke="#0066ff"
                  strokeWidth={0.3}
                  strokeDasharray="1 0.8"
                  pointerEvents="none"
                />
                <circle
                  cx={logoAbsX + size / 2}
                  cy={logoAbsY + size / 2}
                  r={1.2}
                  fill="#0066ff"
                  style={{ cursor: 'nwse-resize' }}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    (e.target as Element).setPointerCapture?.(e.pointerId);
                    startDrag(e, { kind: 'logoResize', id: logo.id, initialSize: logo.size }, 0, 0);
                  }}
                />
              </>
            )}
          </g>
        );
      })}

      <ElementsLayer
        state={state}
        pad={pad}
        gymW={gymW}
        gymL={gymL}
        selected={selected}
        setSelected={setSelected}
        startDrag={startDrag}
      />
    </svg>
  );
});

export default CourtCanvas;

function WoodPattern({ id, base }: { id: string; base: string }) {
  const darker = shade(base, -12);
  const lighter = shade(base, 8);
  return (
    <pattern id={id} patternUnits="userSpaceOnUse" width={8} height={4}>
      <rect width={8} height={4} fill={base} />
      <line x1={0} y1={1} x2={8} y2={1} stroke={darker} strokeWidth={0.12} />
      <line x1={0} y1={2.5} x2={8} y2={2.5} stroke={lighter} strokeWidth={0.08} />
      <line x1={0} y1={3.5} x2={8} y2={3.5} stroke={darker} strokeWidth={0.08} />
    </pattern>
  );
}

function SelectionHandles({
  x,
  y,
  w,
  h,
  onRotate,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  onRotate: (e: React.MouseEvent) => void;
}) {
  return (
    <g pointerEvents="none">
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill="none"
        stroke="#0066ff"
        strokeWidth={0.3}
        strokeDasharray="1 0.8"
      />
      <g
        pointerEvents="auto"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={onRotate}
        style={{ cursor: 'pointer' }}
      >
        <circle cx={x + w + 2} cy={y - 2} r={1.8} fill="#0066ff" />
        <g transform={`translate(${x + w + 2 - 1}, ${y - 2 - 1}) scale(0.08)`}>
          <RotateCw color="#fff" />
        </g>
      </g>
    </g>
  );
}

function MainCourt({
  state,
  x,
  y,
  w,
  l,
  rotated,
  woodId,
}: {
  state: DesignState;
  x: number;
  y: number;
  w: number;
  l: number;
  rotated: boolean;
  woodId: string;
}) {
  // Use transform for rotation; but we already swapped w/l. Apply rotation via rotate for line layouts:
  // To keep simple, we draw court in unrotated space using original mainWidth/Length, then transform.
  const baseW = state.mainCourtWidth;
  const baseL = state.mainCourtLength;
  const transform = rotated
    ? `translate(${x + w / 2} ${y + l / 2}) rotate(90) translate(${-baseW / 2} ${-baseL / 2})`
    : `translate(${x} ${y})`;

  return (
    <g transform={transform}>
      <MainCourtShapes state={state} w={baseW} l={baseL} woodId={woodId} />
    </g>
  );
}

function MainCourtShapes({
  state,
  w,
  l,
  woodId,
}: {
  state: DesignState;
  w: number;
  l: number;
  woodId: string;
}) {
  const tb = state.borderThicknessTB;
  const lr = state.borderThicknessLR;
  // Playing field origin is (0,0); borders expand outward
  const ix = 0;
  const iy = 0;
  const iw = w;
  const il = l;

  const stroke = state.lineColor;
  const sw = 0.25;

  const topOutward = state.fontOrientation.startsWith('Top Outward');
  const bottomInward = state.fontOrientation.endsWith('Bottom Inward');

  return (
    <g>
      {/* Base playing field */}
      <rect x={0} y={0} width={w} height={l} fill={`url(#${woodId})`} />

      {/* Borders expand outward */}
      {tb > 0 && (
        <>
          <rect x={-lr} y={-tb} width={w + lr * 2} height={tb} fill={state.borderColorTB} />
          <rect x={-lr} y={l} width={w + lr * 2} height={tb} fill={state.borderColorTB} />
        </>
      )}
      {lr > 0 && (
        <>
          <rect x={-lr} y={0} width={lr} height={l} fill={state.borderColorLR} />
          <rect x={w} y={0} width={lr} height={l} fill={state.borderColorLR} />
        </>
      )}

      {state.topBorderText && tb > 0 && (
        <>
          <text
            x={w / 2}
            y={-tb / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={state.topBorderTextColor}
            fontSize={state.topBorderFontSize * 0.05}
            fontFamily={state.topBorderFont}
            fontWeight="bold"
            transform={topOutward ? `rotate(180 ${w / 2} ${-tb / 2})` : undefined}
          >
            {state.topBorderText}
          </text>
          <text
            x={w / 2}
            y={l + tb / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={state.topBorderTextColor}
            fontSize={state.topBorderFontSize * 0.05}
            fontFamily={state.topBorderFont}
            fontWeight="bold"
            transform={bottomInward ? `rotate(180 ${w / 2} ${l + tb / 2})` : undefined}
          >
            {state.topBorderText}
          </text>
        </>
      )}

      {state.leftBorderText && lr > 0 && (
        <>
          <text
            x={-lr / 2}
            y={l / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={state.leftBorderTextColor}
            fontSize={state.leftBorderFontSize * 0.05}
            fontFamily={state.leftBorderFont}
            fontWeight="bold"
            transform={`rotate(${topOutward ? 90 : -90} ${-lr / 2} ${l / 2})`}
          >
            {state.leftBorderText}
          </text>
          <text
            x={w + lr / 2}
            y={l / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={state.leftBorderTextColor}
            fontSize={state.leftBorderFontSize * 0.05}
            fontFamily={state.leftBorderFont}
            fontWeight="bold"
            transform={`rotate(${bottomInward ? 90 : -90} ${w + lr / 2} ${l / 2})`}
          >
            {state.leftBorderText}
          </text>
        </>
      )}

      <rect x={ix} y={iy} width={iw} height={il} fill="none" stroke={stroke} strokeWidth={sw} />
      <line
        x1={ix}
        y1={iy + il / 2}
        x2={ix + iw}
        y2={iy + il / 2}
        stroke={stroke}
        strokeWidth={sw}
      />

      {state.mainElements.centerCircle && (
        <circle
          cx={ix + iw / 2}
          cy={iy + il / 2}
          r={6}
          fill="none"
          stroke={stroke}
          strokeWidth={sw}
        />
      )}

      {state.mainElements.threePointArch && (
        <ThreePointArcs
          state={state}
          ix={ix}
          iy={iy}
          iw={iw}
          il={il}
          stroke={stroke}
          sw={sw}
        />
      )}

      <KeyArea
        state={state}
        cx={ix + iw / 2}
        top={iy}
        bottom={iy + il}
        stroke={stroke}
        sw={sw}
        iw={iw}
      />

    </g>
  );
}

function KeyArea({
  state,
  cx,
  top,
  bottom,
  stroke,
  sw,
  iw,
}: {
  state: DesignState;
  cx: number;
  top: number;
  bottom: number;
  stroke: string;
  sw: number;
  iw: number;
}) {
  const il = Math.max(0, bottom - top);
  const keyW = Math.min(12, iw * 0.9);                 // standard 12ft, capped so it fits
  const keyL = Math.min(19, (il - 2) / 2);             // standard 19ft, never let keys overlap
  const arcR = 6;                                      // free-throw circle radius (6ft)
  const markLen = 1.5;
  const markPositions = [0.28, 0.47, 0.66, 0.85];     // 4 lane marks per side

  const ftBoxW = 0.4;
  const ftBoxH = 0.8;

  const LaneMarks = ({ baseY, dir }: { baseY: number; dir: 1 | -1 }) => (
    <>
      {markPositions.map((pct) => {
        const y = baseY + dir * keyL * pct;
        return (
          <g key={pct}>
            <line x1={cx - keyW / 2} y1={y} x2={cx - keyW / 2 - markLen} y2={y} stroke={stroke} strokeWidth={sw} />
            <line x1={cx + keyW / 2} y1={y} x2={cx + keyW / 2 + markLen} y2={y} stroke={stroke} strokeWidth={sw} />
          </g>
        );
      })}
    </>
  );

  return (
    <g>
      {state.mainElements.key && (
        <>
          <rect
            x={cx - keyW / 2}
            y={top}
            width={keyW}
            height={keyL}
            fill={state.keyColor}
            stroke={stroke}
            strokeWidth={sw}
          />
          <LaneMarks baseY={top} dir={1} />
          {/* Low block markers at baseline (opposite key arch) */}
          <rect x={cx - keyW / 2 - ftBoxW} y={top} width={ftBoxW} height={ftBoxH} fill={stroke} />
          <rect x={cx + keyW / 2} y={top} width={ftBoxW} height={ftBoxH} fill={stroke} />
        </>
      )}
      {state.mainElements.keyArch && (
        <path
          d={`M ${cx - arcR} ${top + keyL} A ${arcR} ${arcR} 0 0 0 ${cx + arcR} ${top + keyL}`}
          fill={state.keyArchColor}
          stroke={stroke}
          strokeWidth={sw}
        />
      )}
      {state.mainElements.key && (
        <>
          <rect
            x={cx - keyW / 2}
            y={bottom - keyL}
            width={keyW}
            height={keyL}
            fill={state.keyColor}
            stroke={stroke}
            strokeWidth={sw}
          />
          <LaneMarks baseY={bottom} dir={-1} />
          {/* Low block markers at baseline (opposite key arch) */}
          <rect x={cx - keyW / 2 - ftBoxW} y={bottom - ftBoxH} width={ftBoxW} height={ftBoxH} fill={stroke} />
          <rect x={cx + keyW / 2} y={bottom - ftBoxH} width={ftBoxW} height={ftBoxH} fill={stroke} />
        </>
      )}
      {state.mainElements.keyArch && (
        <path
          d={`M ${cx - arcR} ${bottom - keyL} A ${arcR} ${arcR} 0 0 1 ${cx + arcR} ${bottom - keyL}`}
          fill={state.keyArchColor}
          stroke={stroke}
          strokeWidth={sw}
        />
      )}
    </g>
  );
}

function ThreePointArcs({
  state,
  ix,
  iy,
  iw,
  il,
  stroke,
  sw,
}: {
  state: DesignState;
  ix: number;
  iy: number;
  iw: number;
  il: number;
  stroke: string;
  sw: number;
}) {
  const cx = ix + iw / 2;
  const arcR = 20.75;
  const topHoopY = iy + 5.25;
  const bottomHoopY = iy + il - 5.25;
  const x1 = cx - arcR;
  const x2 = cx + arcR;
  const fillHex = state.threePointFillColor;
  const fillOpacity = fillHex === state.courtInteriorColor ? 0 : 1;

  return (
    <g>
      <path
        d={`M ${x1} ${iy} L ${x1} ${topHoopY} A ${arcR} ${arcR} 0 0 0 ${x2} ${topHoopY} L ${x2} ${iy} Z`}
        fill={fillHex}
        fillOpacity={fillOpacity}
        stroke={stroke}
        strokeWidth={sw}
      />
      <path
        d={`M ${x1} ${iy + il} L ${x1} ${bottomHoopY} A ${arcR} ${arcR} 0 0 1 ${x2} ${bottomHoopY} L ${x2} ${iy + il} Z`}
        fill={fillHex}
        fillOpacity={fillOpacity}
        stroke={stroke}
        strokeWidth={sw}
      />
    </g>
  );
}

function SideCourts({
  state,
  pad,
  gymW,
  selected,
  setSelected,
  startDrag,
  onRotate,
}: {
  state: DesignState;
  pad: number;
  gymW: number;
  selected: string | null;
  setSelected: (s: string | null) => void;
  startDrag: (e: React.PointerEvent, target: DragTarget, objX: number, objY: number) => void;
  onRotate: (e: React.MouseEvent, id: string) => void;
}) {
  if (state.sideCourts.length === 0) return null;
  return (
    <g>
      {state.sideCourts.map((sc, idx) => {
        const baseW = 25;
        const baseL = 42;
        const w = sc.rotated ? baseL : baseW;
        const h = sc.rotated ? baseW : baseL;
        const total = state.sideCourts.length;
        const slotW = gymW / Math.max(total, 1);
        const defaultX = pad + slotW * idx + (slotW - w) / 2;
        const defaultY = pad + 2;
        const x = sc.x ?? defaultX;
        const y = sc.y ?? defaultY;
        const id = `side-${sc.id}`;
        return (
          <g
            key={sc.id}
            onPointerDown={(e) => {
              setSelected(id);
              startDrag(e, { kind: 'side', id: sc.id }, x, y);
            }}
            style={{ cursor: 'grab' }}
          >
            <SideCourtShape sc={sc} x={x} y={y} />
            {selected === id && (
              <SelectionHandles
                x={x}
                y={y}
                w={w}
                h={h}
                onRotate={(e) => onRotate(e, sc.id)}
              />
            )}
          </g>
        );
      })}
    </g>
  );
}

function SideCourtShape({ sc, x, y }: { sc: SideCourt; x: number; y: number }) {
  const sw = 0.2;
  const baseW = 25;
  const baseL = 42;
  const transform = sc.rotated
    ? `translate(${x + baseL / 2} ${y + baseW / 2}) rotate(90) translate(${-baseW / 2} ${-baseL / 2})`
    : `translate(${x} ${y})`;

  const stroke = sc.lineColor;
  const cx = baseW / 2;
  const keyW = Math.min(12, baseW * 0.9);
  const keyL = Math.min(19, (baseL - 2) / 2);
  const arcR = 6;
  const threeR = Math.min(20.75, baseW / 2 - 0.5);
  const x1 = Math.max(0, cx - threeR);
  const x2 = Math.min(baseW, cx + threeR);
  const hoopOff = 5.25;
  return (
    <g transform={transform}>
      <rect x={0} y={0} width={baseW} height={baseL} fill="none" stroke={stroke} strokeWidth={sw} />
      <line x1={0} y1={baseL / 2} x2={baseW} y2={baseL / 2} stroke={stroke} strokeWidth={sw} />

      {sc.elements.centerCircle && (
        <circle cx={cx} cy={baseL / 2} r={6} fill="none" stroke={stroke} strokeWidth={sw} />
      )}

      {sc.elements.threePointArch && (
        <>
          <path
            d={`M ${x1} 0 L ${x1} ${hoopOff} A ${threeR} ${threeR} 0 0 0 ${x2} ${hoopOff} L ${x2} 0 Z`}
            fill="none"
            stroke={stroke}
            strokeWidth={sw}
          />
          <path
            d={`M ${x1} ${baseL} L ${x1} ${baseL - hoopOff} A ${threeR} ${threeR} 0 0 1 ${x2} ${baseL - hoopOff} L ${x2} ${baseL} Z`}
            fill="none"
            stroke={stroke}
            strokeWidth={sw}
          />
        </>
      )}

      {sc.elements.key && (
        <>
          <rect x={cx - keyW / 2} y={0} width={keyW} height={keyL} fill="none" stroke={stroke} strokeWidth={sw} />
          <rect x={cx - keyW / 2} y={baseL - keyL} width={keyW} height={keyL} fill="none" stroke={stroke} strokeWidth={sw} />
        </>
      )}

      {sc.elements.keyArch && (
        <>
          <path d={`M ${cx - arcR} ${keyL} A ${arcR} ${arcR} 0 0 0 ${cx + arcR} ${keyL}`} fill="none" stroke={stroke} strokeWidth={sw} />
          <path d={`M ${cx - arcR} ${baseL - keyL} A ${arcR} ${arcR} 0 0 1 ${cx + arcR} ${baseL - keyL}`} fill="none" stroke={stroke} strokeWidth={sw} />
        </>
      )}
    </g>
  );
}

function AdditionalCourts({
  state,
  pad,
  gymW,
  selected,
  setSelected,
  startDrag,
  setState,
}: {
  state: DesignState;
  pad: number;
  gymW: number;
  selected: string | null;
  setSelected: (s: string | null) => void;
  startDrag: (e: React.PointerEvent, target: DragTarget, objX: number, objY: number) => void;
  setState: (u: (s: DesignState) => DesignState) => void;
}) {
  const groups: JSX.Element[] = [];
  const types: {
    sport: 'mainVolleyball' | 'sideVolleyball' | 'badminton' | 'pickleball';
    yOffset: number;
  }[] = [
    { sport: 'mainVolleyball', yOffset: 2 },
    { sport: 'sideVolleyball', yOffset: 2 },
    { sport: 'badminton', yOffset: 2 },
    { sport: 'pickleball', yOffset: 2 },
  ];

  const rotateAdditional = (
    e: React.MouseEvent,
    sport: 'mainVolleyball' | 'sideVolleyball' | 'badminton' | 'pickleball',
    index: number,
  ) => {
    e.stopPropagation();
    setState((s) => {
      const sd = s[sport];
      const positions = (sd.positions ?? []).slice();
      while (positions.length <= index) positions.push({ x: 0, y: 0, rotated: false });
      positions[index] = { ...positions[index], rotated: !positions[index].rotated };
      return { ...s, [sport]: { ...sd, positions } };
    });
  };

  types.forEach(({ sport, yOffset }) => {
    const sd = state[sport];
    if (!sd.enabled || sd.count <= 0) return;
    const size =
      sport === 'mainVolleyball' || sport === 'sideVolleyball'
        ? { w: 30, l: 60 }
        : { w: 20, l: 44 };
    const perRow = Math.min(sd.count, Math.max(1, Math.floor(gymW / (size.w + 4))));
    for (let i = 0; i < sd.count; i++) {
      const col = i % perRow;
      const row = Math.floor(i / perRow);
      const pos = sd.positions?.[i];
      const rotated = pos?.rotated ?? false;
      const w = rotated ? size.l : size.w;
      const h = rotated ? size.w : size.l;
      const defaultX = pad + col * (size.w + 4) + 4;
      const defaultY = pad + yOffset + row * (size.l + 4);
      const x = pos?.x ?? defaultX;
      const y = pos?.y ?? defaultY;
      const id = `${sport}-${i}`;
      groups.push(
        <g
          key={id}
          onPointerDown={(e) => {
            setSelected(id);
            startDrag(e, { kind: 'additional', sport, index: i }, x, y);
          }}
          style={{ cursor: 'grab' }}
        >
          <AdditionalCourtShape
            sport={sport}
            color={sd.color}
            x={x}
            y={y}
            baseW={size.w}
            baseL={size.l}
            rotated={rotated}
          />
          {selected === id && (
            <SelectionHandles
              x={x}
              y={y}
              w={w}
              h={h}
              onRotate={(e) => rotateAdditional(e, sport, i)}
            />
          )}
        </g>,
      );
    }
  });

  return <g>{groups}</g>;
}

function AdditionalCourtShape({
  sport,
  color,
  x,
  y,
  baseW,
  baseL,
  rotated,
}: {
  sport: string;
  color: string;
  x: number;
  y: number;
  baseW: number;
  baseL: number;
  rotated: boolean;
}) {
  const transform = rotated
    ? `translate(${x + baseL / 2} ${y + baseW / 2}) rotate(90) translate(${-baseW / 2} ${-baseL / 2})`
    : `translate(${x} ${y})`;
  const cx = baseW / 2;
  const cy = baseL / 2;
  const sw = 0.2;

  return (
    <g transform={transform} stroke={color} strokeWidth={sw} fill="none">
      <rect x={0} y={0} width={baseW} height={baseL} />
      <line x1={0} y1={cy} x2={baseW} y2={cy} />

      {/* Volleyball: attack lines 10ft from net */}
      {(sport === 'mainVolleyball' || sport === 'sideVolleyball') && (
        <>
          <line x1={0} y1={cy - 10} x2={baseW} y2={cy - 10} />
          <line x1={0} y1={cy + 10} x2={baseW} y2={cy + 10} />
          {/* Net line (bold) */}
          <line x1={0} y1={cy} x2={baseW} y2={cy} strokeWidth={sw * 2} />
        </>
      )}

      {/* Badminton: service lines, back boundary, center line */}
      {sport === 'badminton' && (
        <>
          {/* Short service lines (6.5ft from net) */}
          <line x1={0} y1={cy - 6.5} x2={baseW} y2={cy - 6.5} />
          <line x1={0} y1={cy + 6.5} x2={baseW} y2={cy + 6.5} />
          {/* Long service lines for doubles (2.5ft from back) */}
          <line x1={0} y1={2.5} x2={baseW} y2={2.5} />
          <line x1={0} y1={baseL - 2.5} x2={baseW} y2={baseL - 2.5} />
          {/* Center line splitting each half */}
          <line x1={cx} y1={0} x2={cx} y2={cy - 6.5} />
          <line x1={cx} y1={cy + 6.5} x2={cx} y2={baseL} />
        </>
      )}

      {/* Pickleball: kitchen (non-volley zone) lines 7ft from net, center line */}
      {sport === 'pickleball' && (
        <>
          <line x1={0} y1={cy - 7} x2={baseW} y2={cy - 7} />
          <line x1={0} y1={cy + 7} x2={baseW} y2={cy + 7} />
          {/* Center line */}
          <line x1={cx} y1={0} x2={cx} y2={cy - 7} />
          <line x1={cx} y1={cy + 7} x2={cx} y2={baseL} />
        </>
      )}
    </g>
  );
}

function ElementsLayer({
  state,
  pad,
  gymW,
  gymL,
  selected,
  setSelected,
  startDrag,
}: {
  state: DesignState;
  pad: number;
  gymW: number;
  gymL: number;
  selected: string | null;
  setSelected: (s: string | null) => void;
  startDrag: (e: React.PointerEvent, target: DragTarget, objX: number, objY: number) => void;
}) {
  const items: JSX.Element[] = [];

  // Bowling pins - triangular arrangement
  if (state.elements.bowlingPin.enabled && state.elements.bowlingPin.quantity > 0) {
    const bx = state.elements.bowlingPin.x ?? pad + 4;
    const by = state.elements.bowlingPin.y ?? pad + gymL - 10;
    const pins: JSX.Element[] = [];
    for (let i = 0; i < Math.min(state.elements.bowlingPin.quantity, 20); i++) {
      pins.push(
        <circle
          key={`bp-${i}`}
          cx={(i % 5) * 1.5}
          cy={Math.floor(i / 5) * 1.5}
          r={0.5}
          fill={state.elements.bowlingPin.color}
        />,
      );
    }
    const id = 'el-bowlingPin';
    items.push(
      <g
        key={id}
        transform={`translate(${bx} ${by})`}
        onPointerDown={(e) => {
          setSelected(id);
          startDrag(e, { kind: 'element', key: 'bowlingPin' }, bx, by);
        }}
        style={{ cursor: 'grab' }}
      >
        {pins}
        {selected === id && (
          <rect x={-0.5} y={-0.5} width={8} height={6} fill="none" stroke="#0066ff" strokeWidth={0.2} strokeDasharray="1 0.8" />
        )}
      </g>,
    );
  }

  if (state.elements.baseballBases.enabled && state.elements.baseballBases.quantity > 0) {
    const bx = state.elements.baseballBases.x ?? pad + gymW - 12;
    const by = state.elements.baseballBases.y ?? pad + gymL - 10;
    const bases: JSX.Element[] = [];
    for (let i = 0; i < Math.min(state.elements.baseballBases.quantity, 8); i++) {
      bases.push(
        <rect
          key={`bb-${i}`}
          x={i * 1.5}
          y={0}
          width={1}
          height={1}
          fill={state.elements.baseballBases.color}
          transform={`rotate(45 ${i * 1.5 + 0.5} ${0.5})`}
        />,
      );
    }
    const id = 'el-baseballBases';
    items.push(
      <g
        key={id}
        transform={`translate(${bx} ${by})`}
        onPointerDown={(e) => {
          setSelected(id);
          startDrag(e, { kind: 'element', key: 'baseballBases' }, bx, by);
        }}
        style={{ cursor: 'grab' }}
      >
        {bases}
        {selected === id && (
          <rect x={-0.5} y={-1} width={12} height={3} fill="none" stroke="#0066ff" strokeWidth={0.2} strokeDasharray="1 0.8" />
        )}
      </g>,
    );
  }

  if (state.elements.agilityLadder.enabled && state.elements.agilityLadder.quantity > 0) {
    const lx = state.elements.agilityLadder.x ?? pad + 3;
    const ly = state.elements.agilityLadder.y ?? pad + 3;
    const rungs: JSX.Element[] = [];
    for (let i = 0; i < Math.min(state.elements.agilityLadder.quantity, 10); i++) {
      rungs.push(
        <rect
          key={`al-${i}`}
          x={i * 2}
          y={0}
          width={1.8}
          height={1.5}
          fill="none"
          stroke={state.elements.agilityLadder.color}
          strokeWidth={0.1}
        />,
      );
    }
    const id = 'el-agilityLadder';
    items.push(
      <g
        key={id}
        transform={`translate(${lx} ${ly})`}
        onPointerDown={(e) => {
          setSelected(id);
          startDrag(e, { kind: 'element', key: 'agilityLadder' }, lx, ly);
        }}
        style={{ cursor: 'grab' }}
      >
        {rungs}
        {selected === id && (
          <rect x={-0.3} y={-0.3} width={22} height={2.1} fill="none" stroke="#0066ff" strokeWidth={0.2} strokeDasharray="1 0.8" />
        )}
      </g>,
    );
  }

  if (state.elements.agilityDots.enabled && state.elements.agilityDots.quantity > 0) {
    const dx = state.elements.agilityDots.x ?? pad + gymW - 12;
    const dy = state.elements.agilityDots.y ?? pad + 3;
    const dots: JSX.Element[] = [];
    for (let i = 0; i < Math.min(state.elements.agilityDots.quantity, 25); i++) {
      dots.push(
        <circle
          key={`ad-${i}`}
          cx={(i % 5) * 1.5}
          cy={Math.floor(i / 5) * 1.5}
          r={0.4}
          fill={state.elements.agilityDots.color}
        />,
      );
    }
    const id = 'el-agilityDots';
    items.push(
      <g
        key={id}
        transform={`translate(${dx} ${dy})`}
        onPointerDown={(e) => {
          setSelected(id);
          startDrag(e, { kind: 'element', key: 'agilityDots' }, dx, dy);
        }}
        style={{ cursor: 'grab' }}
      >
        {dots}
        {selected === id && (
          <rect x={-0.5} y={-0.5} width={8} height={8} fill="none" stroke="#0066ff" strokeWidth={0.2} strokeDasharray="1 0.8" />
        )}
      </g>,
    );
  }

  // Characters
  state.characters.forEach((c, i) => {
    const cx = c.x ?? pad + 4 + i * 2.5;
    const cy = c.y ?? pad + gymL / 2;
    const id = `char-${c.id}`;
    items.push(
      <g
        key={id}
        transform={`translate(${cx} ${cy})`}
        onPointerDown={(e) => {
          setSelected(id);
          startDrag(e, { kind: 'character', id: c.id }, cx, cy);
        }}
        style={{ cursor: 'grab' }}
      >
        <text
          x={0}
          y={0}
          fill={c.color}
          fontSize={c.size * 0.1}
          fontWeight="bold"
          fontFamily="Impact, sans-serif"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {c.char}
        </text>
        {selected === id && (
          <rect
            x={-c.size * 0.07}
            y={-c.size * 0.07}
            width={c.size * 0.14}
            height={c.size * 0.14}
            fill="none"
            stroke="#0066ff"
            strokeWidth={0.2}
            strokeDasharray="1 0.8"
          />
        )}
      </g>,
    );
  });

  return <g>{items}</g>;
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return h;
}

function shade(hex: string, pct: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  const nr = Math.max(0, Math.min(255, r + Math.round((255 * pct) / 100)));
  const ng = Math.max(0, Math.min(255, g + Math.round((255 * pct) / 100)));
  const nb = Math.max(0, Math.min(255, b + Math.round((255 * pct) / 100)));
  return `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb
    .toString(16)
    .padStart(2, '0')}`;
}