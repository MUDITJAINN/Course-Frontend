import React from "react";
import { Link } from "react-router-dom";

const hacks = [
  { title: "Debugging checklist", body: "Reproduce → isolate → log inputs/outputs → reduce case → fix → add test." },
  { title: "Use templates", body: "Keep boilerplate ready (auth, layout, API client). Ship faster." },
  { title: "Keyboard workflow", body: "Learn 10 shortcuts in your editor. Huge productivity multiplier." },
  { title: "Read error messages", body: "Start from the first error. Don’t chase downstream noise." },
  { title: "Small PRs", body: "Ship changes in small pieces. Easier to review, easier to debug." },
];

function CodingHacks() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Coding hacks</h1>
            <p className="text-gray-600 mt-1">Fast wins for better code and faster delivery.</p>
          </div>
          <Link to="/notes" className="text-blue-600 hover:underline">
            Shop notes →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {hacks.map((h) => (
            <div key={h.title} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">{h.title}</h2>
              <p className="text-gray-700 mt-2 leading-relaxed">{h.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/mock-interviews" className="bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50">
            Mock interviews
          </Link>
          <Link to="/tips" className="bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50">
            Tips
          </Link>
          <Link to="/services" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
            Hire / services
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CodingHacks;

