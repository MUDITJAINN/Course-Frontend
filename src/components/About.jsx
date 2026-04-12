import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const faqs = [
  {
    q: "How do purchases work?",
    a: "After successful payment, the item is unlocked for your account and appears under My Purchases.",
  },
  {
    q: "Will my notes be available after I buy?",
    a: "Yes. Downloads are protected and tied to your login. You can access them from the Notes page and My Purchases.",
  },
  {
    q: "Do you offer refunds?",
    a: "Please check Refund & Cancellation for the latest policy.",
  },
  {
    q: "How can I contact you for services?",
    a: "Use the Services page to message on Telegram/WhatsApp or send a request form.",
  },
];

function About() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">About</h1>
            <p className="text-gray-600 mt-1">
              Vision, mission, rules, FAQs, and trust signals.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link to="/" className="text-blue-600 hover:underline">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link to="/services" className="text-blue-600 hover:underline">
              Services
            </Link>
          </div>
        </div>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Vision</h2>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Make high-quality programming learning accessible with clear structure, honest previews,
            and secure access after purchase.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Mission</h2>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Help learners ship projects, crack interviews, and build confidence through curated
            courses, practical notes, and real support.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Rules</h2>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-5">
            <li>Be respectful in all communications.</li>
            <li>Do not share paid materials publicly.</li>
            <li>Payments are verified server-side; access is granted to the purchasing account only.</li>
            <li>For refund/cancellation, follow the official policy page.</li>
          </ul>
        </section>

        <section className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900">Rating</h3>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span className="text-gray-800 font-semibold">4.9/5</span>
            </div>
            <p className="text-gray-500 text-sm mt-2">
              Early customer feedback (more reviews coming as users purchase).
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900">Trusted access</h3>
            <p className="text-gray-700 text-sm mt-2">
              Purchases are tied to your login. Notes downloads are protected on the backend.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900">Support</h3>
            <p className="text-gray-700 text-sm mt-2">
              Use the Services page to reach out via Telegram/WhatsApp for quick help.
            </p>
          </div>
        </section>

        <section className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">FAQ</h2>
          <div className="mt-4 space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="border border-gray-100 rounded-xl p-4">
                <p className="font-semibold text-gray-900">{f.q}</p>
                <p className="text-gray-700 text-sm mt-1 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
          {/* JSON-LD for SEO (SPA baseline; still useful for some crawlers) */}
          <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        </section>

        <div className="mt-10 text-sm text-gray-600">
          Legal pages:{" "}
          <Link to="/terms" className="text-blue-600 hover:underline">
            Terms
          </Link>
          ,{" "}
          <Link to="/privacy" className="text-blue-600 hover:underline">
            Privacy
          </Link>
          ,{" "}
          <Link to="/refund" className="text-blue-600 hover:underline">
            Refund & Cancellation
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;

