import { useEffect, useRef, useState } from "react";
import { copy, type Lang, LANG_STORAGE_KEY, readStoredLang } from "./i18n";
import {
  CheckIcon,
  LockIcon,
  GitBranchIcon,
} from "./components/Icons";

const GITHUB_URL = "https://github.com/LJTian/maker-flow";

const PIPELINE_PATH =
  "M120 620 C280 420 400 360 560 450 C720 540 820 280 980 320 C1140 360 1240 520 1360 260";

function bendPointsAlongPath(path: SVGPathElement): [number, number][] {
  const length = path.getTotalLength();
  const samples = 320;
  const points: { x: number; y: number; t: number }[] = [];
  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const point = path.getPointAtLength(length * t);
    points.push({ x: point.x, y: point.y, t });
  }

  type Extremum = { index: number; sharpness: number };
  const extrema: Extremum[] = [];
  for (let i = 2; i < points.length - 2; i += 1) {
    const y0 = points[i - 1].y;
    const y1 = points[i].y;
    const y2 = points[i + 1].y;
    const isPeak = y1 < y0 && y1 <= y2;
    const isValley = y1 > y0 && y1 >= y2;
    if (!isPeak && !isValley) {
      continue;
    }
    const sharpness = Math.abs(y0 - 2 * y1 + y2);
    const prev = extrema[extrema.length - 1];
    if (prev && i - prev.index < 12) {
      if (sharpness > prev.sharpness) {
        extrema[extrema.length - 1] = { index: i, sharpness };
      }
      continue;
    }
    extrema.push({ index: i, sharpness });
  }

  const topBends = [...extrema]
    .sort((a, b) => b.sharpness - a.sharpness)
    .slice(0, 4)
    .sort((a, b) => a.index - b.index)
    .map((item) => item.index);

  const indexes = [0, ...topBends, points.length - 1];
  const unique = indexes.filter((idx, i) => i === 0 || idx !== indexes[i - 1]);

  return unique.slice(0, 6).map((idx) => {
    const point = points[idx];
    return [point.x, point.y];
  });
}

function PipelineVisual({
  factoryLabel,
  factorySub,
  productLabel,
  productSub,
  activeStep,
  onSelectStep,
}: {
  factoryLabel: string;
  factorySub: string;
  productLabel: string;
  productSub: string;
  activeStep: number;
  onSelectStep: (index: number) => void;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [nodes, setNodes] = useState<[number, number][]>([]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) {
      return;
    }
    setNodes(bendPointsAlongPath(path));
  }, []);

  return (
    <svg
      className="h-full w-full animate-drift select-none"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="belt" x1="0" y1="0" x2="1440" y2="900" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0d7377" stopOpacity="0.22" />
          <stop offset="0.55" stopColor="#14919b" stopOpacity="0.4" />
          <stop offset="1" stopColor="#c4a35a" stopOpacity="0.3" />
        </linearGradient>

        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" stroke="#14212b" strokeOpacity="0.07" />
        </pattern>

        <linearGradient id="veil" x1="0" y1="0" x2="900" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#eef3f6" stopOpacity="0.92" />
          <stop offset="0.55" stopColor="#eef3f6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#eef3f6" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid Canvas */}
      <rect width="1440" height="900" fill="#dce7ee" />
      <rect width="1440" height="900" fill="url(#grid)" />

      {/* Main S-Curve Pipeline Belt */}
      <path
        className="animate-draw"
        pathLength={1}
        d={PIPELINE_PATH}
        stroke="url(#belt)"
        strokeWidth="72"
        strokeLinecap="round"
      />

      {/* Dashed Energy Flow Line along Conveyor Belt */}
      <path
        className="animate-conveyor-flow"
        d={PIPELINE_PATH}
        stroke="#0d7377"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.85"
      />

      <path ref={pathRef} d={PIPELINE_PATH} />

      {/* 6 Step Nodes along path */}
      {nodes.map(([cx, cy], i) => {
        const isSelected = activeStep === i;
        return (
          <g
            key={i}
            onClick={() => onSelectStep(i)}
            className="cursor-pointer group"
            role="button"
            tabIndex={0}
          >
            {/* Pulsing Outer Glow Ring */}
            {isSelected && (
              <circle
                cx={cx}
                cy={cy}
                r="24"
                fill="none"
                stroke="#0d7377"
                strokeWidth="3"
                className="animate-pulse-ring"
              />
            )}
            {/* Circle Node */}
            <circle
              cx={cx}
              cy={cy}
              r="22"
              fill={isSelected ? "#0d7377" : "#eef3f6"}
              stroke="#0d7377"
              strokeWidth="3"
              className="transition-transform duration-200 group-hover:scale-110 origin-center"
            />
            {/* Number Text */}
            <text
              x={cx}
              y={cy + 6}
              textAnchor="middle"
              fontFamily="Syne, sans-serif"
              fontSize="16"
              fontWeight="700"
              fill={isSelected ? "#ffffff" : "#14212b"}
              className="pointer-events-none"
            >
              {i + 1}
            </text>
          </g>
        );
      })}

      {/* Glassmorphic Floating Factory Block with Depth & Border Glow */}
      <rect x="918" y="118" width="264" height="104" rx="8" fill="#0d7377" opacity="0.15" />
      <rect x="920" y="120" width="260" height="100" rx="6" fill="#14212b" opacity="0.95" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
      <text x="948" y="168" fill="#eef3f6" fontFamily="Syne, sans-serif" fontSize="26" fontWeight="700">
        {factoryLabel}
      </text>
      <text x="948" y="198" fill="#c4a35a" fontFamily="Figtree, sans-serif" fontSize="15" fontWeight="600">
        {factorySub}
      </text>

      {/* Glassmorphic Floating Product Block with Depth & Border Glow */}
      <rect x="1038" y="678" width="284" height="104" rx="8" fill="#0d7377" opacity="0.25" />
      <rect x="1040" y="680" width="280" height="100" rx="6" fill="#0d7377" opacity="0.95" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      <text x="1068" y="728" fill="#eef3f6" fontFamily="Syne, sans-serif" fontSize="26" fontWeight="700">
        {productLabel}
      </text>
      <text x="1068" y="758" fill="#eef3f6" fontFamily="Figtree, sans-serif" fontSize="15" opacity="0.9">
        {productSub}
      </text>

      {/* Veil */}
      <rect width="720" height="900" fill="url(#veil)" />
    </svg>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeStep, setActiveStep] = useState(0);

  const t = copy[lang];

  useEffect(() => {
    setLang(readStoredLang());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const currentStepInfo = t.workflow[activeStep] || t.workflow[0];

  return (
    <div className="min-h-screen bg-[#e8eef2] text-[#14212b] font-sans selection:bg-[#0d7377]/20 selection:text-[#0d7377]">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-8 py-6 md:px-12">
        <a href="#top" className="font-syne text-lg sm:text-xl font-bold tracking-tight text-[#14212b]/70 hover:text-[#0d7377] transition-colors">
          maker-flow
        </a>

        <div className="flex items-center gap-8">
          <div
            className="flex items-center gap-2.5 text-base sm:text-lg font-semibold"
            role="group"
            aria-label={t.langSwitchAria}
          >
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              className={
                lang === "en"
                  ? "text-[#14212b] underline decoration-[#0d7377] decoration-2 underline-offset-4 font-bold"
                  : "text-[#6b7c88] transition hover:text-[#0d7377]"
              }
            >
              {t.langEn}
            </button>
            <span className="text-[#14212b]/20" aria-hidden="true">
              /
            </span>
            <button
              type="button"
              onClick={() => setLang("zh")}
              aria-pressed={lang === "zh"}
              className={
                lang === "zh"
                  ? "text-[#14212b] underline decoration-[#0d7377] decoration-2 underline-offset-4 font-bold"
                  : "text-[#6b7c88] transition hover:text-[#0d7377]"
              }
            >
              {t.langZh}
            </button>
          </div>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="text-base sm:text-lg font-semibold text-[#3d4f5c] underline-offset-4 transition hover:text-[#0d7377] hover:underline"
          >
            {t.github}
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main id="top">
        <section className="relative isolate min-h-[100svh] overflow-hidden">
          {/* Floating S-Curve SVG Background */}
          <div className="absolute inset-0 -z-10">
            <PipelineVisual
              factoryLabel={t.factoryLabel}
              factorySub={t.factorySub}
              productLabel={t.productLabel}
              productSub={t.productSub}
              activeStep={activeStep}
              onSelectStep={(idx) => setActiveStep(idx)}
            />
          </div>

          <div className="relative z-10 flex min-h-[100svh] w-full flex-col justify-center px-8 pb-16 pt-20 md:px-16 md:pb-20 md:pt-24 pl-10 sm:pl-16 md:pl-28 lg:pl-36">
            <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl">
              {/* Premium Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d7377]/10 border border-[#0d7377]/25 text-[#0d7377] text-xs font-mono font-semibold tracking-wide mb-4 shadow-sm w-max">
                <span className="inline-block w-2 h-2 rounded-full bg-[#0d7377] animate-pulse"></span>
                <span>⚡ {lang === "zh" ? "基础设施优先 · 核心代码专注" : "Infrastructure First · Business Code Only"}</span>
              </div>

              <p className="font-syne text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-extrabold tracking-tight text-[#14212b] leading-[0.9]">
                maker-flow
              </p>
              <h1 className="mt-5 font-syne text-lg sm:text-xl md:text-[22px] font-bold leading-snug text-[#14212b] whitespace-nowrap">
                {t.headline}
              </h1>
              <p className="mt-5 text-lg sm:text-xl font-medium leading-relaxed text-[#3d4f5c] max-w-2xl">
                {t.support}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 bg-[#0d7377] px-7 py-3.5 text-base sm:text-lg font-bold text-white transition hover:bg-[#095456] rounded-md shadow-md"
                >
                  <span>{t.ctaPrimary}</span>
                  <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <a
                  href="#workflow"
                  className="group inline-flex items-center gap-2 px-6 py-3.5 text-base sm:text-lg font-bold text-[#3d4f5c] transition hover:text-[#0d7377]"
                >
                  <span>{t.ctaSecondary}</span>
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section id="workflow" className="border-t border-[#14212b]/10 bg-white/70 px-6 py-20 md:px-10">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              {t.workflowTitle}
            </h2>
            <p className="mt-3 max-w-xl text-[#3d4f5c]">{t.workflowLead}</p>

            <ol className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {t.workflow.map((item, idx) => {
                const isSelected = activeStep === idx;
                return (
                  <li
                    key={item.step}
                    onClick={() => setActiveStep(idx)}
                    className={`border-t-2 pt-5 cursor-pointer rounded-xl p-5 transition-all duration-200 ${
                      isSelected
                        ? "bg-white border-[#0d7377] shadow-[0_10px_30px_rgba(13,115,119,0.18)] -translate-y-1"
                        : "border-[#0d7377]/25 bg-white/50 hover:bg-white hover:border-[#0d7377]/60 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-display text-xs font-bold tracking-[0.2em] text-[#0d7377]">
                        {item.step}
                      </p>
                      {item.isGate && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#9a7a30] bg-[#c4a35a]/15 border border-[#c4a35a]/35 px-2 py-0.5 rounded shadow-xs">
                          <LockIcon className="w-3 h-3 text-[#c4a35a]" />
                          <span>{t.gateNotice}</span>
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 font-display text-xl font-bold text-[#14212b]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#3d4f5c]">{item.body}</p>
                  </li>
                );
              })}
            </ol>

            {/* Active Step Console Bar */}
            <div className="mt-10 bg-[#14212b] text-white rounded-xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 border-[#0d7377] relative overflow-hidden">
              <div className="flex items-center gap-2 absolute top-3 right-4 opacity-40">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#c4a35a] uppercase font-bold tracking-wider">
                    ⚡ Active Step {currentStepInfo.step} / 06
                  </span>
                  {currentStepInfo.isGate && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#c4a35a] bg-[#c4a35a]/20 px-1.5 py-0.5 rounded">
                      🔒 HARD GATE CONFIRMATION
                    </span>
                  )}
                </div>
                <h4 className="font-display text-xl font-bold mt-1 text-white">
                  {currentStepInfo.title}
                </h4>
                <p className="text-sm text-[#e8eef2]/80 mt-1 max-w-2xl">
                  {currentStepInfo.body}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveStep((prev) => (prev + 1) % 6)}
                className="px-5 py-2.5 bg-[#0d7377] hover:bg-[#095456] text-white rounded-md text-xs font-bold font-mono transition-all shadow-md hover:shadow-lg shrink-0 flex items-center gap-1.5"
              >
                <span>Next Step</span>
                <span className="text-[#c4a35a] font-extrabold">→</span>
              </button>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section id="architecture" className="border-t border-[#14212b]/10 px-6 py-20 md:px-10">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl mb-3 text-[#14212b]">
              {t.architectureTitle}
            </h2>
            <p className="max-w-xl text-[#3d4f5c] mb-10">{t.architectureLead}</p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Shared Factory */}
              <div className="bg-[#14212b] text-white rounded-xl p-8 shadow-xl border border-white/10 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#c4a35a]/20 flex items-center justify-center text-[#c4a35a] border border-[#c4a35a]/30">
                    <GitBranchIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">{t.factoryBoxTitle}</h3>
                    <p className="font-mono text-xs text-[#c4a35a]">$MAKER_FLOW_ROOT=~/.maker-flow</p>
                  </div>
                </div>
                <p className="text-sm text-[#e8eef2]/80 mb-6">{t.factoryBoxDesc}</p>
                <div className="bg-[#0b1319] rounded-lg p-4 font-mono text-xs text-[#e8eef2]/90 space-y-1.5 border border-white/5">
                  <p className="text-[#6b7c88]">// Shared factory root (Read-only for apps)</p>
                  <p className="text-[#c4a35a] font-bold">$MAKER_FLOW_ROOT/</p>
                  <p className="pl-4 text-[#e8eef2]/70">├── docs/workflow.md</p>
                  <p className="pl-4 text-[#e8eef2]/70">├── skills/ (pro-generation, deploy...)</p>
                  <p className="pl-4 text-[#e8eef2]/70">├── templates/ (apps/web-vite, go-...)</p>
                  <p className="pl-4 text-[#e8eef2]/70">└── release/publish/ (pages, vercel...)</p>
                </div>
              </div>

              {/* Product Repo */}
              <div className="bg-[#0d7377] text-white rounded-xl p-8 shadow-xl border border-white/15 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center text-white border border-white/30">
                    <CheckIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">{t.productBoxTitle}</h3>
                    <p className="font-mono text-xs text-white/80">PRODUCT_NAME=maker-flow-vite</p>
                  </div>
                </div>
                <p className="text-sm text-white/90 mb-6">{t.productBoxDesc}</p>
                <div className="bg-[#095456] rounded-lg p-4 font-mono text-xs text-white space-y-1.5 border border-white/10">
                  <p className="text-white/60">// Product repository (Business code only)</p>
                  <p className="text-white font-bold">./ (maker-flow-vite)</p>
                  <p className="pl-4 text-white/80">├── AGENTS.md</p>
                  <p className="pl-4 text-[#c4a35a] font-bold">├── pro.md (Confirmed PRO)</p>
                  <p className="pl-4 text-white/80">├── src/ (React / TypeScript UI)</p>
                  <p className="pl-4 text-white/80">└── docker-compose.yml</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Audience Section */}
        <section className="border-t border-[#14212b]/10 px-6 py-20 md:px-10">
          <div className="mx-auto max-w-6xl md:grid md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                {t.audienceTitle}
              </h2>
            </div>
            <div className="mt-6 max-w-xl md:col-span-7 md:mt-0">
              <p className="text-lg leading-relaxed text-[#3d4f5c]">{t.audienceBody}</p>
            </div>
          </div>
        </section>

        {/* Difference Section */}
        <section className="border-t border-[#14212b]/10 bg-[#14212b] px-6 py-20 text-[#e8eef2] md:px-10">
          <div className="mx-auto max-w-6xl md:grid md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
                {t.differenceTitle}
              </h2>
            </div>
            <div className="mt-6 max-w-xl md:col-span-7 md:mt-0">
              <p className="text-lg leading-relaxed text-[#e8eef2]/80">{t.differenceBody}</p>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center border border-[#c4a35a]/60 px-5 py-3 text-sm font-semibold text-[#c4a35a] transition hover:border-[#c4a35a] hover:bg-[#c4a35a]/10"
              >
                {t.differenceCta}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#14212b]/10 px-6 py-10 md:px-12 bg-white/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="font-syne text-xl font-bold tracking-tight text-[#14212b]">maker-flow</span>
            <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-[#0d7377]/10 text-[#0d7377] font-semibold border border-[#0d7377]/20">
              v1.0.0 MVP Pipeline
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-[#6b7c88]">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[#0d7377] hover:underline"
            >
              {t.repository}
            </a>
            <a
              href={`${GITHUB_URL}/issues`}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[#0d7377] hover:underline"
            >
              {t.issues}
            </a>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1 text-xs font-bold font-mono text-[#0d7377] hover:text-[#095456] transition-colors ml-2 bg-[#0d7377]/10 px-3 py-1.5 rounded-full border border-[#0d7377]/20"
            >
              <span>↑ Top</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
