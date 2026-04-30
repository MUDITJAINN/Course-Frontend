import React, { useState } from "react";
import Seo from "../seo/Seo";
import SiteFooter from "./SiteFooter";

const CONTACT_EMAIL = "jainmuditt@gmail.com";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const mailto = `mailto:${encodeURIComponent(CONTACT_EMAIL)}?subject=${encodeURIComponent(
    `Website contact: ${form.name || "Visitor"}`
  )}&body=${encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}\n`
  )}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        path="/contact"
        title="Contact — Programming With Mudit"
        description="Contact Programming With Mudit for course/notes questions, support, or freelance services."
      />

      <main className="px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Contact</h1>
            <p className="text-gray-600 mt-2 max-w-2xl">
              For support, content questions, or freelance work, email is the fastest. If you include
              screenshots + your account email, it helps resolve issues faster.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Email</h2>
              <p className="text-gray-700 mt-2">
                <a className="text-blue-600 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                Typical response time: 24–48 hours on working days.
              </p>

              <h2 className="text-lg font-bold text-gray-900 mt-6">What to include</h2>
              <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-1 text-sm">
                <li>Your account email (the one you used to sign up)</li>
                <li>Order / transaction reference (if applicable)</li>
                <li>What you expected vs what happened</li>
                <li>Screenshot or screen recording (optional, but helpful)</li>
              </ul>
            </section>

            <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Send a message</h2>
              <p className="text-sm text-gray-600 mt-2">
                This opens your mail app (no data is stored on the site).
              </p>

              <div className="mt-4 grid gap-3">
                <label className="text-sm">
                  <span className="text-gray-700">Name</span>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </label>
                <label className="text-sm">
                  <span className="text-gray-700">Email</span>
                  <input
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
                    placeholder="name@email.com"
                    type="email"
                    autoComplete="email"
                  />
                </label>
                <label className="text-sm">
                  <span className="text-gray-700">Message</span>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 bg-white min-h-[120px]"
                    placeholder="Tell us what you need help with…"
                  />
                </label>

                <a
                  className="inline-flex justify-center items-center bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                  href={mailto}
                >
                  Open email
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

