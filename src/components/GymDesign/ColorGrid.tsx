import { Check } from 'lucide-react';

interface ColorGridProps {
  colors: { name: string; hex: string }[];
  selected: string;
  onSelect: (hex: string) => void;
  deselectedValue?: string;
  columns?: number;
}

export default function ColorGrid({ colors, selected, onSelect, deselectedValue, columns = 4 }: ColorGridProps) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {colors.map((c) => (
        <button
          key={c.hex}
          type="button"
          title={c.name}
          onClick={() => {
            if (deselectedValue !== undefined && selected.toLowerCase() === c.hex.toLowerCase()) {
              onSelect(deselectedValue);
            } else {
              onSelect(c.hex);
            }
          }}
          className="relative aspect-square min-h-[44px] border border-gray-300 hover:border-gray-800 hover:ring-2 hover:ring-gray-400 transition-all"
          style={{ backgroundColor: c.hex }}
        >
          {selected.toLowerCase() === c.hex.toLowerCase() && (
            <Check
              className="absolute inset-0 m-auto"
              size={20}
              color={isLight(c.hex) ? '#000' : '#fff'}
              strokeWidth={3}
            />
          )}
        </button>
      ))}
    </div>
  );
}

function isLight(hex: string): boolean {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}