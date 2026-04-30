import React from "react";
import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-bold text-gray-900">Programming With Mudit</p>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Courses, notes, tutorials, and mock interviews for MERN stack, React, and backend
              development. Preview-first, secure checkout, and account-based access to purchases.
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-900">Explore</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li>
                <Link to="/courses" className="hover:underline">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/notes" className="hover:underline">
                  Notes
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:underline">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-gray-900">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li>
                <Link to="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/mock-interviews" className="hover:underline">
                  Mock interviews
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-gray-900">Legal</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li>
                <Link to="/terms" className="hover:underline">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:underline">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:underline">
                  Refund & Cancellation
                </Link>
              </li>
            </ul>
            <p className="text-xs text-gray-500 mt-4">
              © {new Date().getFullYear()} Programming With Mudit
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

