import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TopBarProps {
  title: string;
  step: number;
  totalSteps: number;
  canBack: boolean;
  canNext: boolean;
  onStartOver: () => void;
  onClear: () => void;
  onBack: () => void;
  onNext: () => void;
}

export default function TopBar({
  title,
  step,
  totalSteps,
  canBack,
  canNext,
  onStartOver,
  onClear,
  onBack,
  onNext,
}: TopBarProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <h1
        className="text-2xl md:text-3xl text-gray-900"
        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
      >
        {title}
      </h1>
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold tracking-wider text-gray-700">
          STEP {step}/{totalSteps}
        </span>
        <button
          onClick={onStartOver}
          className="bg-[#293879] px-4 py-2 text-xs font-semibold tracking-wider text-white hover:bg-[#0a2f5c]"
        >
          START OVER
        </button>
        <button
          onClick={onClear}
          className="bg-[#293879] px-4 py-2 text-xs font-semibold tracking-wider text-white hover:bg-[#0a2f5c]"
        >
          CLEAR
        </button>
        <button
          onClick={onBack}
          disabled={!canBack}
          className="flex items-center gap-1 bg-[#293879] px-4 py-2 text-xs font-semibold tracking-wider text-white hover:bg-[#0a2f5c] disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={14} /> BACK
        </button>
        <button
          onClick={onNext}
          disabled={!canNext}
          className="flex items-center gap-1 bg-[#293879] px-4 py-2 text-xs font-semibold tracking-wider text-white hover:bg-[#0a2f5c] disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          NEXT <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}