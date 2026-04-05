import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiHome2Fill } from "react-icons/ri";
import logo from "../assets/Programmingwithmudit.png";

const KEY_MARKETING = "pwm_pref_marketing";
const KEY_AFTER_LOGIN = "pwm_pref_after_login";

const AFTER_LOGIN_OPTIONS = [
  { value: "/", label: "Home" },
  { value: "/courses", label: "Courses" },
  { value: "/notes", label: "Notes" },
];

/**
 * Minimal preferences (stored in localStorage only).
 */
function Settings() {
  const [marketing, setMarketing] = useState(false);
  const [afterLogin, setAfterLogin] = useState("/");

  useEffect(() => {
    setMarketing(localStorage.getItem(KEY_MARKETING) === "true");
    setAfterLogin(localStorage.getItem(KEY_AFTER_LOGIN) || "/");
  }, []);

  const saveMarketing = (v) => {
    setMarketing(v);
    localStorage.setItem(KEY_MARKETING, v ? "true" : "false");
  };

  const saveAfterLogin = (v) => {
    setAfterLogin(v);
    localStorage.setItem(KEY_AFTER_LOGIN, v);
  };

  const raw = localStorage.getItem("user");
  const session = raw ? JSON.parse(raw) : null;
  const email = session?.user?.email;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <img src={logo} alt="" className="h-10 w-10 rounded-full" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-sm text-gray-500">Preferences for this browser only</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
          <div className="p-5">
            <h2 className="font-semibold text-gray-900 mb-1">Account</h2>
            <p className="text-sm text-gray-600">
              {email ? (
                <>
                  Signed in as <span className="font-medium text-gray-800">{email}</span>
                </>
              ) : (
                <>
                  Not signed in.{" "}
                  <Link to="/login" className="text-blue-600 hover:underline">
                    Log in
                  </Link>
                </>
              )}
            </p>
          </div>

          <div className="p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Notifications</h2>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={marketing}
                onChange={(e) => saveMarketing(e.target.checked)}
              />
              <span>
                <span className="text-gray-900 font-medium">Product updates</span>
                <span className="block text-sm text-gray-500">
                  We may use this preference when email campaigns are enabled (optional).
                </span>
              </span>
            </label>
          </div>

          <div className="p-5">
            <h2 className="font-semibold text-gray-900 mb-3">After login</h2>
            <p className="text-sm text-gray-500 mb-2">Open this page right after you sign in</p>
            <select
              value={afterLogin}
              onChange={(e) => saveAfterLogin(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              {AFTER_LOGIN_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-8 text-blue-600 hover:text-blue-800 font-medium"
        >
          <RiHome2Fill /> Back to home
        </Link>
      </div>
    </div>
  );
}

export default Settings;
