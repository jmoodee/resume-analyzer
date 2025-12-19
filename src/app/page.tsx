"use client";

import { useState } from "react";

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

export default function Home() {
  const [resumeText, setResumeText] = useState("");
  const [jobText, setJobText] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const handleRun = () => {
    // Mock analysis for UI development (deterministic placeholder)
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

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-semibold">Jacob Moody — Tools</h1>
          <p className="text-sm text-gray-600">Resume ↔ Job Match Analyzer (MVP)</p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <h2 className="text-lg font-medium">Resume (paste)</h2>
            <textarea
              className="h-80 w-full rounded-lg border p-3 text-sm"
              placeholder="Paste your resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
            <p className="text-xs text-gray-500">Tip: For now, paste text (PDF upload later).</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-medium">Job description (paste)</h2>
            <textarea
              className="h-80 w-full rounded-lg border p-3 text-sm"
              placeholder="Paste the job description here..."
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
            />
            <p className="text-xs text-gray-500">We’ll extract keywords + requirements from this.</p>
          </div>
        </section>

        <section className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Resume chars: {resumeText.length} • Job chars: {jobText.length}
          </div>

          <button
            onClick={handleRun}
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Run analysis
          </button>
        </section>

        {analysis && (
          <section className="space-y-6 rounded-xl border p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Results</h2>
                <p className="text-sm text-gray-600">{analysis.decision}</p>
              </div>

              <div className="rounded-lg border px-4 py-3">
                <div className="text-xs text-gray-500">Match score</div>
                <div className="text-3xl font-semibold">{analysis.score}/100</div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-medium">Why this score</h3>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  {analysis.why.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Radar (placeholder)</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-lg border p-3">Skills: {analysis.radar.skills}/25</div>
                  <div className="rounded-lg border p-3">Experience: {analysis.radar.experience}/25</div>
                  <div className="rounded-lg border p-3">Education: {analysis.radar.education}/10</div>
                  <div className="rounded-lg border p-3">Keywords: {analysis.radar.keyword}/20</div>
                  <div className="rounded-lg border p-3">Impact: {analysis.radar.impact}/20</div>
                </div>
                <p className="text-xs text-gray-500">
                  Next step: replace with an actual radar chart component.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-medium">Missing qualifications</h3>
                <div className="space-y-2">
                  {analysis.missingQualifications.map((m, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg border p-3 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs ${
                            m.severity === "hard"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {m.severity === "hard" ? "Hard" : "Soft"}
                        </span>
                        <span>{m.text}</span>
                      </div>
                      <span className="text-gray-600">-{m.penalty}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Keyword coverage</h3>
                <div className="rounded-lg border p-3">
                  <div className="text-xs text-gray-500">Matched</div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {analysis.keywords.matched.map((k) => (
                      <span key={k} className="rounded-full border px-2 py-1 text-xs">
                        {k}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 text-xs text-gray-500">Missing</div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {analysis.keywords.missing.map((k) => (
                      <span key={k} className="rounded-full border px-2 py-1 text-xs">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">AI enhancements</h4>
                    <span className="text-xs text-gray-500">Not enabled yet</span>
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
                        className="cursor-not-allowed rounded-lg border px-3 py-2 text-left text-sm text-gray-500"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    These buttons will work once an API key is configured.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
