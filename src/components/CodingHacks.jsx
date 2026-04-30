import React from "react";
import { Link } from "react-router-dom";
import SiteFooter from "./SiteFooter";

const hacks = [
  { title: "Debugging checklist", body: "Reproduce → isolate → log inputs/outputs → reduce case → fix → add test." },
  { title: "Use templates", body: "Keep boilerplate ready (auth, layout, API client). Ship faster." },
  { title: "Keyboard workflow", body: "Learn 10 shortcuts in your editor. Huge productivity multiplier." },
  { title: "Read error messages", body: "Start from the first error. Don’t chase downstream noise." },
  { title: "Small PRs", body: "Ship changes in small pieces. Easier to review, easier to debug." },
];

function CodingHacks() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-10">
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

        <section className="mt-10 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Quick workflow upgrades</h2>
          <div className="mt-4 grid md:grid-cols-2 gap-4 text-gray-700">
            <div className="rounded-xl border border-gray-100 p-4">
              <p className="font-semibold text-gray-900">1) One “source of truth”</p>
              <p className="text-sm mt-1 leading-relaxed">
                Keep constants (API base URL, links, feature flags) in one place. This avoids scattered edits
                and broken deployments.
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 p-4">
              <p className="font-semibold text-gray-900">2) Ship a reusable UI shell</p>
              <p className="text-sm mt-1 leading-relaxed">
                Build a common footer + navigation once, then reuse it everywhere. Users trust sites with
                consistent structure (especially for payments).
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 p-4">
              <p className="font-semibold text-gray-900">3) Fix slow pages first</p>
              <p className="text-sm mt-1 leading-relaxed">
                Optimize images, reduce huge components, and avoid loading everything at once. A fast site is
                a better experience for visitors and crawlers.
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 p-4">
              <p className="font-semibold text-gray-900">4) Write “helpful empty states”</p>
              <p className="text-sm mt-1 leading-relaxed">
                When a page has no data yet, explain what the user can do next (browse, search, contact).
                It prevents pages from looking broken or “empty”.
              </p>
            </div>
          </div>
        </section>

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
      <SiteFooter />
    </div>
  );
}

export default CodingHacks;

