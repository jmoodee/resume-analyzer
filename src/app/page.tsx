"use client";

import { useState } from "react";

export default function Home() {
  const [resumeText, setResumeText] = useState("");
  const [jobText, setJobText] = useState("");

  const handleRun = () => {
    // Later: call /api/analyze
    alert("Run Analysis clicked (not wired yet).");
  };

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-semibold">Jacob Moody — Tools</h1>
          <p className="text-sm text-gray-600">
            Resume ↔ Job Match Analyzer (MVP)
          </p>
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
            <p className="text-xs text-gray-500">
              Tip: For now, paste text (PDF upload later).
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-medium">Job description (paste)</h2>
            <textarea
              className="h-80 w-full rounded-lg border p-3 text-sm"
              placeholder="Paste the job description here..."
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              We’ll extract keywords + requirements from this.
            </p>
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
      </div>
    </main>
  );
}
