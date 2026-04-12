import React from "react";
import { Link } from "react-router-dom";

const tips = [
  { title: "Consistency > intensity", body: "Daily 45 minutes beats 6 hours once a week. Build a streak." },
  { title: "Learn by building", body: "Pick one project and ship. Don’t collect tutorials." },
  { title: "Interview focus", body: "For DSA: patterns, not random questions. For dev: fundamentals + clarity." },
  { title: "Write notes", body: "Summarize concepts in 5–10 bullets. Revision becomes easy." },
  { title: "Explain out loud", body: "If you can’t explain it, you don’t own it yet." },
];

function Tips() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
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
  );
}

export default Tips;

