import { useEffect, useState } from "react";
import { copy, type Lang, LANG_STORAGE_KEY, readStoredLang } from "./i18n";

const GITHUB_URL = "https://github.com/LJTian/maker-flow";

function PipelineVisual({
  factoryLabel,
  factorySub,
  productLabel,
  productSub,
}: {
  factoryLabel: string;
  factorySub: string;
  productLabel: string;
  productSub: string;
}) {
  return (
    <svg
      className="h-full w-full animate-drift"
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
      <rect width="1440" height="900" fill="#dce7ee" />
      <rect width="1440" height="900" fill="url(#grid)" />
      <path
        className="animate-draw"
        pathLength={1}
        d="M120 620 C280 420 400 360 560 450 C720 540 820 280 980 320 C1140 360 1240 520 1360 260"
        stroke="url(#belt)"
        strokeWidth="72"
        strokeLinecap="round"
      />
      <path
        className="animate-draw"
        pathLength={1}
        d="M120 620 C280 420 400 360 560 450 C720 540 820 280 980 320 C1140 360 1240 520 1360 260"
        stroke="#0d7377"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="12 16"
        opacity="0.75"
      />
      {[
        [180, 580],
        [400, 400],
        [620, 470],
        [840, 330],
        [1080, 360],
        [1300, 280],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="22" fill="#eef3f6" stroke="#0d7377" strokeWidth="3" />
          <text
            x={cx}
            y={cy + 6}
            textAnchor="middle"
            fontFamily="Syne, sans-serif"
            fontSize="16"
            fontWeight="700"
            fill="#14212b"
          >
            {i + 1}
          </text>
        </g>
      ))}
      <rect x="920" y="120" width="260" height="100" rx="4" fill="#14212b" opacity="0.9" />
      <text x="948" y="168" fill="#eef3f6" fontFamily="Syne, sans-serif" fontSize="26" fontWeight="700">
        {factoryLabel}
      </text>
      <text x="948" y="198" fill="#c4a35a" fontFamily="Figtree, sans-serif" fontSize="15">
        {factorySub}
      </text>
      <rect x="1040" y="680" width="280" height="100" rx="4" fill="#0d7377" opacity="0.95" />
      <text x="1068" y="728" fill="#eef3f6" fontFamily="Syne, sans-serif" fontSize="26" fontWeight="700">
        {productLabel}
      </text>
      <text x="1068" y="758" fill="#eef3f6" fontFamily="Figtree, sans-serif" fontSize="15" opacity="0.85">
        {productSub}
      </text>
      <rect width="720" height="900" fill="url(#veil)" />
    </svg>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
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

  return (
    <div className="min-h-screen bg-mist text-ink">
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="font-display text-sm font-bold tracking-wide text-ink/80">
          maker-flow
        </a>
        <div className="flex items-center gap-5">
          <div
            className="flex items-center gap-2 text-sm font-medium"
            role="group"
            aria-label={t.langSwitchAria}
          >
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              className={
                lang === "en"
                  ? "text-ink underline decoration-forge decoration-2 underline-offset-4"
                  : "text-ink-mute transition hover:text-forge"
              }
            >
              {t.langEn}
            </button>
            <span className="text-ink/20" aria-hidden="true">
              /
            </span>
            <button
              type="button"
              onClick={() => setLang("zh")}
              aria-pressed={lang === "zh"}
              className={
                lang === "zh"
                  ? "text-ink underline decoration-forge decoration-2 underline-offset-4"
                  : "text-ink-mute transition hover:text-forge"
              }
            >
              {t.langZh}
            </button>
          </div>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-ink-soft underline-offset-4 transition hover:text-forge hover:underline"
          >
            {t.github}
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative isolate min-h-[100svh] overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <PipelineVisual
              factoryLabel={t.factoryLabel}
              factorySub={t.factorySub}
              productLabel={t.productLabel}
              productSub={t.productSub}
            />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-16 pt-28 md:justify-center md:px-10 md:pb-24">
            <div className="max-w-lg">
              <p className="font-display animate-rise text-5xl font-extrabold tracking-tight text-ink sm:text-6xl md:text-7xl">
                maker-flow
              </p>
              <h1 className="mt-5 animate-rise-delayed font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
                {t.headline}
              </h1>
              <p className="mt-4 animate-rise-late text-base leading-relaxed text-ink-soft sm:text-lg">
                {t.support}
              </p>
              <div className="mt-8 animate-rise-late flex flex-wrap gap-4">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center bg-forge px-5 py-3 text-sm font-semibold text-white transition hover:bg-forge-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forge"
                >
                  {t.ctaPrimary}
                </a>
                <a
                  href="#workflow"
                  className="inline-flex items-center px-5 py-3 text-sm font-semibold text-ink-soft transition hover:text-forge"
                >
                  {t.ctaSecondary}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="workflow" className="border-t border-ink/10 bg-white/70 px-6 py-20 md:px-10">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              {t.workflowTitle}
            </h2>
            <p className="mt-3 max-w-xl text-ink-soft">{t.workflowLead}</p>
            <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {t.workflow.map((item) => (
                <li key={item.step} className="border-t border-forge/30 pt-4">
                  <p className="font-display text-xs font-bold tracking-[0.2em] text-forge">
                    {item.step}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-ink/10 px-6 py-20 md:px-10">
          <div className="mx-auto max-w-6xl md:grid md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                {t.audienceTitle}
              </h2>
            </div>
            <div className="mt-6 max-w-xl md:col-span-7 md:mt-0">
              <p className="text-lg leading-relaxed text-ink-soft">{t.audienceBody}</p>
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-ink px-6 py-20 text-mist md:px-10">
          <div className="mx-auto max-w-6xl md:grid md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
                {t.differenceTitle}
              </h2>
            </div>
            <div className="mt-6 max-w-xl md:col-span-7 md:mt-0">
              <p className="text-lg leading-relaxed text-mist/80">{t.differenceBody}</p>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center border border-brass/60 px-5 py-3 text-sm font-semibold text-brass transition hover:border-brass hover:bg-brass/10"
              >
                {t.differenceCta}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink/10 px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display font-semibold text-ink-soft">maker-flow</p>
          <div className="flex flex-wrap gap-5">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-forge"
            >
              {t.repository}
            </a>
            <a
              href={`${GITHUB_URL}/issues`}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-forge"
            >
              {t.issues}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
