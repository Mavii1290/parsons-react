import { Eye, EyeOff } from 'lucide-react';
import type { DesignState, MainCourtSize } from '../../../lib/courtTypes.ts';
import { STANDARD_SIZES } from '../../../lib/courtTypes.ts';

interface Props {
  state: DesignState;
  setState: (updater: (s: DesignState) => DesignState) => void;
}

const SIZES: MainCourtSize[] = [
  'HIGH SCHOOL STANDARD SIZE',
  'UNIVERSITY STANDARD SIZE',
  'CUSTOM SIZE',
  'NO MAIN BASKETBALL COURT',
];

const ELEMENTS: { key: keyof DesignState['mainElements']; label: string }[] = [
  { key: 'key', label: 'Key' },
  { key: 'keyArch', label: 'Key Arch' },
  { key: 'threePointArch', label: '3 Point Arch' },
  { key: 'centerCircle', label: 'Center Circle' },
];

export default function Step1MainCourt({ state, setState }: Props) {
  const setSize = (size: MainCourtSize) => {
    const dims = STANDARD_SIZES[size];
    setState((s) => ({
      ...s,
      mainCourtSize: size,
      mainCourtWidth: dims.width,
      mainCourtLength: dims.length,
    }));
  };

  return (
    <div className="space-y-6 p-4">
      <div className="space-y-2">
        {SIZES.map((size) => (
          <label
            key={size}
            className="flex cursor-pointer items-center gap-2 text-xs font-semibold tracking-wider"
          >
            <input
              type="radio"
              name="courtsize"
              checked={state.mainCourtSize === size}
              onChange={() => setSize(size)}
              className="h-4 w-4 accent-[#293879]"
            />
            {size}
          </label>
        ))}
      </div>

      {state.mainCourtSize === 'CUSTOM SIZE' && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-24 bg-[#293879] px-2 py-1 text-xs font-semibold text-white">
              WIDTH FT
            </span>
            <input
              type="number"
              value={state.mainCourtWidth}
              onChange={(e) =>
                setState((s) => ({ ...s, mainCourtWidth: Number(e.target.value) || 0 }))
              }
              className="flex-1 border border-gray-300 px-2 py-1 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-24 bg-[#293879] px-2 py-1 text-xs font-semibold text-white">
              LENGTH FT
            </span>
            <input
              type="number"
              value={state.mainCourtLength}
              onChange={(e) =>
                setState((s) => ({ ...s, mainCourtLength: Number(e.target.value) || 0 }))
              }
              className="flex-1 border border-gray-300 px-2 py-1 text-sm"
            />
          </div>
        </div>
      )}

      <div>
        <h3 className="mb-3 border-b border-gray-300 pb-2 text-xs font-semibold tracking-wider">
          SELECT COURT ELEMENTS APPLICABLE
        </h3>
        <div className="space-y-2">
          {ELEMENTS.map((el) => {
            const on = state.mainElements[el.key];
            return (
              <div
                key={el.key}
                className="flex items-center justify-between border border-gray-200 bg-white px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setState((s) => ({
                        ...s,
                        mainElements: { ...s.mainElements, [el.key]: !on },
                      }))
                    }
                    className="text-[#293879]"
                  >
                    {on ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <span className="text-xs font-semibold">{el.label}</span>
                </div>
                <div className="h-8 w-12 border border-gray-300 bg-[#e6c79b]">
                  <ElementThumb el={el.key} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ElementThumb({ el }: { el: keyof DesignState['mainElements'] }) {
  return (
    <svg viewBox="0 0 48 32" className="h-full w-full">
      <rect x={1} y={1} width={46} height={30} fill="none" stroke="#000" strokeWidth={0.5} />
      {el === 'key' && <rect x={18} y={1} width={12} height={14} fill="none" stroke="#000" strokeWidth={0.5} />}
      {el === 'keyArch' && (
        <path d="M 20 15 A 4 4 0 0 0 28 15" fill="none" stroke="#000" strokeWidth={0.5} />
      )}
      {el === 'threePointArch' && (
        <path d="M 6 1 L 6 5 A 18 16 0 0 0 42 5 L 42 1" fill="none" stroke="#000" strokeWidth={0.5} />
      )}
      {el === 'centerCircle' && (
        <circle cx={24} cy={16} r={3} fill="none" stroke="#000" strokeWidth={0.5} />
      )}
    </svg>
  );
}