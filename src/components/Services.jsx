import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";

import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
} from "../utils/utils";

function Services() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    request: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.request) {
      toast.error("All fields are required");
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID, // must be string from utils
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          request: form.request,
        },
        EMAILJS_PUBLIC_KEY
      );

      toast.success("Request sent successfully 🚀");
      setForm({ name: "", email: "", request: "" });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send request ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-orange-500">
              Freelance Services
            </h1>
            <p className="text-gray-300 mt-2 max-w-2xl">
              Ask for any software service. Share your requirement and I will
              respond with next steps.
            </p>
          </div>
          <Link
            to="/"
            className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 duration-300"
          >
            Back Home
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* LEFT SIDE */}
          <div className="bg-white/95 backdrop-blur rounded-xl p-6 shadow-xl border border-white/20">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              What I can help with
            </h2>
            <div className="grid gap-3">
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <p className="font-semibold text-gray-900">
                  Web Development
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  React, Node/Express, full-stack apps, dashboards.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <p className="font-semibold text-gray-900">
                  Payment & Integrations
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  PhonePe/Stripe integration, APIs, verification flows.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <p className="font-semibold text-gray-900">
                  UI / Performance
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  Clean professional UI, optimization, bug fixes.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <p className="font-semibold text-gray-900">
                  Custom Automation
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  Tools and workflows tailored to your business.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white/95 backdrop-blur rounded-xl p-6 shadow-xl border border-white/20">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Request a Service
            </h2>

            <form onSubmit={handleSubmit} className="grid gap-3">
              <input
                className="border border-gray-300 rounded-md px-3 py-2"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                required
              />
              <input
                type="email"
                className="border border-gray-300 rounded-md px-3 py-2"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                required
              />
              <textarea
                className="border border-gray-300 rounded-md px-3 py-2 h-28"
                placeholder="Describe your requirement (features, tech stack, deadline)..."
                value={form.request}
                onChange={(e) =>
                  setForm((p) => ({ ...p, request: e.target.value }))
                }
                required
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-blue-500 duration-300 disabled:bg-gray-400"
              >
                {isSubmitting ? "Sending..." : "Send Request"}
              </button>
            </form>

            <div className="mt-4 text-sm text-gray-600">
              Direct email:{" "}
              <a
                className="text-orange-600 font-semibold"
                href="mailto:jainmuditt@gmail.com"
              >
                jainmuditt@gmail.com
              </a>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
              <p className="font-semibold text-gray-900">How it works</p>
              <p className="text-gray-600 text-sm mt-1">
                You share your requirement, I reply with questions + a clear
                plan, then we finalize scope, timeline, and budget.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;