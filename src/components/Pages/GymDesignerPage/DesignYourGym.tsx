import { useRef, useState, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';
import jsPDF from 'jspdf';
import TopBar from '../../GymDesign/TopBar.tsx';
import CourtCanvas from '../../GymDesign/CourtCanvas.tsx';
import Step1MainCourt from '../../GymDesign/steps/Step1MainCourt.tsx';
import Step2DesignOptions from '../../GymDesign/steps/Step2DesignOptions.tsx';
import {
  Step3SideCourts,
  Step4Additional,
  Step5Elements,
  Step6Summary,
} from '../../GymDesign/steps/StepsLater.tsx';
import { createDefaultState, type DesignState, type FloorType } from '../../../lib/courtTypes.ts';
import './DesignYourGym.css';
import HeaderBar from '../../HeaderBar/HeaderBar.js';
import Footer from '../../Footer/Footer.js';

type Mode = 'splash' | 'design';

const TOTAL_STEPS = 6;

const STEP_TITLES: Record<number, string> = {
  1: 'Main Basketball Court',
  2: 'Main Basketball Court Design Options',
  3: 'Side Basketball Court(s)',
  4: 'Additional Courts',
  5: 'Elements',
  6: 'Your Court',
};

export default function Index() {
  const [mode, setMode] = useState<Mode>('splash');
  const [step, setStep] = useState(1);
  const [state, setState] = useState<DesignState>(createDefaultState());
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = canvasContainerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setState((s) => ({
        ...s,
        zoom: Math.min(3, Math.max(0.3, s.zoom - e.deltaY * 0.001)),
      }));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const startOver = () => {
    setState(createDefaultState());
    setMode('splash');
    setStep(1);
  };

  const clear = () => {
    setState((s) => ({
      ...createDefaultState(),
      gymWidth: s.gymWidth,
      gymLength: s.gymLength,
      floorType: s.floorType,
    }));
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
    else setMode('splash');
  };

  const goNext = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const handleGetPdf = async () => {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((res, rej) => {
        img.onload = () => res();
        img.onerror = () => rej(new Error('img load error'));
        img.src = url;
      });
      const canvas = document.createElement('canvas');
      const scale = 2;
      canvas.width = (img.width || 800) * scale;
      canvas.height = (img.height || 1000) * scale;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const png = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'pt',
        format: 'letter',
      });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 36;
      const availW = pageW - margin * 2;
      const availH = pageH - margin * 2 - 40;
      const ratio = Math.min(availW / canvas.width, availH / canvas.height);
      const w = canvas.width * ratio;
      const h = canvas.height * ratio;
      const x = (pageW - w) / 2;
      const y = margin + 30;

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.text('Your Court Design', pageW / 2, margin + 10, { align: 'center' });
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.text(
        `Gym: ${state.gymWidth}ft x ${state.gymLength}ft  \u2022  Floor: ${state.floorType}`,
        pageW / 2,
        margin + 24,
        { align: 'center' },
      );
      pdf.addImage(png, 'PNG', x, y, w, h);
      pdf.save('your-court.pdf');
    } finally {
      URL.revokeObjectURL(url);
    }
  };

  if (mode === 'splash') {
    return <Splash state={state} setState={setState} onContinue={() => setMode('design')} />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <HeaderBar />
      <TopBar
        title={STEP_TITLES[step]}
        step={step}
        totalSteps={TOTAL_STEPS}
        canBack={true}
        canNext={step < TOTAL_STEPS}
        onStartOver={startOver}
        onClear={clear}
        onBack={goBack}
        onNext={goNext}
      />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-80 shrink-0 overflow-y-auto border-r border-gray-200 bg-gray-50">
          {step === 1 && <Step1MainCourt state={state} setState={setState} />}
          {step === 2 && <Step2DesignOptions state={state} setState={setState} />}
          {step === 3 && <Step3SideCourts state={state} setState={setState} />}
          {step === 4 && <Step4Additional state={state} setState={setState} />}
          {step === 5 && <Step5Elements state={state} setState={setState} />}
          {step === 6 && <Step6Summary state={state} setState={setState} />}
        </aside>

        <main className="flex flex-1 flex-col overflow-hidden bg-gray-100">
          <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
            <div className="flex-1 text-[10px] uppercase tracking-wider text-gray-500">
              Changing the court size will not affect the display size.
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="bg-[#293879] px-2 py-1 text-[10px] font-semibold text-white">
                  WIDTH FT
                </span>
                <input
                  type="number"
                  value={state.gymWidth}
                  onChange={(e) =>
                    setState((s) => ({ ...s, gymWidth: Number(e.target.value) || 1 }))
                  }
                  className="w-20 border border-gray-300 px-2 py-1 text-sm"
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="bg-[#293879] px-2 py-1 text-[10px] font-semibold text-white">
                  LENGTH FT
                </span>
                <input
                  type="number"
                  value={state.gymLength}
                  onChange={(e) =>
                    setState((s) => ({ ...s, gymLength: Number(e.target.value) || 1 }))
                  }
                  className="w-20 border border-gray-300 px-2 py-1 text-sm"
                />
              </div>
              <button
                onClick={() => setState((s) => ({ ...s, zoom: Math.min(3, s.zoom + 0.1) }))}
                className="flex items-center gap-1 bg-[#293879] px-3 py-1 text-[10px] font-semibold text-white hover:bg-[#0a2f5c]"
              >
                <Plus size={12} /> ZOOM IN
              </button>
              <button
                onClick={() => setState((s) => ({ ...s, zoom: Math.max(0.3, s.zoom - 0.1) }))}
                className="flex items-center gap-1 bg-[#293879] px-3 py-1 text-[10px] font-semibold text-white hover:bg-[#0a2f5c]"
              >
                <Minus size={12} /> ZOOM OUT
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6" ref={canvasContainerRef}>
            <div style={{ width: `${100 * state.zoom}%` }}>
              <div className="aspect-square w-full">
                <CourtCanvas ref={svgRef} state={state} setState={setState} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold tracking-wider text-gray-700">
                GRIDLINES
              </span>
              <button
                onClick={() => setState((s) => ({ ...s, gridlines: true }))}
                className={`px-3 py-1 text-[10px] font-semibold ${
                  state.gridlines ? 'bg-[#293879] text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                ON
              </button>
              <button
                onClick={() => setState((s) => ({ ...s, gridlines: false }))}
                className={`px-3 py-1 text-[10px] font-semibold ${
                  !state.gridlines ? 'bg-[#293879] text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                OFF
              </button>
            </div>
            <div className="text-[10px] text-gray-500">Press [ctrl] to drag</div>
            <button
              onClick={handleGetPdf}
              className="bg-[#293879] px-6 py-2 text-xs font-bold tracking-wider text-white hover:bg-[#0a2f5c]"
            >
              GET PDF
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

function Splash({
  state,
  setState,
  onContinue,
}: {
  state: DesignState;
  setState: (u: (s: DesignState) => DesignState) => void;
  onContinue: () => void;
}) {
  return (
    <><HeaderBar />
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-lg bg-gray-50 p-8 shadow-sm">
        <h1
          className="mb-8 text-center text-3xl text-gray-900"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          Use our online tool to design your court
        </h1>

        <div className="mb-6">
          <div className="mb-3 border-b border-gray-300 pb-2 text-xs font-semibold tracking-wider text-gray-700">
            SELECT THE SIZE OF THE GYM
          </div>
          <div className="space-y-3">
            <div className="flex items-stretch">
              <div className="flex w-32 items-center justify-center bg-[#293879] px-3 py-2 text-xs font-semibold tracking-wider text-white">
                WIDTH FT
              </div>
              <input
                type="number"
                min={10}
                value={state.gymWidth}
                onChange={(e) =>
                  setState((s) => ({ ...s, gymWidth: Number(e.target.value) || 0 }))
                }
                className="flex-1 border border-gray-300 bg-white px-3 py-2 text-sm"
              />
            </div>
            <div className="flex items-stretch">
              <div className="flex w-32 items-center justify-center bg-[#293879] px-3 py-2 text-xs font-semibold tracking-wider text-white">
                LENGTH FT
              </div>
              <input
                type="number"
                min={10}
                value={state.gymLength}
                onChange={(e) =>
                  setState((s) => ({ ...s, gymLength: Number(e.target.value) || 0 }))
                }
                className="flex-1 border border-gray-300 bg-white px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="mb-3 border-b border-gray-300 pb-2 text-xs font-semibold tracking-wider text-gray-700">
            CHOOSE YOUR FLOOR TYPE
          </div>
          <select
            value={state.floorType}
            onChange={(e) =>
              setState((s) => ({ ...s, floorType: e.target.value as FloorType }))
            }
            className="w-full border border-gray-300 bg-white px-3 py-2 text-sm"
          >
            <option>Wood</option>
            <option>Synthetic</option>
            <option>Rubber</option>
          </select>
        </div>

        <button
          onClick={onContinue}
          className="w-full bg-[#293879] px-4 py-3 text-sm font-bold tracking-widest text-white hover:bg-[#0a2f5c]"
        >
          CONTINUE
        </button>
      </div>
    </div>
    </>
  );
}