import { useState, useRef } from 'react';
import { ChevronDown, ChevronUp, Upload, Eye, EyeOff, X } from 'lucide-react';
import ColorGrid from '../ColorGrid.tsx';
import type { DesignState } from '../../../lib/courtTypes.ts';
import { SOLID_COLORS, WOOD_STAINS, FONT_OPTIONS } from '../../../lib/courtTypes.ts';

interface Props {
  state: DesignState;
  setState: (updater: (s: DesignState) => DesignState) => void;
}

export default function Step2DesignOptions({ state, setState }: Props) {
  // Border size always visible; one color section open by default so the palette is immediately visible
  const [open, setOpen] = useState<Record<string, boolean>>({
    borderSize: true,
    interior: true,
  });

  const toggle = (k: string) => setOpen((o) => ({ ...o, [k]: !o[k] }));

  return (
    <div className="divide-y divide-gray-200">
      <Accordion
        title="BORDER SIZE"
        isOpen={!!open.borderSize}
        onToggle={() => toggle('borderSize')}
      >
        <div className="space-y-2 p-3">
          <NumberRow
            label="THICKNESS TB IN"
            value={state.borderThicknessTB}
            onChange={(v) => setState((s) => ({ ...s, borderThicknessTB: v }))}
          />
          <NumberRow
            label="THICKNESS LR IN"
            value={state.borderThicknessLR}
            onChange={(v) => setState((s) => ({ ...s, borderThicknessLR: v }))}
          />
        </div>
      </Accordion>

      <Accordion
        title="BORDER COLOR (TOP/BOTTOM)"
        isOpen={!!open.bcTB}
        onToggle={() => toggle('bcTB')}
      >
        <div className="p-3 space-y-3">
          <div className="text-[10px] font-semibold tracking-wider text-gray-600">SOLID</div>
          <ColorGrid
            colors={SOLID_COLORS}
            selected={state.borderColorTB}
            onSelect={(hex) => setState((s) => ({ ...s, borderColorTB: hex }))}
          />
          <div className="text-[10px] font-semibold tracking-wider text-gray-600">WOOD STAIN</div>
          <ColorGrid
            colors={WOOD_STAINS}
            selected={state.borderColorTB}
            onSelect={(hex) => setState((s) => ({ ...s, borderColorTB: hex }))}
            columns={4}
          />
        </div>
      </Accordion>

      <Accordion
        title="BORDER COLOR (LEFT/RIGHT)"
        isOpen={!!open.bcLR}
        onToggle={() => toggle('bcLR')}
      >
        <div className="p-3 space-y-3">
          <div className="text-[10px] font-semibold tracking-wider text-gray-600">SOLID</div>
          <ColorGrid
            colors={SOLID_COLORS}
            selected={state.borderColorLR}
            onSelect={(hex) => setState((s) => ({ ...s, borderColorLR: hex }))}
          />
          <div className="text-[10px] font-semibold tracking-wider text-gray-600">WOOD STAIN</div>
          <ColorGrid
            colors={WOOD_STAINS}
            selected={state.borderColorLR}
            onSelect={(hex) => setState((s) => ({ ...s, borderColorLR: hex }))}
            columns={4}
          />
        </div>
      </Accordion>

      <Accordion title="LINE COLOR" isOpen={!!open.line} onToggle={() => toggle('line')}>
        <div className="p-3">
          <ColorGrid
            colors={SOLID_COLORS}
            selected={state.lineColor}
            onSelect={(hex) => setState((s) => ({ ...s, lineColor: hex }))}
          />
        </div>
      </Accordion>

      <Accordion
        title="COURT INTERIOR COLOR"
        isOpen={!!open.interior}
        onToggle={() => toggle('interior')}
      >
        <div className="p-3 space-y-3">
          <div className="text-[10px] font-semibold tracking-wider text-gray-600">WOOD STAIN</div>
          <ColorGrid
            colors={WOOD_STAINS}
            selected={state.courtInteriorColor}
            onSelect={(hex) => setState((s) => ({ ...s, courtInteriorColor: hex }))}
            columns={4}
          />
          <div className="text-[10px] font-semibold tracking-wider text-gray-600">SOLID</div>
          <ColorGrid
            colors={SOLID_COLORS}
            selected={state.courtInteriorColor}
            onSelect={(hex) => setState((s) => ({ ...s, courtInteriorColor: hex }))}
          />
        </div>
      </Accordion>

      <Accordion title="KEY COLOR" isOpen={!!open.keyC} onToggle={() => toggle('keyC')}>
        <div className="p-3 space-y-3">
          <ColorGrid
            colors={SOLID_COLORS}
            selected={state.keyColor}
            onSelect={(hex) => setState((s) => ({ ...s, keyColor: hex }))}
            deselectedValue={state.courtInteriorColor}
          />
        </div>
      </Accordion>

      <Accordion
        title="KEY ARCH COLOR"
        isOpen={!!open.keyArchC}
        onToggle={() => toggle('keyArchC')}
      >
        <div className="p-3">
          <ColorGrid
            colors={SOLID_COLORS}
            selected={state.keyArchColor}
            onSelect={(hex) => setState((s) => ({ ...s, keyArchColor: hex }))}
            deselectedValue={state.courtInteriorColor}
          />
        </div>
      </Accordion>

      <Accordion
        title="3 POINT FILL COLOR"
        isOpen={!!open.threeFill}
        onToggle={() => toggle('threeFill')}
      >
        <div className="p-3">
          <ColorGrid
            colors={SOLID_COLORS}
            selected={state.threePointFillColor}
            onSelect={(hex) => setState((s) => ({ ...s, threePointFillColor: hex }))}
            deselectedValue={state.courtInteriorColor}
          />
        </div>
      </Accordion>

      <Accordion
        title="CENTER COURT LOGO"
        isOpen={!!open.logo}
        onToggle={() => toggle('logo')}
      >
        <LogoUpload state={state} setState={setState} />
      </Accordion>

      <Accordion
        title="CHOOSE FONT FOR TOP/BOTTOM BORDER"
        isOpen={!!open.fontTB}
        onToggle={() => toggle('fontTB')}
      >
        <FontSection
          font={state.topBorderFont}
          text={state.topBorderText}
          size={state.topBorderFontSize}
          color={state.topBorderTextColor}
          onFont={(v) => setState((s) => ({ ...s, topBorderFont: v }))}
          onText={(v) => setState((s) => ({ ...s, topBorderText: v }))}
          onSize={(v) => setState((s) => ({ ...s, topBorderFontSize: v }))}
          onColor={(v) => setState((s) => ({ ...s, topBorderTextColor: v }))}
        />
      </Accordion>

      <Accordion
        title="CHOOSE FONT FOR LEFT/RIGHT BORDER"
        isOpen={!!open.fontLR}
        onToggle={() => toggle('fontLR')}
      >
        <FontSection
          font={state.leftBorderFont}
          text={state.leftBorderText}
          size={state.leftBorderFontSize}
          color={state.leftBorderTextColor}
          onFont={(v) => setState((s) => ({ ...s, leftBorderFont: v }))}
          onText={(v) => setState((s) => ({ ...s, leftBorderText: v }))}
          onSize={(v) => setState((s) => ({ ...s, leftBorderFontSize: v }))}
          onColor={(v) => setState((s) => ({ ...s, leftBorderTextColor: v }))}
        />
      </Accordion>

      <Accordion
        title="SELECT FONT ORIENTATION"
        isOpen={!!open.orient}
        onToggle={() => toggle('orient')}
      >
        <div className="p-3">
          <select
            value={state.fontOrientation}
            onChange={(e) =>
              setState((s) => ({
                ...s,
                fontOrientation: e.target.value as DesignState['fontOrientation'],
              }))
            }
            className="w-full border border-gray-300 bg-white px-2 py-2 text-xs"
          >
            <option>Top Inward/Bottom Inward</option>
            <option>Top Outward/Bottom Outward</option>
          </select>
        </div>
      </Accordion>
    </div>
  );
}

export function Accordion({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between bg-gray-50 px-4 py-3 text-left text-xs font-bold tracking-wider text-gray-800 hover:bg-gray-100"
      >
        {title}
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {isOpen && <div className="bg-white">{children}</div>}
    </div>
  );
}

function NumberRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-32 bg-[#293879] px-2 py-1 text-[10px] font-semibold text-white">
        {label}
      </span>
      <input
        type="number"
        value={value}
        min={0}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="flex-1 border border-gray-300 px-2 py-1 text-sm"
      />
    </div>
  );
}

function FontSection({
  font,
  text,
  size,
  color,
  onFont,
  onText,
  onSize,
  onColor,
}: {
  font: string;
  text: string;
  size: number;
  color: string;
  onFont: (v: string) => void;
  onText: (v: string) => void;
  onSize: (v: number) => void;
  onColor: (v: string) => void;
}) {
  const [colorOpen, setColorOpen] = useState(false);
  return (
    <div className="space-y-2 p-3">
      <select
        value={font}
        onChange={(e) => onFont(e.target.value)}
        className="w-full border border-gray-300 px-2 py-1 text-xs"
      >
        {FONT_OPTIONS.map((f) => (
          <option key={f}>{f}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Enter text"
        value={text}
        onChange={(e) => onText(e.target.value)}
        className="w-full border border-gray-300 px-2 py-1 text-xs"
      />
      <div className="flex items-center gap-2">
        <span className="w-24 bg-[#293879] px-2 py-1 text-[10px] font-semibold text-white">
          FONT SIZE
        </span>
        <input
          type="number"
          value={size}
          min={4}
          max={200}
          onChange={(e) => onSize(Number(e.target.value) || 12)}
          className="flex-1 border border-gray-300 px-2 py-1 text-sm"
        />
      </div>
      <button
        onClick={() => setColorOpen((o) => !o)}
        className="flex w-full items-center justify-between border border-gray-300 px-2 py-1 text-xs font-semibold"
      >
        <span className="flex items-center gap-2">
          <span
            className="inline-block h-4 w-4 border border-gray-400"
            style={{ backgroundColor: color }}
          />
          TEXT COLOR
        </span>
        {colorOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>
      {colorOpen && (
        <ColorGrid colors={SOLID_COLORS} selected={color} onSelect={onColor} />
      )}
    </div>
  );
}

function LogoUpload({ state, setState }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [visible, setVisible] = useState(true);

  const handleFile = (f: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      const id = Math.random().toString(36).slice(2);
      setState((s) => ({
        ...s,
        logos: [
          ...s.logos,
          {
            id,
            src,
            x: 0.5,
            y: s.logos.length === 0 ? 0.5 : 0.5 + (s.logos.length - 0.5) * 0.15,
            size: 0.18,
          },
        ],
      }));
    };
    reader.readAsDataURL(f);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  return (
    <div className="p-3 space-y-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setVisible((v) => !v)}
          className="text-[#293879]"
          title="Toggle visibility"
        >
          {visible ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
        <span className="text-[10px] font-semibold tracking-wider">CENTER COURT LOGO</span>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="flex cursor-pointer items-center justify-center gap-2 border-2 border-dashed border-gray-400 bg-gray-50 px-3 py-4 text-xs font-semibold text-gray-700 hover:border-[#293879] hover:bg-white"
      >
        <Upload size={14} /> UPLOAD LOGO
      </div>
      <button
        onClick={() => inputRef.current?.click()}
        className="w-full bg-[#293879] px-3 py-2 text-xs font-semibold text-white hover:bg-[#0a2f5c]"
      >
        ADD ADDITIONAL LOGO
      </button>
      {state.logos.length > 0 && (
        <div className="space-y-1 pt-2">
          {state.logos.map((l, i) => (
            <div
              key={l.id}
              className="flex items-center justify-between border border-gray-200 bg-gray-50 px-2 py-1"
            >
              <img src={l.src} alt="" className="h-8 w-8 object-contain" />
              <span className="text-[10px] font-semibold">Logo #{i + 1}</span>
              <button
                onClick={() =>
                  setState((s) => ({ ...s, logos: s.logos.filter((x) => x.id !== l.id) }))
                }
                className="text-red-600 hover:text-red-800"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}