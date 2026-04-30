import React from "react";
import { Link } from "react-router-dom";
import SiteFooter from "./SiteFooter";

const tips = [
  { title: "Consistency > intensity", body: "Daily 45 minutes beats 6 hours once a week. Build a streak." },
  { title: "Learn by building", body: "Pick one project and ship. Don’t collect tutorials." },
  { title: "Interview focus", body: "For DSA: patterns, not random questions. For dev: fundamentals + clarity." },
  { title: "Write notes", body: "Summarize concepts in 5–10 bullets. Revision becomes easy." },
  { title: "Explain out loud", body: "If you can’t explain it, you don’t own it yet." },
];

function Tips() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-10">
        <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tips that move</h1>
            <p className="text-gray-600 mt-1">Small habits that create big results.</p>
          </div>
          <Link to="/courses" className="text-blue-600 hover:underline">
            Browse courses →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {tips.map((t) => (
            <div key={t.title} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">{t.title}</h2>
              <p className="text-gray-700 mt-2 leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>

        <section className="mt-10 grid md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">A simple weekly plan (beginner)</h2>
            <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-2">
              <li>
                <strong>Mon–Thu:</strong> 45–60 minutes learning + small exercise (one concept per day)
              </li>
              <li>
                <strong>Fri:</strong> revise notes + fix gaps
              </li>
              <li>
                <strong>Sat:</strong> project work (2–3 hours)
              </li>
              <li>
                <strong>Sun:</strong> publish progress (README/blog) + plan next week
              </li>
            </ul>
            <p className="text-sm text-gray-600 mt-3">
              The goal isn’t “more hours”. It’s consistent output: working code and clear notes.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">What to track (so you don’t get lost)</h2>
            <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-2">
              <li>1 project, 1 repo, 1 deployed link (keep it alive)</li>
              <li>Skills you improved this week (2–3 bullets)</li>
              <li>Questions you got wrong (and why)</li>
              <li>Your next 3 tasks (not 30)</li>
            </ul>
            <p className="text-sm text-gray-600 mt-3">
              Interview preparation works best when you measure patterns, not random questions.
            </p>
          </div>
        </section>

        <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Want a personalized plan?</h2>
          <p className="text-gray-700 mt-2">
            Tell me your goal (job switch / internship / first project) and I’ll suggest a roadmap.
          </p>
          <Link to="/services" className="inline-block mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
            Request guidance
          </Link>
        </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

export default Tips;

