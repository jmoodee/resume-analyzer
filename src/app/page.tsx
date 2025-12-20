"use client";

import { useMemo, useState } from "react";

/**
 * Line ~10–45: Types
 */
type Analysis = {
  score: number;
  decision: string;
  radar: {
    skills: number;
    experience: number;
    education: number;
    keyword: number;
    impact: number;
  };
  why: string[];
  missingQualifications: { text: string; severity: "hard" | "soft"; penalty: number }[];
  keywords: { matched: string[]; missing: string[] };
};

/**
 * Line ~47–120: Theme tokens + helpers
 * - We keep themes as "tokens" so the JSX stays readable.
 * - This also makes it easy to tweak colors later in ONE place.
 */
type ThemeMode = "dark" | "light";

type Theme = {
  pageBg: string;
  cardBg: string;
  panelBg: string;
  inputBg: string;
  border: string;
  text: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  dangerBg: string;
  dangerText: string;
  warnBg: string;
  warnText: string;
};

const THEMES: Record<ThemeMode, Theme> = {
  dark: {
    pageBg: "#1F1F1F",
    cardBg: "#2A2A2A",
    panelBg: "#2F2F2F",
    inputBg: "#333333",
    border: "#3D3D3D",
    text: "#E5E5E5",
    textMuted: "#A3A3A3",
    accent: "#4F7CAC",
    accentHover: "#5F8FC4",
    dangerBg: "#3A1E1E",
    dangerText: "#FCA5A5",
    warnBg: "#3A3218",
    warnText: "#FCD34D",
  },
  light: {
    pageBg: "#F6F7F9",
    cardBg: "#FFFFFF",
    panelBg: "#F2F4F7",
    inputBg: "#FFFFFF",
    border: "#D0D5DD",
    text: "#111827",
    textMuted: "#667085",
    accent: "#2563EB",
    accentHover: "#1D4ED8",
    dangerBg: "#FEE2E2",
    dangerText: "#991B1B",
    warnBg: "#FEF3C7",
    warnText: "#92400E",
  },
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function Home() {
  /**
   * Line ~122–155: State
   */
  const [mode, setMode] = useState<ThemeMode>("dark");
  const t = useMemo(() => THEMES[mode], [mode]);

  const [resumeText, setResumeText] = useState("");
  const [jobText, setJobText] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const canRun = resumeText.trim().length > 0 && jobText.trim().length > 0;

  /**
   * Line ~157–205: Mock analysis (UI scaffolding)
   */
  const handleRun = () => {
    // Deterministic placeholder (same output every time for the demo)
    const mock: Analysis = {
      score: 78,
      decision: "Strong Fit (Student-level)",
      radar: {
        skills: 22,
        experience: 17,
        education: 9,
        keyword: 15,
        impact: 15,
      },
      why: [
        "Meets degree + core language expectations (Java/C/Python).",
        "Early software experience (mentorship + web projects).",
        "Missing explicit OS/complexity keywords and distributed systems terms.",
      ],
      missingQualifications: [
        { text: "Operating Systems (explicit)", severity: "hard", penalty: 6 },
        { text: "Complexity analysis / Big-O (explicit)", severity: "hard", penalty: 6 },
        { text: "Distributed systems / microservices exposure", severity: "soft", penalty: 4 },
        { text: "Relational databases (SQL)", severity: "soft", penalty: 3 },
      ],
      keywords: {
        matched: ["Java", "C", "Python", "React", "API", "Git"],
        missing: ["AWS", "microservices", "scalability", "fault-tolerant", "monitoring", "SQL"],
      },
    };

    setAnalysis(mock);
  };

  /**
   * Line ~207–225: Shared class strings (hover shadowing + transitions)
   * - These make "depth" + hover feel consistent across the app.
   */
  const cardClass =
    "rounded-xl p-6 shadow-lg transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-xl";
  const panelClass =
    "rounded-xl border p-6 shadow-md transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-lg";
  const inputClass =
    "h-80 w-full rounded-lg border p-3 text-sm transition-shadow duration-150 hover:shadow-md focus:outline-none focus:ring-2";
  const pillClass =
    "rounded-full border px-2 py-1 text-xs transition-shadow duration-150 hover:shadow";

  /**
   * Line ~227+: JSX
   */
  return (
    <main
      className="min-h-screen p-8"
      style={{
        backgroundColor: t.pageBg,
        color: t.text,
      }}
    >
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Top Card */}
        <div
          className={cardClass}
          style={{
            backgroundColor: t.cardBg,
            border: `1px solid ${t.border}`,
          }}
        >
          {/* Header + Theme Toggle */}
          <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-semibold">Jacob Moody — Tools</h1>
              <p style={{ color: t.textMuted }} className="text-sm">
                Resume ↔ Job Match Analyzer (MVP)
              </p>
            </div>

            <button
              onClick={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
              className="rounded-lg border px-3 py-2 text-sm transition-shadow duration-150 hover:shadow-md"
              style={{
                borderColor: t.border,
                backgroundColor: t.panelBg,
                color: t.text,
              }}
              aria-label="Toggle theme"
              title="Toggle dark/light theme"
            >
              {mode === "dark" ? "Light mode" : "Dark mode"}
            </button>
          </header>

          {/* Inputs */}
          <section className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h2 className="text-lg font-medium">Resume (paste)</h2>
              <textarea
                className={inputClass}
                placeholder="Paste your resume text here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                style={{
                  backgroundColor: t.inputBg,
                  borderColor: t.border,
                  color: t.text,
                  boxShadow: "none",
                  // Focus ring color controlled via inline style below
                }}
              />
              <p className="text-xs" style={{ color: t.textMuted }}>
                Tip: For now, paste text (PDF upload later).
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-medium">Job description (paste)</h2>
              <textarea
                className={inputClass}
                placeholder="Paste the job description here..."
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                style={{
                  backgroundColor: t.inputBg,
                  borderColor: t.border,
                  color: t.text,
                }}
              />
              <p className="text-xs" style={{ color: t.textMuted }}>
                We’ll extract keywords + requirements from this.
              </p>
            </div>
          </section>

          {/* Footer row */}
          <section className="mt-6 flex items-center justify-between">
            <div className="text-xs" style={{ color: t.textMuted }}>
              Resume chars: {resumeText.length} • Job chars: {jobText.length}
              {!canRun && <span className="ml-2">• Paste both to enable analysis</span>}
            </div>

            <button
              onClick={handleRun}
              disabled={!canRun}
              className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-all duration-150 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                backgroundColor: canRun ? t.accent : "#555555",
              }}
              onMouseEnter={(e) => {
                if (canRun) (e.currentTarget.style.backgroundColor = t.accentHover);
              }}
              onMouseLeave={(e) => {
                if (canRun) (e.currentTarget.style.backgroundColor = t.accent);
              }}
            >
              Run analysis
            </button>
          </section>
        </div>

        {/* Results Panel */}
        {analysis && (
          <section
            className={panelClass}
            style={{
              backgroundColor: t.cardBg,
              borderColor: t.border,
            }}
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm" style={{ color: t.textMuted }}>
                  {analysis.decision}
                </p>
              </div>

              <div
                className="rounded-lg border px-4 py-3 transition-shadow duration-150 hover:shadow-md"
                style={{ borderColor: t.border, backgroundColor: t.panelBg }}
              >
                <div className="text-xs" style={{ color: t.textMuted }}>
                  Match score
                </div>
                <div className="text-3xl font-semibold">{analysis.score}/100</div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div
                className="rounded-xl border p-4 transition-shadow duration-150 hover:shadow-md"
                style={{ borderColor: t.border, backgroundColor: t.panelBg }}
              >
                <h3 className="font-medium">Why this score</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {analysis.why.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-xl border p-4 transition-shadow duration-150 hover:shadow-md"
                style={{ borderColor: t.border, backgroundColor: t.panelBg }}
              >
                <h3 className="font-medium">Radar (placeholder)</h3>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-lg border p-3" style={{ borderColor: t.border }}>
                    Skills: {analysis.radar.skills}/25
                  </div>
                  <div className="rounded-lg border p-3" style={{ borderColor: t.border }}>
                    Experience: {analysis.radar.experience}/25
                  </div>
                  <div className="rounded-lg border p-3" style={{ borderColor: t.border }}>
                    Education: {analysis.radar.education}/10
                  </div>
                  <div className="rounded-lg border p-3" style={{ borderColor: t.border }}>
                    Keywords: {analysis.radar.keyword}/20
                  </div>
                  <div className="rounded-lg border p-3" style={{ borderColor: t.border }}>
                    Impact: {analysis.radar.impact}/20
                  </div>
                </div>
                <p className="mt-2 text-xs" style={{ color: t.textMuted }}>
                  Next step: replace with an actual radar chart component.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* Missing quals */}
              <div
                className="rounded-xl border p-4 transition-shadow duration-150 hover:shadow-md"
                style={{ borderColor: t.border, backgroundColor: t.panelBg }}
              >
                <h3 className="font-medium">Missing qualifications</h3>
                <div className="mt-2 space-y-2">
                  {analysis.missingQualifications.map((m, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg border p-3 text-sm transition-shadow duration-150 hover:shadow"
                      style={{ borderColor: t.border, backgroundColor: t.inputBg }}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="rounded-full px-2 py-0.5 text-xs"
                          style={{
                            backgroundColor: m.severity === "hard" ? t.dangerBg : t.warnBg,
                            color: m.severity === "hard" ? t.dangerText : t.warnText,
                          }}
                        >
                          {m.severity === "hard" ? "Hard" : "Soft"}
                        </span>
                        <span>{m.text}</span>
                      </div>
                      <span style={{ color: t.textMuted }}>-{clamp(m.penalty, 0, 20)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keywords + AI panel */}
              <div className="space-y-4">
                <div
                  className="rounded-xl border p-4 transition-shadow duration-150 hover:shadow-md"
                  style={{ borderColor: t.border, backgroundColor: t.panelBg }}
                >
                  <h3 className="font-medium">Keyword coverage</h3>

                  <div className="mt-3 text-xs" style={{ color: t.textMuted }}>
                    Matched
                  </div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {analysis.keywords.matched.map((k) => (
                      <span
                        key={k}
                        className={pillClass}
                        style={{ borderColor: t.border, backgroundColor: t.inputBg }}
                      >
                        {k}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 text-xs" style={{ color: t.textMuted }}>
                    Missing
                  </div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {analysis.keywords.missing.map((k) => (
                      <span
                        key={k}
                        className={pillClass}
                        style={{ borderColor: t.border, backgroundColor: t.inputBg }}
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="rounded-xl border p-4 transition-shadow duration-150 hover:shadow-md"
                  style={{ borderColor: t.border, backgroundColor: t.panelBg }}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">AI enhancements</h4>
                    <span className="text-xs" style={{ color: t.textMuted }}>
                      Not enabled yet
                    </span>
                  </div>

                  <div className="mt-3 grid gap-2 md:grid-cols-2">
                    {[
                      "Explain score",
                      "Generate talking points",
                      "Rewrite bullets",
                      "Suggest keyword phrasing",
                      "Cover-letter paragraph",
                    ].map((label) => (
                      <button
                        key={label}
                        disabled
                        className="cursor-not-allowed rounded-lg border px-3 py-2 text-left text-sm transition-shadow duration-150 hover:shadow"
                        style={{
                          borderColor: t.border,
                          backgroundColor: t.inputBg,
                          color: t.textMuted,
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  <p className="mt-2 text-xs" style={{ color: t.textMuted }}>
                    These buttons will work once an API key is configured.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Focus ring color: apply globally to this page */}
      <style jsx global>{`
        textarea:focus {
          box-shadow: 0 0 0 2px ${t.accent} !important;
        }
      `}</style>
    </main>
  );
}
