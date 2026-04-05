import React, { useEffect, useRef, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

/**
 * Header profile control: opens menu with account, purchases, settings, login/logout.
 */
function ProfileMenu({ className = "" }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const navigate = useNavigate();

  const raw = localStorage.getItem("user");
  const session = raw ? JSON.parse(raw) : null;
  const token = session?.token;
  const profile = session?.user;
  const displayName =
    profile?.firstName || profile?.email?.split("@")[0] || "Account";
  const email = profile?.email;

  useEffect(() => {
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const handleLogout = async () => {
    setOpen(false);
    try {
      const res = await axios.get(`${BACKEND_URL}/user/logout`, { withCredentials: true });
      toast.success(res.data?.message || "Logged out");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (e) {
      localStorage.removeItem("user");
      navigate("/login");
      toast.error(e?.response?.data?.errors || "Logged out locally");
    }
  };

  return (
    <div className={`relative ${className}`} ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="rounded-full p-0.5 ring-2 ring-transparent hover:ring-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
        aria-expanded={open}
        aria-haspopup="true"
        title="Account menu"
      >
        <FaCircleUser className="text-4xl text-blue-600" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg z-50 py-1 text-left text-sm">
          {token ? (
            <>
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="font-semibold text-gray-900 truncate">{displayName}</p>
                {email && <p className="text-xs text-gray-500 truncate">{email}</p>}
              </div>
              <Link
                to="/purchases"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                My purchases
              </Link>
              <Link
                to="/settings"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                Settings
              </Link>
              <button
                type="button"
                className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
