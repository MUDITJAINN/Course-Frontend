import React from "react";
import { Link } from "react-router-dom";

function MockInterviews() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mock Interviews</h1>
            <p className="text-gray-600 mt-1">
              Practice like a real interview: DSA + system design + project discussion.
            </p>
          </div>
          <Link to="/services" className="text-blue-600 hover:underline">
            Book a session →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">What you get</h2>
            <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-5">
              <li>45–60 minute live mock</li>
              <li>Realistic questions (based on your target role)</li>
              <li>Clear feedback + improvement plan</li>
              <li>Resume & project discussion pointers</li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">How it works</h2>
            <ol className="mt-3 space-y-2 text-gray-700 list-decimal pl-5">
              <li>Share your target company/role</li>
              <li>We run a timed mock interview</li>
              <li>You get detailed feedback + next steps</li>
            </ol>
            <div className="mt-6 flex gap-3 flex-wrap">
              <Link to="/services" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                Request mock interview
              </Link>
              <Link to="/about" className="bg-white text-gray-900 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50">
                FAQs & rules
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockInterviews;

