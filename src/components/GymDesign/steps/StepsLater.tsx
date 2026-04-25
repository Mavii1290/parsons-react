import { useState } from 'react';
import { Plus, Minus, Eye, EyeOff, X } from 'lucide-react';
import ColorGrid from '../ColorGrid.tsx';
import { Accordion } from './Step2DesignOptions.tsx';
import type { DesignState, SideCourt } from '../../../lib/courtTypes';
import { SOLID_COLORS, WOOD_STAINS, SPORT_SIZES } from '../../../lib/courtTypes.ts';

interface Props {
  state: DesignState;
  setState: (updater: (s: DesignState) => DesignState) => void;
}

const COURT_ELEMENTS: { key: keyof SideCourt['elements']; label: string }[] = [
  { key: 'key', label: 'Key' },
  { key: 'keyArch', label: 'Key Arch' },
  { key: 'threePointArch', label: '3 Point Arch' },
  { key: 'centerCircle', label: 'Center Circle' },
];

export function Step3SideCourts({ state, setState }: Props) {
  const addCourt = () => {
    setState((s) => ({
      ...s,
      sideCourts: [
        ...s.sideCourts,
        {
          id: Math.random().toString(36).slice(2),
          lineColor: '#000000',
          elements: { key: true, keyArch: true, threePointArch: true, centerCircle: true },
          rotated: false,
        },
      ],
    }));
  };
  const removeCourt = (id: string) =>
    setState((s) => ({ ...s, sideCourts: s.sideCourts.filter((c) => c.id !== id) }));
  const updateCourt = (id: string, patch: Partial<SideCourt>) =>
    setState((s) => ({
      ...s,
      sideCourts: s.sideCourts.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));

  return (
    <div className="p-4 space-y-3">
      <button
        onClick={addCourt}
        className="flex w-full items-center justify-center gap-2 bg-[#293879] px-3 py-2 text-xs font-semibold text-white hover:bg-[#0a2f5c]"
      >
        <Plus size={14} /> ADD COURT
      </button>
      {state.sideCourts.map((c, idx) => (
        <SideCourtRow
          key={c.id}
          court={c}
          index={idx}
          onRemove={() => removeCourt(c.id)}
          onUpdate={(patch) => updateCourt(c.id, patch)}
        />
      ))}
      <button
        onClick={addCourt}
        className="flex w-full items-center justify-center gap-2 bg-[#293879] px-3 py-2 text-xs font-semibold text-white hover:bg-[#0a2f5c]"
      >
        <Plus size={14} /> ADD COURT
      </button>
      <p className="pt-2 text-[10px] text-gray-500">
        Tip: You can drag courts on the canvas and use the rotate handle to flip 90°.
      </p>
    </div>
  );
}

function SideCourtRow({
  court,
  index,
  onRemove,
  onUpdate,
}: {
  court: SideCourt;
  index: number;
  onRemove: () => void;
  onUpdate: (patch: Partial<SideCourt>) => void;
}) {
  const [lineOpen, setLineOpen] = useState(true);
  const [elOpen, setElOpen] = useState(false);

  return (
    <div className="border border-gray-200 bg-gray-50">
      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-xs font-bold tracking-wider">COURT #{index + 1}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdate({ rotated: !court.rotated })}
            className="border border-gray-400 bg-white px-2 py-1 text-[10px] font-semibold hover:bg-gray-100"
          >
            ROTATE 90°
          </button>
          <button
            onClick={onRemove}
            className="flex items-center gap-1 bg-red-700 px-2 py-1 text-xs font-semibold text-white hover:bg-red-800"
          >
            <Minus size={12} />
          </button>
        </div>
      </div>
      <Accordion title="LINE COLOR" isOpen={lineOpen} onToggle={() => setLineOpen((o) => !o)}>
        <div className="p-3">
          <ColorGrid
            colors={SOLID_COLORS}
            selected={court.lineColor}
            onSelect={(hex) => onUpdate({ lineColor: hex })}
          />
        </div>
      </Accordion>
      <Accordion
        title="SELECT COURT ELEMENTS APPLICABLE"
        isOpen={elOpen}
        onToggle={() => setElOpen((o) => !o)}
      >
        <div className="space-y-2 p-3">
          {COURT_ELEMENTS.map((el) => {
            const on = court.elements[el.key];
            return (
              <div
                key={el.key}
                className="flex items-center justify-between border border-gray-200 bg-white px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      onUpdate({ elements: { ...court.elements, [el.key]: !on } })
                    }
                    className="text-[#293879]"
                  >
                    {on ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <span className="text-xs font-semibold">{el.label}</span>
                </div>
                <div className="h-8 w-12 border border-gray-300 bg-[#e6c79b]" />
              </div>
            );
          })}
        </div>
      </Accordion>
    </div>
  );
}

export function Step4Additional({ state, setState }: Props) {
  const sports: {
    key: 'mainVolleyball' | 'sideVolleyball' | 'badminton' | 'pickleball';
    label: string;
    sizeKey: keyof typeof SPORT_SIZES;
  }[] = [
    { key: 'mainVolleyball', label: 'MAIN VOLLEYBALL', sizeKey: 'mainVolleyball' },
    { key: 'sideVolleyball', label: 'SIDE VOLLEYBALL', sizeKey: 'sideVolleyball' },
    { key: 'badminton', label: 'BADMINTON', sizeKey: 'badminton' },
    { key: 'pickleball', label: 'PICKLEBALL', sizeKey: 'pickleball' },
  ];

  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="p-4 space-y-3">
      <h3 className="border-b border-gray-300 pb-2 text-xs font-bold tracking-wider">
        ADD ADDITIONAL COURTS
      </h3>
      {sports.map((sport) => {
        const sd = state[sport.key];
        const isOpen = openKey === sport.key;
        return (
          <div key={sport.key} className="border border-gray-200">
            <div className="flex items-center justify-between bg-gray-50 px-3 py-2">
              <span className="text-xs font-bold tracking-wider">{sport.label}</span>
              <button
                onClick={() => setOpenKey(isOpen ? null : sport.key)}
                className="bg-[#293879] px-3 py-1 text-[10px] font-semibold text-white"
              >
                {isOpen ? 'CLOSE' : 'OPEN'}
              </button>
            </div>
            {isOpen && (
              <div className="space-y-3 p-3">
                <div>
                  <div className="mb-2 text-[10px] font-semibold tracking-wider text-gray-600">
                    COURTS
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {Array.from({ length: 10 }).map((_, i) => {
                      const n = i + 1;
                      const active = sd.count >= n;
                      return (
                        <button
                          key={n}
                          onClick={() =>
                            setState((s) => ({
                              ...s,
                              [sport.key]: {
                                ...s[sport.key],
                                count: sd.count === n ? 0 : n,
                                enabled: sd.count === n ? false : true,
                              },
                            }))
                          }
                          className={`border px-2 py-2 text-[11px] font-bold tracking-wider ${
                            active
                              ? 'border-[#293879] bg-[#293879] text-white'
                              : 'border-[#293879] bg-white text-[#293879]'
                          }`}
                        >
                          COURT #{n}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <div className="mb-2 text-[10px] font-semibold tracking-wider text-gray-600">
                    COLOR
                  </div>
                  <ColorGrid
                    colors={SOLID_COLORS}
                    selected={sd.color}
                    onSelect={(hex) =>
                      setState((s) => ({
                        ...s,
                        [sport.key]: { ...s[sport.key], color: hex },
                      }))
                    }
                  />
                </div>
                <div>
                  <div className="mb-2 text-[10px] font-semibold tracking-wider text-gray-600">
                    WOOD STAIN
                  </div>
                  <ColorGrid
                    colors={WOOD_STAINS}
                    selected={sd.woodStain}
                    onSelect={(hex) =>
                      setState((s) => ({
                        ...s,
                        [sport.key]: { ...s[sport.key], woodStain: hex },
                      }))
                    }
                    columns={4}
                  />
                </div>
                <div className="text-[10px] font-semibold tracking-wider text-gray-600">
                  SIZE: <span className="text-gray-900">{SPORT_SIZES[sport.sizeKey]}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const ELEMENT_THUMBS: Record<string, JSX.Element> = {
  bowlingPin: (
    <svg viewBox="0 0 40 30" className="h-full w-full">
      <circle cx="20" cy="6" r="1.2" fill="#000" />
      <circle cx="16" cy="12" r="1.2" fill="#000" />
      <circle cx="24" cy="12" r="1.2" fill="#000" />
      <circle cx="12" cy="18" r="1.2" fill="#000" />
      <circle cx="20" cy="18" r="1.2" fill="#000" />
      <circle cx="28" cy="18" r="1.2" fill="#000" />
    </svg>
  ),
  baseballBases: (
    <svg viewBox="0 0 40 30" className="h-full w-full">
      <rect x="18" y="4" width="4" height="4" fill="#000" transform="rotate(45 20 6)" />
      <rect x="6" y="14" width="4" height="4" fill="#000" transform="rotate(45 8 16)" />
      <rect x="30" y="14" width="4" height="4" fill="#000" transform="rotate(45 32 16)" />
      <rect x="18" y="22" width="4" height="4" fill="#000" transform="rotate(45 20 24)" />
    </svg>
  ),
  agilityLadder: (
    <svg viewBox="0 0 60 16" className="h-full w-full">
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={2 + i * 9} y={2} width={8} height={12} fill="none" stroke="#000" strokeWidth="0.6" />
      ))}
    </svg>
  ),
  agilityDots: (
    <svg viewBox="0 0 40 30" className="h-full w-full">
      <circle cx="20" cy="8" r="1.2" fill="#000" />
      <circle cx="12" cy="16" r="1.2" fill="#000" />
      <circle cx="28" cy="16" r="1.2" fill="#000" />
      <circle cx="16" cy="22" r="1.2" fill="#000" />
      <circle cx="24" cy="22" r="1.2" fill="#000" />
    </svg>
  ),
};

export function Step5Elements({ state, setState }: Props) {
  const elements: {
    key: keyof DesignState['elements'];
    label: string;
  }[] = [
    { key: 'bowlingPin', label: 'BOWLING PIN MARKERS' },
    { key: 'baseballBases', label: 'BASEBALL BASES' },
    { key: 'agilityLadder', label: 'AGILITY LADDER' },
    { key: 'agilityDots', label: 'AGILITY DOTS' },
  ];

  // Each element section has its own open state - all closed by default per Milburn reference
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({
    bowlingPin: false,
    baseballBases: false,
    agilityLadder: false,
    agilityDots: false,
    numbers: false,
  });

  const toggleOpen = (k: string) => setOpenMap((o) => ({ ...o, [k]: !o[k] }));

  const [charBuffer, setCharBuffer] = useState('');
  const [charSize, setCharSize] = useState(18);

  const addCharFromQuick = (ch: string) => {
    setCharBuffer((b) => b + ch);
  };

  const commitCharacters = () => {
    if (!charBuffer) return;
    const chars = charBuffer.split('');
    setState((s) => ({
      ...s,
      characters: [
        ...s.characters,
        ...chars.map((ch) => ({
          id: Math.random().toString(36).slice(2),
          char: ch,
          size: charSize,
          color: '#000000',
        })),
      ],
    }));
    setCharBuffer('');
  };

  return (
    <div className="p-4 space-y-3">
      <h3 className="border-b border-gray-300 pb-2 text-xs font-bold tracking-wider">
        ADD ELEMENTS
      </h3>

      {elements.map((el) => {
        const data = state.elements[el.key];
        const isOpen = openMap[el.key];
        return (
          <div key={el.key} className="border border-gray-200">
            <div className="flex items-center justify-between bg-gray-50 px-3 py-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      elements: {
                        ...s.elements,
                        [el.key]: { ...data, enabled: !data.enabled },
                      },
                    }))
                  }
                  className="text-[#293879]"
                  title="Toggle visibility"
                >
                  {data.enabled ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <span className="text-xs font-bold tracking-wider">{el.label}</span>
              </div>
              <button
                onClick={() => toggleOpen(el.key)}
                className="bg-[#293879] px-3 py-1 text-[10px] font-semibold text-white"
              >
                {isOpen ? 'CLOSE' : 'OPEN'}
              </button>
            </div>
            {isOpen && (
              <div className="space-y-3 p-3 bg-white">
                <div className="flex h-16 items-center justify-center border border-gray-200 bg-white">
                  <div className="h-12 w-20">{ELEMENT_THUMBS[el.key as string]}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24 bg-[#293879] px-2 py-1 text-[10px] font-semibold text-white">
                    QUANTITY
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={data.quantity}
                    onChange={(e) =>
                      setState((s) => ({
                        ...s,
                        elements: {
                          ...s.elements,
                          [el.key]: {
                            ...data,
                            quantity: Number(e.target.value) || 0,
                            enabled: Number(e.target.value) > 0 ? true : data.enabled,
                          },
                        },
                      }))
                    }
                    className="flex-1 border border-gray-300 px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <div className="mb-2 text-[10px] font-semibold tracking-wider text-gray-600">
                    FILL COLOR
                  </div>
                  <ColorGrid
                    colors={SOLID_COLORS}
                    selected={data.color}
                    onSelect={(hex) =>
                      setState((s) => ({
                        ...s,
                        elements: {
                          ...s.elements,
                          [el.key]: { ...data, color: hex },
                        },
                      }))
                    }
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Numbers and Letters */}
      <div className="border border-gray-200">
        <div className="flex items-center justify-between bg-gray-50 px-3 py-2">
          <div className="flex items-center gap-2">
            <Eye size={14} className="text-[#293879]" />
            <span className="text-xs font-bold tracking-wider">NUMBERS AND LETTERS 1-24</span>
          </div>
          <button
            onClick={() => toggleOpen('numbers')}
            className="bg-[#293879] px-3 py-1 text-[10px] font-semibold text-white"
          >
            {openMap.numbers ? 'CLOSE' : 'OPEN'}
          </button>
        </div>
        {openMap.numbers && (
          <div className="space-y-3 p-3 bg-white">
            <div className="grid grid-cols-10 gap-1">
              {'1,2,3,4,5,6,7,8,9,10'.split(',').map((n) => (
                <button
                  key={n}
                  onClick={() => addCharFromQuick(n)}
                  className="border border-gray-300 bg-white px-1 py-1 text-[11px] font-bold hover:bg-gray-100"
                >
                  {n}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 26 }).map((_, i) => {
                const ch = String.fromCharCode(65 + i);
                return (
                  <button
                    key={ch}
                    onClick={() => addCharFromQuick(ch)}
                    className="border border-gray-300 bg-white px-1 py-1 text-[11px] font-bold hover:bg-gray-100"
                  >
                    {ch}
                  </button>
                );
              })}
              <button
                onClick={() => setCharBuffer((b) => b + '•')}
                className="border border-gray-300 bg-white px-1 py-1 text-[11px] font-bold hover:bg-gray-100"
                title="Dot"
              >
                •
              </button>
            </div>
            <button
              onClick={commitCharacters}
              className="w-full bg-[#293879] px-3 py-2 text-xs font-bold tracking-wider text-white hover:bg-[#0a2f5c]"
            >
              ADD CHARACTER
            </button>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={charBuffer}
                onChange={(e) => setCharBuffer(e.target.value)}
                placeholder="EFG"
                className="flex-1 border border-gray-300 px-2 py-1 text-sm"
              />
              <input
                type="number"
                value={charSize}
                min={6}
                max={200}
                onChange={(e) => setCharSize(Number(e.target.value) || 18)}
                className="w-16 border border-gray-300 px-2 py-1 text-sm"
              />
              <button
                onClick={() => setCharBuffer('')}
                className="flex h-8 w-8 items-center justify-center border border-gray-300 bg-white hover:bg-gray-100"
                title="Clear input"
              >
                <X size={14} />
              </button>
            </div>
            <div>
              <div className="mb-2 text-[10px] font-semibold tracking-wider text-gray-600">
                FILL COLOR
              </div>
              <ColorGrid
                colors={SOLID_COLORS}
                selected="#000000"
                onSelect={(hex) => {
                  // Apply this color to the last added character (if any)
                  setState((s) => {
                    if (s.characters.length === 0) return s;
                    const chars = s.characters.slice();
                    chars[chars.length - 1] = { ...chars[chars.length - 1], color: hex };
                    return { ...s, characters: chars };
                  });
                }}
              />
            </div>
            {state.characters.length > 0 && (
              <div className="flex items-center justify-between border-t border-gray-200 pt-2">
                <span className="text-[10px] text-gray-600">
                  {state.characters.length} character(s) placed
                </span>
                <button
                  onClick={() => setState((s) => ({ ...s, characters: [] }))}
                  className="bg-red-700 px-2 py-1 text-[10px] text-white hover:bg-red-800"
                >
                  CLEAR ALL
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="pt-2 text-[10px] text-gray-500">
        Tip: Drag elements on the canvas to reposition.
      </p>
    </div>
  );
}

export function Step6Summary({ state, setState }: Props) {
  const layers: { label: string; detail?: string; layerId?: string }[] = [];
  layers.push({
    label: 'Gym Floor',
    detail: `${state.gymWidth}ft x ${state.gymLength}ft · ${state.floorType}`,
  });
  if (state.mainCourtSize !== 'NO MAIN BASKETBALL COURT') {
    layers.push({
      label: 'Main Basketball Court',
      layerId: 'mainCourt',
      detail: `${state.mainCourtWidth}ft x ${state.mainCourtLength}ft · ${state.mainCourtSize}${
        state.mainCourtRotated ? ' · Rotated 90°' : ''
      }`,
    });
    layers.push({
      label: 'Border',
      detail: `TB ${state.borderThicknessTB}in · LR ${state.borderThicknessLR}in`,
    });
    const activeEls = Object.entries(state.mainElements)
      .filter(([, v]) => v)
      .map(([k]) => k)
      .join(', ');
    if (activeEls) layers.push({ label: 'Court Elements', detail: activeEls });
    if (state.topBorderText) layers.push({ label: 'Top/Bottom Text', detail: state.topBorderText });
    if (state.leftBorderText) layers.push({ label: 'Left/Right Text', detail: state.leftBorderText });
    if (state.logos.length) layers.push({ label: 'Logos', detail: `${state.logos.length} uploaded` });
  }
  if (state.sideCourts.length) {
    layers.push({ label: 'Side Courts', layerId: 'sideCourts', detail: `${state.sideCourts.length} court(s)` });
  }
  const sports: [string, string, { count: number; enabled: boolean }][] = [
    ['Main Volleyball', 'additionalCourts', state.mainVolleyball],
    ['Side Volleyball', 'additionalCourts', state.sideVolleyball],
    ['Badminton', 'additionalCourts', state.badminton],
    ['Pickleball', 'additionalCourts', state.pickleball],
  ];
  sports.forEach(([label, layerId, data]) => {
    if (data.enabled && data.count > 0) layers.push({ label, layerId, detail: `${data.count} court(s)` });
  });
  Object.entries(state.elements).forEach(([k, v]) => {
    if (v.enabled && v.quantity > 0) layers.push({ label: k, layerId: 'elements', detail: `Quantity: ${v.quantity}` });
  });
  if (state.characters.length) {
    layers.push({
      label: 'Characters',
      layerId: 'elements',
      detail: state.characters.map((c) => c.char).join(' '),
    });
  }

  const toggleLayer = (layerId: string) => {
    setState((s) => ({
      ...s,
      hiddenLayers: s.hiddenLayers?.includes(layerId)
        ? s.hiddenLayers.filter((id) => id !== layerId)
        : [...(s.hiddenLayers ?? []), layerId],
    }));
  };

  return (
    <div className="p-4 space-y-3">
      <h3 className="border-b border-gray-300 pb-2 text-xs font-bold tracking-wider">
        COURT LAYERS
      </h3>
      <div className="space-y-1">
        {layers.map((l, i) => {
          const hidden = l.layerId ? state.hiddenLayers?.includes(l.layerId) : false;
          return (
            <div key={i} className={`flex items-start justify-between border border-gray-200 bg-white px-3 py-2 ${hidden ? 'opacity-40' : ''}`}>
              <div>
                <div className="text-xs font-bold text-gray-800">{l.label}</div>
                {l.detail && <div className="text-[11px] text-gray-600">{l.detail}</div>}
              </div>
              {l.layerId && (
                <button
                  type="button"
                  onClick={() => toggleLayer(l.layerId!)}
                  className="ml-2 shrink-0 text-[#293879] hover:text-[#0a2f5c]"
                  title={hidden ? 'Show layer' : 'Hide layer'}
                >
                  {hidden ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              )}
            </div>
          );
        })}
      </div>
      <p className="pt-2 text-[11px] text-gray-600">
        Review your design above. Use the <strong>GET PDF</strong> button below to download your court.
      </p>
    </div>
  );
}